import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ConsultationPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, RateLimitRecord>();

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMessage(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);

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
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many requests were sent. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as ConsultationPayload;

    if (cleanText(body.website, 200)) {
      return NextResponse.json({ success: true });
    }

    const name = cleanText(body.name, 100);
    const phone = cleanText(body.phone, 40);
    const email = cleanText(body.email, 180).toLowerCase();
    const service = cleanText(body.service, 120);
    const message = cleanMessage(body.message, 5000);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid name." },
        { status: 400 },
      );
    }

    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Please select a service." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please add a little more detail about your project.",
        },
        { status: 400 },
      );
    }

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number(getRequiredEnv("SMTP_PORT"));
    const smtpSecure = parseBoolean(getRequiredEnv("SMTP_SECURE"));
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const fromEmail = getRequiredEnv("FROM_EMAIL");
    const toEmail = getRequiredEnv("CONSULTATION_TO_EMAIL");
    const ccEmails = parseCcEmails(process.env.CONSULTATION_CC_EMAILS);
    const fromName = process.env.FROM_NAME?.trim() || "MITOMS Business Team";

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
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

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
        message,
      ].join("\n"),
      html: `
        <div style="margin:0;background:#f7f5ff;padding:32px;font-family:Arial,sans-serif;color:#081232;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e6e1f2;border-radius:20px;overflow:hidden;">
            <div style="padding:24px 28px;background:linear-gradient(110deg,#4b22ff,#743cff,#ff2f7d);color:#ffffff;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">MITOMS Website</p>
              <h1 style="margin:0;font-size:26px;">New Consultation Request</h1>
            </div>
            <div style="padding:28px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;width:150px;color:#5c6680;font-weight:700;">Name</td><td style="padding:10px 0;font-weight:700;">${safeName}</td></tr>
                <tr><td style="padding:10px 0;color:#5c6680;font-weight:700;">Email</td><td style="padding:10px 0;"><a href="mailto:${safeEmail}" style="color:#4b22ff;">${safeEmail}</a></td></tr>
                <tr><td style="padding:10px 0;color:#5c6680;font-weight:700;">Phone</td><td style="padding:10px 0;">${safePhone}</td></tr>
                <tr><td style="padding:10px 0;color:#5c6680;font-weight:700;">Service</td><td style="padding:10px 0;">${safeService}</td></tr>
                <tr><td style="padding:10px 0;color:#5c6680;font-weight:700;">Submitted</td><td style="padding:10px 0;">${escapeHtml(submittedAt)}</td></tr>
              </table>
              <div style="margin-top:22px;padding:20px;border-radius:14px;background:#f8f6ff;border:1px solid #ebe6fa;">
                <p style="margin:0 0 10px;color:#5c6680;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Project Details</p>
                <p style="margin:0;line-height:1.7;">${safeMessage}</p>
              </div>
              <p style="margin:22px 0 0;color:#65708b;font-size:13px;">Reply directly to this email to contact ${safeName}.</p>
            </div>
          </div>
        </div>
      `,
    });

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
          message,
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

    return NextResponse.json({ success: true, confirmationSent });
  } catch (error) {
    console.error("Consultation form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "We could not send your request right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}