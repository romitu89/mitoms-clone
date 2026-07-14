import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_SERVICES = new Set([
  "Website Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "AI & Digital Transformation",
  "IT Consulting",
  "Digital Marketing",
  "Other",
]);

const ALLOWED_BUDGETS = new Set([
  "Not decided yet",
  "Below ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
]);

const ALLOWED_SOURCES = new Set([
  "consultation-modal",
  "contact-page",
]);

const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
]);

const MAX_REQUEST_BYTES = 20_000;
const MIN_FORM_FILL_MS = 2_500;
const MAX_FORM_AGE_MS = 3 * 60 * 60 * 1000;
const IP_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const IP_RATE_LIMIT_MAX_REQUESTS = 4;
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_RATE_LIMIT_MAX_REQUESTS = 3;
const DUPLICATE_WINDOW_MS = 15 * 60 * 1000;

type ConsultationPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  source?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const ipRateLimitStore = new Map<string, RateLimitRecord>();
const emailRateLimitStore = new Map<string, RateLimitRecord>();
const duplicateStore = new Map<string, number>();

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return normalizeText(value)
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function cleanMessage(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return normalizeText(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  if (email.length < 6 || email.length > 180 || email.includes("..")) {
    return false;
  }

  const match = email.match(/^([a-z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-z0-9.-]+)$/i);

  if (!match) {
    return false;
  }

  const [, localPart, domain] = match;

  if (
    !localPart ||
    !domain ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    !domain.includes(".") ||
    BLOCKED_EMAIL_DOMAINS.has(domain.toLowerCase())
  ) {
    return false;
  }

  return domain.split(".").every(
    (label) =>
      label.length > 0 &&
      label.length <= 63 &&
      !label.startsWith("-") &&
      !label.endsWith("-") &&
      /^[a-z0-9-]+$/i.test(label),
  );
}

function isValidName(name: string): boolean {
  if (name.length < 2 || name.length > 70) {
    return false;
  }

  const blockedNames = new Set([
    "test",
    "testing",
    "asdf",
    "qwerty",
    "unknown",
    "anonymous",
    "admin",
    "user",
    "name",
  ]);

  const letters = name.match(/\p{L}/gu) ?? [];

  return (
    letters.length >= 2 &&
    /^[\p{L}\p{M} .'-]+$/u.test(name) &&
    !blockedNames.has(name.toLowerCase()) &&
    !/(.)\1{5,}/u.test(name)
  );
}

function isValidPhone(phone: string): boolean {
  if (!/^[+()\-\s\d]+$/.test(phone)) {
    return false;
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    return false;
  }

  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }

  if (/^(0123456789|1234567890|9876543210)$/.test(digits)) {
    return false;
  }

  return !/^(\d{1,3})\1{3,}$/.test(digits);
}

function isValidCompany(company: string): boolean {
  if (!company) {
    return true;
  }

  if (company.length < 2 || company.length > 100) {
    return false;
  }

  const lettersOrDigits = company.match(/[\p{L}\p{N}]/gu) ?? [];

  return (
    lettersOrDigits.length >= 2 &&
    /^[\p{L}\p{M}\p{N} &.,'()\/-]+$/u.test(company) &&
    !/(.)\1{7,}/u.test(company)
  );
}

function isValidMessage(message: string): boolean {
  if (message.length < 30 || message.length > 3000) {
    return false;
  }

  const letters = message.match(/\p{L}/gu) ?? [];
  const words = message.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'-]*/gu) ?? [];
  const meaningfulWords = words.filter((word) => word.length >= 3);
  const uniqueWords = new Set(meaningfulWords);
  const urlCount = (message.match(/(?:https?:\/\/|www\.)/gi) ?? []).length;
  const compact = message.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (
    letters.length < 20 ||
    words.length < 6 ||
    uniqueWords.size < 4 ||
    urlCount > 2 ||
    /(.)\1{8,}/u.test(message)
  ) {
    return false;
  }

  const blockedFragments = [
    "asdf",
    "qwerty",
    "loremipsum",
    "testtest",
    "abcdef",
    "randomtext",
    "dummytext",
  ];

  return !blockedFragments.some((fragment) => compact.includes(fragment));
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    request.headers.get("cf-connecting-ip")?.trim() ||
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 120) || "unknown";

  return createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex");
}

function isSameOriginRequest(request: NextRequest): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost || request.headers.get("host") || "")
    .split(",")[0]
    ?.trim();

  if (!host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function pruneStores(now: number) {
  for (const [key, record] of ipRateLimitStore) {
    if (record.resetAt <= now) {
      ipRateLimitStore.delete(key);
    }
  }

  for (const [key, record] of emailRateLimitStore) {
    if (record.resetAt <= now) {
      emailRateLimitStore.delete(key);
    }
  }

  for (const [key, expiresAt] of duplicateStore) {
    if (expiresAt <= now) {
      duplicateStore.delete(key);
    }
  }
}

function isRateLimited(
  store: Map<string, RateLimitRecord>,
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  store.set(key, current);

  return false;
}

function parseBoolean(value: string): boolean {
  return value.toLowerCase() === "true";
}

function parseCcEmails(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return jsonResponse(
        { success: false, message: "This request is not allowed." },
        403,
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse(
        { success: false, message: "Invalid request format." },
        415,
      );
    }

    const declaredLength = Number(request.headers.get("content-length") || 0);

    if (declaredLength > MAX_REQUEST_BYTES) {
      return jsonResponse(
        { success: false, message: "The submitted form is too large." },
        413,
      );
    }

    const now = Date.now();
    pruneStores(now);

    const clientKey = getClientKey(request);

    if (
      isRateLimited(
        ipRateLimitStore,
        clientKey,
        IP_RATE_LIMIT_MAX_REQUESTS,
        IP_RATE_LIMIT_WINDOW_MS,
      )
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Too many requests were sent. Please wait 15 minutes and try again.",
        },
        429,
      );
    }

    const rawBody = await request.text();

    if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
      return jsonResponse(
        { success: false, message: "The submitted form is too large." },
        413,
      );
    }

    let body: ConsultationPayload;

    try {
      const parsed = JSON.parse(rawBody) as unknown;

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Invalid payload");
      }

      body = parsed as ConsultationPayload;
    } catch {
      return jsonResponse(
        { success: false, message: "Invalid form data." },
        400,
      );
    }

    if (cleanText(body.website, 200)) {
      return jsonResponse({ success: true });
    }

    const startedAt =
      typeof body.startedAt === "number"
        ? body.startedAt
        : Number(body.startedAt);

    if (
      !Number.isFinite(startedAt) ||
      startedAt <= 0 ||
      now - startedAt < MIN_FORM_FILL_MS ||
      now - startedAt > MAX_FORM_AGE_MS
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Please review the form and submit it again after a few seconds.",
        },
        400,
      );
    }

    const name = cleanText(body.name, 70);
    const phone = cleanText(body.phone, 22);
    const email = cleanText(body.email, 180).toLowerCase();
    const company = cleanText(body.company, 100);
    const service = cleanText(body.service, 120);
    const budget = cleanText(body.budget, 80);
    const message = cleanMessage(body.message, 3000);
    const source = cleanText(body.source, 40);

    if (!isValidName(name)) {
      return jsonResponse(
        {
          success: false,
          message:
            "Please enter your real name using letters, spaces, apostrophes or hyphens only.",
        },
        400,
      );
    }

    if (!isValidPhone(phone)) {
      return jsonResponse(
        {
          success: false,
          message: "Please enter a valid phone number with 8 to 15 digits.",
        },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          message: "Please enter a valid, non-temporary email address.",
        },
        400,
      );
    }

    if (!isValidCompany(company)) {
      return jsonResponse(
        {
          success: false,
          message: "Please enter a valid company name or leave it blank.",
        },
        400,
      );
    }

    if (!ALLOWED_SERVICES.has(service)) {
      return jsonResponse(
        { success: false, message: "Please select a valid service." },
        400,
      );
    }

    if (budget && !ALLOWED_BUDGETS.has(budget)) {
      return jsonResponse(
        { success: false, message: "Please select a valid budget." },
        400,
      );
    }

    if (source && !ALLOWED_SOURCES.has(source)) {
      return jsonResponse(
        { success: false, message: "Invalid form source." },
        400,
      );
    }

    if (!isValidMessage(message)) {
      return jsonResponse(
        {
          success: false,
          message:
            "Please describe your project clearly in at least 6 meaningful words and 30 characters.",
        },
        400,
      );
    }

    const emailKey = createHash("sha256").update(email).digest("hex");

    if (
      isRateLimited(
        emailRateLimitStore,
        emailKey,
        EMAIL_RATE_LIMIT_MAX_REQUESTS,
        EMAIL_RATE_LIMIT_WINDOW_MS,
      )
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Too many requests were submitted with this email. Please try again later.",
        },
        429,
      );
    }

    const duplicateKey = createHash("sha256")
      .update(
        [email, phone.replace(/\D/g, ""), service, message.toLowerCase()].join("|"),
      )
      .digest("hex");

    if ((duplicateStore.get(duplicateKey) || 0) > now) {
      return jsonResponse(
        {
          success: false,
          message:
            "This enquiry was already submitted. Please wait before sending it again.",
        },
        409,
      );
    }

    const emailMessage = [
      company ? `Company: ${company}` : "",
      budget ? `Estimated Budget: ${budget}` : "",
      message,
    ]
      .filter(Boolean)
      .join("\n\n");

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number(getRequiredEnv("SMTP_PORT"));
    const smtpSecure = parseBoolean(getRequiredEnv("SMTP_SECURE"));
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const fromEmail = getRequiredEnv("FROM_EMAIL");
    const toEmail = getRequiredEnv("CONSULTATION_TO_EMAIL");
    const ccEmails = parseCcEmails(process.env.CONSULTATION_CC_EMAILS);
    const fromName = process.env.FROM_NAME?.trim() || "MITOMS Website";

    if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
      throw new Error("SMTP_PORT must be a valid positive number.");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(emailMessage).replaceAll("\n", "<br />");
    const phoneHref = phone.replace(/[^+\d]/g, "");

    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      cc: ccEmails.length > 0 ? ccEmails : undefined,
      replyTo: email,
      subject: `New consultation request: ${service} - ${name}`,
      text: [
        "New consultation request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Submitted: ${submittedAt}`,
        "",
        "Project details:",
        emailMessage,
      ].join("\n"),
      html: `
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          New consultation request from ${safeName} for ${safeService}.
        </div>

        <div style="margin:0;background:#f4f2fb;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#081232;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:720px;background:#ffffff;border:1px solid #e5e0f1;border-radius:24px;overflow:hidden;box-shadow:0 20px 55px rgba(29,20,78,0.12);">

                  <tr>
                    <td style="padding:0;background:linear-gradient(110deg,#07183f 0%,#4b22ff 48%,#ff2f7d 115%);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding:28px 30px 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td>
                                  <div style="font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">
                                    MITOMS
                                  </div>
                                  <div style="margin-top:4px;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:rgba(255,255,255,0.72);">
                                    Website Enquiry
                                  </div>
                                </td>

                                <td align="right" valign="top">
                                  <span style="display:inline-block;border:1px solid rgba(255,255,255,0.28);border-radius:999px;background:rgba(255,255,255,0.13);padding:8px 13px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#ffffff;">
                                    New Lead
                                  </span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:10px 30px 30px;">
                            <div style="font-size:13px;font-weight:700;color:#ffb1d0;">
                              New consultation request
                            </div>

                            <h1 style="margin:8px 0 0;font-size:30px;line-height:1.18;letter-spacing:-0.7px;color:#ffffff;">
                              ${safeName} is interested in<br />
                              <span style="color:#ffd1e4;">${safeService}</span>
                            </h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:28px 30px 10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding:0 6px 12px 0;width:50%;">
                            <div style="min-height:82px;border:1px solid #e9e4f5;border-radius:16px;background:#fbfaff;padding:15px 16px;">
                              <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#7a7196;">
                                Client Name
                              </div>
                              <div style="margin-top:8px;font-size:16px;font-weight:800;line-height:1.4;color:#081232;">
                                ${safeName}
                              </div>
                            </div>
                          </td>

                          <td style="padding:0 0 12px 6px;width:50%;">
                            <div style="min-height:82px;border:1px solid #e9e4f5;border-radius:16px;background:#fbfaff;padding:15px 16px;">
                              <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#7a7196;">
                                Required Service
                              </div>
                              <div style="margin-top:8px;font-size:16px;font-weight:800;line-height:1.4;color:#4b22ff;">
                                ${safeService}
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:0 6px 12px 0;width:50%;">
                            <div style="min-height:82px;border:1px solid #e9e4f5;border-radius:16px;background:#fbfaff;padding:15px 16px;">
                              <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#7a7196;">
                                Email Address
                              </div>
                              <div style="margin-top:8px;font-size:14px;font-weight:700;line-height:1.4;word-break:break-word;">
                                <a href="mailto:${safeEmail}" style="color:#4b22ff;text-decoration:none;">${safeEmail}</a>
                              </div>
                            </div>
                          </td>

                          <td style="padding:0 0 12px 6px;width:50%;">
                            <div style="min-height:82px;border:1px solid #e9e4f5;border-radius:16px;background:#fbfaff;padding:15px 16px;">
                              <div style="font-size:10px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#7a7196;">
                                Phone Number
                              </div>
                              <div style="margin-top:8px;font-size:15px;font-weight:800;line-height:1.4;">
                                <a href="tel:${phoneHref}" style="color:#081232;text-decoration:none;">${safePhone}</a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:4px 30px 0;">
                      <div style="border:1px solid #e6e0f4;border-radius:18px;background:linear-gradient(135deg,#fbfaff 0%,#f7f3ff 100%);padding:20px 22px;">
                        <div style="font-size:10px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#ff2f7d;">
                          Project Details
                        </div>

                        <div style="margin-top:11px;font-size:15px;font-weight:500;line-height:1.75;color:#27314f;">
                          ${safeMessage}
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px 30px 8px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-right:10px;">
                            <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Your ${service} consultation request`)}" style="display:inline-block;border-radius:12px;background:linear-gradient(90deg,#4b22ff,#743cff,#ff2f7d);padding:13px 18px;font-size:13px;font-weight:800;color:#ffffff;text-decoration:none;">
                              Reply to Client
                            </a>
                          </td>

                          <td>
                            <a href="tel:${phoneHref}" style="display:inline-block;border:1px solid #ded8ec;border-radius:12px;background:#ffffff;padding:12px 18px;font-size:13px;font-weight:800;color:#081232;text-decoration:none;">
                              Call Client
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 30px 28px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #eeeaf6;">
                        <tr>
                          <td style="padding-top:16px;font-size:12px;line-height:1.6;color:#7a8399;">
                            Submitted on <strong style="color:#4d5871;">${escapeHtml(submittedAt)}</strong>
                          </td>

                          <td align="right" style="padding-top:16px;font-size:12px;line-height:1.6;color:#7a8399;">
                            Replying to this email will contact the client directly.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    duplicateStore.set(duplicateKey, Date.now() + DUPLICATE_WINDOW_MS);

    let confirmationSent = true;

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        replyTo: toEmail,
        subject: "We received your consultation request - MITOMS",
        text: [
          `Hello ${name},`,
          "",
          "Thank you for contacting MITOMS.",
          `We received your request regarding ${service}.`,
          "Our team will review the details and contact you within one business day.",
          "",
          "Your message:",
          emailMessage,
          "",
          "Regards,",
          "MITOMS Team",
        ].join("\n"),
        html: `
          <div style="margin:0;background:#f7f5ff;padding:32px;font-family:Arial,sans-serif;color:#081232;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e1f2;border-radius:20px;overflow:hidden;">
              <div style="padding:24px 28px;background:linear-gradient(110deg,#4b22ff,#743cff,#ff2f7d);color:#ffffff;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">MITOMS</p>
                <h1 style="margin:0;font-size:26px;">Request Received</h1>
              </div>
              <div style="padding:28px;">
                <p style="margin:0 0 16px;font-size:17px;line-height:1.7;">Hello <strong>${safeName}</strong>,</p>
                <p style="margin:0 0 16px;line-height:1.7;color:#34405f;">Thank you for contacting MITOMS. We received your consultation request for <strong>${safeService}</strong>.</p>
                <p style="margin:0 0 22px;line-height:1.7;color:#34405f;">Our team will review the information and contact you within one business day.</p>
                <div style="padding:20px;border-radius:14px;background:#f8f6ff;border:1px solid #ebe6fa;">
                  <p style="margin:0 0 10px;color:#5c6680;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Your Message</p>
                  <p style="margin:0;line-height:1.7;">${safeMessage}</p>
                </div>
                <p style="margin:24px 0 0;line-height:1.7;">Regards,<br /><strong>MITOMS Team</strong></p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (confirmationError) {
      confirmationSent = false;
      console.error("Consultation confirmation email failed:", confirmationError);
    }

    return jsonResponse({ success: true, confirmationSent });
  } catch (error) {
    console.error("Consultation form error:", error);

    return jsonResponse(
      {
        success: false,
        message: "We could not send your request right now. Please try again shortly.",
      },
      500,
    );
  }
}