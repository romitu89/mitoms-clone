"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";

type ConsultationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const services = [
  "Website Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "AI & Digital Transformation",
  "IT Consulting",
  "Digital Marketing",
];

const clientNamePattern = /^[\p{L}\p{M} .'-]+$/u;


function sanitizeNameInput(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M} .'-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 70);
}

function sanitizePhoneInput(value: string): string {
  const allowedCharacters = value.replace(/[^+()\s\d-]/g, "");
  const singleLeadingPlus = allowedCharacters.replace(/(?!^)\+/g, "");

  return singleLeadingPlus.replace(/\s{2,}/g, " ").slice(0, 22);
}

function sanitizeEmailInput(value: string): string {
  return value.replace(/\s/g, "").slice(0, 180);
}


type FormFieldName =
  | "name"
  | "phone"
  | "email"
  | "company"
  | "service"
  | "message";

type FormFieldErrors = Partial<Record<FormFieldName, string>>;

function getNameFieldError(value: string): string {
  const name = value.normalize("NFKC").trim();

  if (!name) {
    return "Full name is required.";
  }

  if (
    name.length < 2 ||
    name.length > 70 ||
    !clientNamePattern.test(name) ||
    (name.match(/\p{L}/gu) ?? []).length < 2
  ) {
    return "Use letters only. Numbers and special symbols are not allowed.";
  }

  if (/^(test|testing|asdf|qwerty|unknown|anonymous|admin|user|name)$/i.test(name)) {
    return "Please enter your real full name.";
  }

  return "";
}

function getPhoneFieldError(value: string): string {
  const phone = value.trim();
  const phoneDigits = phone.replace(/\D/g, "");

  if (!phone) {
    return "Phone number is required.";
  }

  if (!/^[+()\s\d-]+$/.test(phone)) {
    return "Use digits only. Letters are not allowed in the phone number.";
  }

  if (
    phoneDigits.length < 8 ||
    phoneDigits.length > 15 ||
    /^(\d)\1+$/.test(phoneDigits)
  ) {
    return "Enter a valid phone number containing 8 to 15 digits.";
  }

  return "";
}

function getEmailFieldError(value: string): string {
  const email = value.trim().toLowerCase();

  if (!email) {
    return "Email address is required.";
  }

  if (
    email.length < 6 ||
    email.length > 180 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
    email.includes("..")
  ) {
    return "Enter a valid email address, for example name@company.com.";
  }

  return "";
}

function getCompanyFieldError(value: string): string {
  const company = value.normalize("NFKC").trim();

  if (!company) {
    return "";
  }

  if (
    company.length < 2 ||
    company.length > 100 ||
    !/^[\p{L}\p{M}\p{N} &.,'()\/-]+$/u.test(company)
  ) {
    return "Enter a valid company name using normal letters, numbers and punctuation.";
  }

  return "";
}

function getServiceFieldError(value: string): string {
  if (!value || !services.includes(value)) {
    return "Please select a service.";
  }

  return "";
}

function getMessageFieldError(value: string): string {
  const message = value.normalize("NFKC").trim();
  const words = message.match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'-]*/gu) ?? [];
  const uniqueWords = new Set(
    words.map((word) => word.toLowerCase()).filter((word) => word.length >= 3),
  );

  if (!message) {
    return "Project details are required.";
  }

  if (
    message.length < 30 ||
    message.length > 3000 ||
    words.length < 6 ||
    uniqueWords.size < 4 ||
    (message.match(/\p{L}/gu) ?? []).length < 20 ||
    /(.)\1{8,}/u.test(message)
  ) {
    return "Describe your project in at least 6 meaningful words and 30 characters.";
  }

  return "";
}

function getFieldValidationErrors(values: {
  name: string;
  phone: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}): FormFieldErrors {
  const errors: FormFieldErrors = {};

  const nameError = getNameFieldError(values.name);
  const phoneError = getPhoneFieldError(values.phone);
  const emailError = getEmailFieldError(values.email);
  const companyError = getCompanyFieldError(values.company ?? "");
  const serviceError = getServiceFieldError(values.service);
  const messageError = getMessageFieldError(values.message);

  if (nameError) errors.name = nameError;
  if (phoneError) errors.phone = phoneError;
  if (emailError) errors.email = emailError;
  if (companyError) errors.company = companyError;
  if (serviceError) errors.service = serviceError;
  if (messageError) errors.message = messageError;

  return errors;
}



export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedAtRef = useRef<number>(0);

  const updateFieldError = (field: FormFieldName, error: string) => {
    setFieldErrors((current) => {
      if (current[field] === error) {
        return current;
      }

      const next = { ...current };

      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }

      return next;
    });
  };

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      return;
    }

    setIsVisible(false);

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setShouldRender(false);
      onClose();
    }, 220);
  }, [onClose]);

  useEffect(() => {
    let mountFrameId: number | null = null;
    let visibilityFrameId: number | null = null;
    let unmountTimerId: number | null = null;

    if (isOpen) {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      mountFrameId = window.requestAnimationFrame(() => {
        setShouldRender(true);

        visibilityFrameId = window.requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      mountFrameId = window.requestAnimationFrame(() => {
        setIsVisible(false);

        unmountTimerId = window.setTimeout(() => {
          setShouldRender(false);
        }, 220);
      });
    }

    return () => {
      if (mountFrameId !== null) {
        window.cancelAnimationFrame(mountFrameId);
      }

      if (visibilityFrameId !== null) {
        window.cancelAnimationFrame(visibilityFrameId);
      }

      if (unmountTimerId !== null) {
        window.clearTimeout(unmountTimerId);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [requestClose, shouldRender]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    formStartedAtRef.current = new Date().getTime();

    const frameId = window.requestAnimationFrame(() => {
      formRef.current?.reset();
      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError("");
      setFieldErrors({});
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        setSubmitError("");
        setFieldErrors({});
      }, 250);

      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      source: "consultation-modal",
      startedAt: formStartedAtRef.current,
    };

    const validationErrors = getFieldValidationErrors(payload);
    const firstInvalidField = ["name", "phone", "email", "service", "message"].find(
      (field) => validationErrors[field as FormFieldName],
    ) as FormFieldName | undefined;

    if (firstInvalidField) {
      setFieldErrors(validationErrors);
      setSubmitError("Please correct the highlighted fields before submitting.");

      const invalidElement = form.elements.namedItem(firstInvalidField);

      if (invalidElement instanceof HTMLElement) {
        invalidElement.focus();
      }

      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "We could not send your request. Please try again.",
        );
      }

      form.reset();
      setFieldErrors({});
      formStartedAtRef.current = new Date().getTime();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black transition-opacity duration-200 ease-out ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Premium ambient scene behind the modal */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden bg-black"
      >
        <div className="consultation-space-field consultation-space-field-one" />
        <div className="consultation-space-field consultation-space-field-two" />
        <div className="consultation-space-field consultation-space-field-three" />

        <div className="consultation-nebula consultation-nebula-one" />
        <div className="consultation-nebula consultation-nebula-two" />

        <div className="consultation-planet" aria-hidden="true">
          <span className="consultation-planet-ring" />
        </div>

        <div className="consultation-orbit consultation-orbit-one">
          <span />
          <span />
          <span />
        </div>

        <div className="consultation-orbit consultation-orbit-two">
          <span />
          <span />
          <span />
        </div>

        <div className="consultation-comet consultation-comet-one" />
        <div className="consultation-comet consultation-comet-two" />
        <div className="consultation-comet consultation-comet-three" />
        <div className="consultation-comet consultation-comet-four" />

        <div className="consultation-stars">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <div
        className="relative flex min-h-full items-start justify-center px-3 py-3 sm:px-4 sm:py-5 lg:py-6 xl:py-8"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) requestClose();
        }}
      >
        <div
          className={`consultation-premium-shell relative my-auto w-full max-w-[980px] rounded-[25px] p-px transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-[31px] ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-[0.72] opacity-0"
          }`}
        >
          <div className="consultation-modal-card relative w-full overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_35px_100px_rgba(4,8,29,0.45)] sm:rounded-[30px]">
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close consultation form"
          className="absolute right-5 top-5 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#07112f]/75 text-white backdrop-blur transition hover:rotate-90 hover:bg-[#ff2f7d]"
        >
          <X size={20} />
        </button>

        <div className="grid min-w-0 lg:grid-cols-[0.92fr_1.08fr]">
          {/* LEFT VISUAL */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[linear-gradient(145deg,#07153c_0%,#251061_48%,#ff2f7d_135%)] p-10 text-white lg:flex lg:flex-col">
            <div className="pointer-events-none absolute -left-20 top-14 h-64 w-64 rounded-full bg-[#167dff]/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-[#ff2f7d]/35 blur-[90px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] backdrop-blur">
                <Sparkles size={15} />
                Free Consultation
              </div>

              <h2 className="mt-8 text-[44px] font-black leading-[1.05] tracking-[-0.045em]">
                Let&apos;s Build
                <span className="mt-2 block font-serif text-[54px] font-medium italic text-[#ff82b4]">
                  Something Amazing
                </span>
              </h2>

              <p className="mt-6 max-w-[390px] text-sm font-semibold leading-7 text-white/70">
                Tell us what you are planning. Our team will help you shape the
                right solution, roadmap and next steps.
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[22px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">500+</p>
                  <p className="mt-1 text-xs font-semibold text-white/65">
                    Projects Delivered
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">24H</p>
                  <p className="mt-1 text-xs font-semibold text-white/65">
                    Average Response
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "100% free consultation",
                  "Clear and practical recommendations",
                  "No spam or unnecessary follow-ups",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-white/75"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <Check size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative min-h-[650px] min-w-0 bg-[#fbfaff] p-6 sm:p-9 lg:p-11">
            <div className="pointer-events-none absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-[#4b22ff]/10 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-[-110px] left-[-70px] h-64 w-64 rounded-full bg-[#ff2f7d]/10 blur-[90px]" />

            {!submitted ? (
              <div className="relative z-10">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#4b22ff]">
                  Start Your Project
                </p>

                <h3 className="mt-3 pr-12 text-3xl font-black tracking-[-0.035em] text-[#081232]">
                  Get Your Free Consultation
                </h3>

                <p className="mt-3 text-sm font-semibold leading-7 text-[#34405f]/65">
                  Fill in the details below and our team will contact you within
                  one business day.
                </p>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  className="mt-8 space-y-4"
                >
                  <div
                    className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="group block">
                      <div className="relative">
                        <User
                          size={18}
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                            fieldErrors.name
                              ? "text-[#d11a4d]"
                              : "text-[#776d96] group-focus-within:text-[#4b22ff]"
                          }`}
                        />
                        <input
                          required
                          type="text"
                          name="name"
                          minLength={2}
                          maxLength={70}
                          autoComplete="name"
                          inputMode="text"
                          aria-invalid={Boolean(fieldErrors.name)}
                          aria-describedby={fieldErrors.name ? "consultation-name-error" : undefined}
                          onInput={(event) => {
                            const rawValue = event.currentTarget.value;
                            const sanitizedValue = sanitizeNameInput(rawValue);
                            event.currentTarget.value = sanitizedValue;

                            if (rawValue !== sanitizedValue) {
                              updateFieldError(
                                "name",
                                "Use letters only. Numbers and special symbols are not allowed.",
                              );
                              return;
                            }

                            updateFieldError(
                              "name",
                              sanitizedValue.trim().length >= 2
                                ? getNameFieldError(sanitizedValue)
                                : "",
                            );
                          }}
                          onBlur={(event) =>
                            updateFieldError(
                              "name",
                              getNameFieldError(event.currentTarget.value),
                            )
                          }
                          placeholder="Your name"
                          className={`h-14 w-full rounded-[16px] border bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 ${
                            fieldErrors.name
                              ? "border-[#e11d48] bg-[#fff7f9] shadow-[0_0_0_3px_rgba(225,29,72,0.08)] focus:border-[#e11d48]"
                              : "border-[#e2def1] focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                          }`}
                        />
                      </div>
                      {fieldErrors.name && (
                        <p
                          id="consultation-name-error"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-[#d11a4d]"
                        >
                          <span aria-hidden="true">•</span>
                          {fieldErrors.name}
                        </p>
                      )}
                    </label>

                    <label className="group block">
                      <div className="relative">
                        <Phone
                          size={18}
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                            fieldErrors.phone
                              ? "text-[#d11a4d]"
                              : "text-[#776d96] group-focus-within:text-[#4b22ff]"
                          }`}
                        />
                        <input
                          required
                          type="tel"
                          name="phone"
                          minLength={8}
                          maxLength={22}
                          inputMode="tel"
                          autoComplete="tel"
                          aria-invalid={Boolean(fieldErrors.phone)}
                          aria-describedby={fieldErrors.phone ? "consultation-phone-error" : undefined}
                          onInput={(event) => {
                            const rawValue = event.currentTarget.value;
                            const sanitizedValue = sanitizePhoneInput(rawValue);
                            event.currentTarget.value = sanitizedValue;

                            if (rawValue !== sanitizedValue) {
                              updateFieldError(
                                "phone",
                                "Use digits only. Letters are not allowed in the phone number.",
                              );
                              return;
                            }

                            const digitCount = sanitizedValue.replace(/\D/g, "").length;
                            updateFieldError(
                              "phone",
                              digitCount >= 8 ? getPhoneFieldError(sanitizedValue) : "",
                            );
                          }}
                          onBlur={(event) =>
                            updateFieldError(
                              "phone",
                              getPhoneFieldError(event.currentTarget.value),
                            )
                          }
                          placeholder="Phone number"
                          className={`h-14 w-full rounded-[16px] border bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 ${
                            fieldErrors.phone
                              ? "border-[#e11d48] bg-[#fff7f9] shadow-[0_0_0_3px_rgba(225,29,72,0.08)] focus:border-[#e11d48]"
                              : "border-[#e2def1] focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                          }`}
                        />
                      </div>
                      {fieldErrors.phone && (
                        <p
                          id="consultation-phone-error"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-[#d11a4d]"
                        >
                          <span aria-hidden="true">•</span>
                          {fieldErrors.phone}
                        </p>
                      )}
                    </label>
                  </div>

                  <label className="group block">
                    <div className="relative">
                      <Mail
                        size={18}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                          fieldErrors.email
                            ? "text-[#d11a4d]"
                            : "text-[#776d96] group-focus-within:text-[#4b22ff]"
                        }`}
                      />
                      <input
                        required
                        type="email"
                        name="email"
                        maxLength={180}
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "consultation-email-error" : undefined}
                        onInput={(event) => {
                          const rawValue = event.currentTarget.value;
                          const sanitizedValue = sanitizeEmailInput(rawValue);
                          event.currentTarget.value = sanitizedValue;

                          if (rawValue !== sanitizedValue) {
                            updateFieldError("email", "Spaces are not allowed in an email address.");
                            return;
                          }

                          updateFieldError(
                            "email",
                            sanitizedValue.includes("@")
                              ? getEmailFieldError(sanitizedValue)
                              : "",
                          );
                        }}
                        onBlur={(event) =>
                          updateFieldError(
                            "email",
                            getEmailFieldError(event.currentTarget.value),
                          )
                        }
                        placeholder="Business email"
                        className={`h-14 w-full rounded-[16px] border bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 ${
                          fieldErrors.email
                            ? "border-[#e11d48] bg-[#fff7f9] shadow-[0_0_0_3px_rgba(225,29,72,0.08)] focus:border-[#e11d48]"
                            : "border-[#e2def1] focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        }`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p
                        id="consultation-email-error"
                        role="alert"
                        className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-[#d11a4d]"
                      >
                        <span aria-hidden="true">•</span>
                        {fieldErrors.email}
                      </p>
                    )}
                  </label>

                  <label className="group block">
                    <div className="relative">
                      <select
                        required
                        name="service"
                        defaultValue=""
                        aria-invalid={Boolean(fieldErrors.service)}
                        aria-describedby={fieldErrors.service ? "consultation-service-error" : undefined}
                        onChange={(event) =>
                          updateFieldError(
                            "service",
                            getServiceFieldError(event.currentTarget.value),
                          )
                        }
                        onBlur={(event) =>
                          updateFieldError(
                            "service",
                            getServiceFieldError(event.currentTarget.value),
                          )
                        }
                        className={`h-14 w-full cursor-pointer appearance-none rounded-[16px] border bg-white px-4 pr-12 text-sm font-semibold text-[#34405f] outline-none transition ${
                          fieldErrors.service
                            ? "border-[#e11d48] bg-[#fff7f9] shadow-[0_0_0_3px_rgba(225,29,72,0.08)] focus:border-[#e11d48]"
                            : "border-[#e2def1] group-hover:border-[#cfc6ed] focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        }`}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>

                      <span className={`pointer-events-none absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition duration-300 group-focus-within:rotate-180 ${
                        fieldErrors.service
                          ? "bg-[#ffe4ec] text-[#d11a4d]"
                          : "bg-[#f3efff] text-[#4b22ff] group-hover:bg-[#e9e2ff]"
                      }`}>
                        <ChevronDown size={18} strokeWidth={2.4} />
                      </span>
                    </div>
                    {fieldErrors.service && (
                      <p
                        id="consultation-service-error"
                        role="alert"
                        className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-[#d11a4d]"
                      >
                        <span aria-hidden="true">•</span>
                        {fieldErrors.service}
                      </p>
                    )}
                  </label>

                  <label className="group block">
                    <div className="relative">
                      <MessageSquareText
                        size={18}
                        className={`absolute left-4 top-5 transition ${
                          fieldErrors.message
                            ? "text-[#d11a4d]"
                            : "text-[#776d96] group-focus-within:text-[#4b22ff]"
                        }`}
                      />
                      <textarea
                        required
                        name="message"
                        minLength={30}
                        maxLength={3000}
                        rows={5}
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? "consultation-message-error" : undefined}
                        onInput={(event) => {
                          const value = event.currentTarget.value;
                          updateFieldError(
                            "message",
                            value.trim().length >= 30
                              ? getMessageFieldError(value)
                              : "",
                          );
                        }}
                        onBlur={(event) =>
                          updateFieldError(
                            "message",
                            getMessageFieldError(event.currentTarget.value),
                          )
                        }
                        placeholder="Tell us briefly about your project, goals and timeline..."
                        className={`w-full resize-none rounded-[16px] border bg-white py-4 pl-12 pr-4 text-sm font-semibold leading-6 text-[#081232] outline-none transition placeholder:text-[#71809f]/55 ${
                          fieldErrors.message
                            ? "border-[#e11d48] bg-[#fff7f9] shadow-[0_0_0_3px_rgba(225,29,72,0.08)] focus:border-[#e11d48]"
                            : "border-[#e2def1] focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        }`}
                      />
                    </div>
                    {fieldErrors.message && (
                      <p
                        id="consultation-message-error"
                        role="alert"
                        className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-[#d11a4d]"
                      >
                        <span aria-hidden="true">•</span>
                        {fieldErrors.message}
                      </p>
                    )}
                  </label>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-[14px] border border-[#ff2f7d]/25 bg-[#fff2f6] px-4 py-3 text-[13px] font-semibold leading-6 text-[#a51d49]"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-[#4b22ff] via-[#7038ff] to-[#ff315d] text-sm font-black text-white shadow-[0_14px_30px_rgba(75,34,255,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
                  >
                    {isSubmitting
                      ? "Sending Your Request..."
                      : "Schedule Free Consultation"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-[#42506d]/55">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#4b22ff]" />
                    100% Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#4b22ff]" />
                    No Spam
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#4b22ff]" />
                    Reply Within 24H
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_20px_50px_rgba(95,42,255,0.28)]">
                  <Check size={46} strokeWidth={2.5} />
                </div>

                <p className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#4b22ff]">
                  Request Received
                </p>

                <h3 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#081232]">
                  Thank You!
                </h3>

                <p className="mt-4 max-w-[420px] text-sm font-semibold leading-7 text-[#34405f]/65">
                  Your consultation request has been submitted. A confirmation
                  email has been sent to you, and our team will contact you within
                  one business day.
                </p>

                <button
                  type="button"
                  onClick={requestClose}
                  className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-[14px] bg-[#081232] px-7 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#4b22ff]"
                >
                  Back to Website
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      <style>{`
        .consultation-premium-shell {
          isolation: isolate;
          background:
            linear-gradient(#ffffff, #ffffff) padding-box,
            conic-gradient(
              from var(--consultation-angle),
              rgba(75, 34, 255, 0.25),
              rgba(0, 184, 255, 0.95),
              rgba(255, 255, 255, 0.95),
              rgba(255, 47, 125, 0.95),
              rgba(255, 179, 71, 0.85),
              rgba(75, 34, 255, 0.25)
            ) border-box;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 0 34px rgba(75, 34, 255, 0.24),
            0 0 70px rgba(255, 47, 125, 0.12);
          transform-origin: center center;
          backface-visibility: hidden;
          will-change: transform, opacity;
          animation: consultationBorderRotate 16s linear infinite;
        }

        .consultation-premium-shell::before {
          content: "";
          position: absolute;
          inset: -14px;
          z-index: -1;
          border-radius: inherit;
          background: conic-gradient(
            from var(--consultation-angle),
            transparent 0deg,
            rgba(0, 184, 255, 0.28) 62deg,
            transparent 112deg,
            rgba(255, 47, 125, 0.3) 188deg,
            transparent 242deg,
            rgba(124, 92, 255, 0.3) 310deg,
            transparent 360deg
          );
          filter: blur(22px);
          opacity: 0.82;
          animation: consultationBorderRotate 8s linear infinite;
        }

        .consultation-modal-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 25;
          pointer-events: none;
          transform: translateX(-145%) skewX(-17deg);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 34%,
            rgba(255, 255, 255, 0.24) 50%,
            rgba(255, 255, 255, 0.04) 66%,
            transparent 100%
          );
          animation: consultationGlassSweep 2.8s ease-in-out 900ms 1 both;
        }

        .consultation-space-field {
          position: absolute;
          inset: -12%;
          background-repeat: repeat;
          will-change: transform;
        }

        .consultation-space-field-one {
          opacity: 0.82;
          background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.96) 0 1px, transparent 1.4px),
            radial-gradient(circle, rgba(160, 205, 255, 0.76) 0 1px, transparent 1.5px);
          background-position:
            0 0,
            46px 78px;
          background-size:
            112px 112px,
            156px 156px;
          animation: consultationStarDriftOne 90s linear infinite;
        }

        .consultation-space-field-two {
          opacity: 0.48;
          background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.8) 0 1px, transparent 1.3px),
            radial-gradient(circle, rgba(178, 138, 255, 0.72) 0 1px, transparent 1.6px);
          background-position:
            24px 14px,
            90px 54px;
          background-size:
            78px 78px,
            132px 132px;
          animation: consultationStarDriftTwo 120s linear infinite;
        }

        .consultation-space-field-three {
          display: none;
          opacity: 0.3;
          background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.7) 0 0.8px, transparent 1.2px);
          background-size: 48px 48px;
          animation: consultationStarDriftThree 150s linear infinite;
        }

        .consultation-nebula {
          position: absolute;
          border-radius: 999px;
          filter: blur(62px);
          mix-blend-mode: screen;
          opacity: 0.22;
          will-change: transform;
        }

        .consultation-nebula-one {
          left: -8vw;
          top: 12vh;
          width: min(360px, 34vw);
          height: min(360px, 34vw);
          background: radial-gradient(
            circle,
            rgba(75, 34, 255, 0.72) 0%,
            rgba(75, 34, 255, 0.18) 44%,
            transparent 72%
          );
          transform: translateZ(0);
        }

        .consultation-nebula-two {
          right: -7vw;
          bottom: 8vh;
          width: min(400px, 38vw);
          height: min(400px, 38vw);
          background: radial-gradient(
            circle,
            rgba(0, 184, 255, 0.58) 0%,
            rgba(255, 47, 125, 0.12) 48%,
            transparent 74%
          );
          transform: translateZ(0);
        }

        .consultation-planet {
          position: absolute;
          left: -74px;
          bottom: -88px;
          width: 210px;
          height: 210px;
          border-radius: 50%;
          opacity: 0.66;
          background:
            radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.3), transparent 18%),
            radial-gradient(circle at 42% 38%, #2f1c78 0%, #130a3f 44%, #050313 78%);
          box-shadow:
            inset -32px -28px 45px rgba(0, 0, 0, 0.72),
            0 0 42px rgba(75, 34, 255, 0.24);
          animation: consultationPlanetFloat 18s ease-in-out infinite alternate;
        }

        .consultation-planet-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 300px;
          height: 72px;
          transform: translate(-50%, -50%) rotate(-17deg);
          border: 2px solid rgba(151, 118, 255, 0.38);
          border-radius: 50%;
          box-shadow:
            0 0 18px rgba(75, 34, 255, 0.18),
            inset 0 0 12px rgba(0, 184, 255, 0.1);
        }

        .consultation-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 50%;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .consultation-orbit-one {
          width: min(1160px, 96vw);
          height: min(760px, 80vh);
          animation: consultationOrbitOne 18s linear infinite;
        }

        .consultation-orbit-two {
          width: min(1260px, 104vw);
          height: min(860px, 90vh);
          border-color: rgba(124, 92, 255, 0.1);
          animation: consultationOrbitTwo 24s linear infinite reverse;
        }

        .consultation-orbit span {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #ffffff;
          box-shadow:
            0 0 10px #ffffff,
            0 0 24px rgba(0, 184, 255, 0.95),
            0 0 42px rgba(75, 34, 255, 0.75);
        }

        .consultation-orbit span:nth-child(1) {
          left: 8%;
          top: 20%;
        }

        .consultation-orbit span:nth-child(2) {
          right: 12%;
          top: 28%;
          box-shadow:
            0 0 10px #ffffff,
            0 0 24px rgba(255, 47, 125, 0.95),
            0 0 42px rgba(255, 47, 125, 0.65);
        }

        .consultation-orbit span:nth-child(3) {
          left: 52%;
          bottom: -4px;
          box-shadow:
            0 0 10px #ffffff,
            0 0 24px rgba(255, 179, 71, 0.95),
            0 0 42px rgba(255, 179, 71, 0.65);
        }

        .consultation-comet {
          position: absolute;
          width: 220px;
          height: 1.5px;
          border-radius: 999px;
          opacity: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.96)
          );
          filter: drop-shadow(0 0 8px rgba(0, 184, 255, 0.9));
          transform: rotate(-28deg);
        }

        .consultation-comet::after {
          content: "";
          position: absolute;
          right: -2px;
          top: 50%;
          width: 7px;
          height: 7px;
          transform: translateY(-50%);
          border-radius: 999px;
          background: #ffffff;
          box-shadow:
            0 0 9px #ffffff,
            0 0 22px rgba(0, 184, 255, 0.95);
        }

        .consultation-comet-one {
          left: -180px;
          top: 14%;
          animation: consultationCometOne 18s linear 1.5s infinite;
        }

        .consultation-comet-two {
          right: -190px;
          top: 26%;
          transform: rotate(208deg);
          filter: drop-shadow(0 0 8px rgba(255, 47, 125, 0.9));
          animation: consultationCometTwo 22s linear 6s infinite;
        }

        .consultation-comet-three {
          left: -170px;
          bottom: 19%;
          filter: drop-shadow(0 0 8px rgba(124, 92, 255, 0.9));
          animation: consultationCometThree 20s linear 10s infinite;
        }

        .consultation-comet-four {
          right: -200px;
          bottom: 11%;
          transform: rotate(204deg);
          filter: drop-shadow(0 0 8px rgba(255, 179, 71, 0.88));
          animation: consultationCometFour 24s linear 14s infinite;
        }

        .consultation-stars span {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.85);
          animation: consultationStarTwinkle 5.5s ease-in-out infinite;
        }

        .consultation-stars span:nth-child(1) { left: 7%; top: 14%; animation-delay: 0.1s; }
        .consultation-stars span:nth-child(2) { left: 13%; top: 72%; animation-delay: 1.2s; }
        .consultation-stars span:nth-child(3) { left: 19%; top: 31%; animation-delay: 2s; }
        .consultation-stars span:nth-child(4) { left: 27%; top: 87%; animation-delay: 0.7s; }
        .consultation-stars span:nth-child(5) { left: 32%; top: 11%; animation-delay: 1.8s; }
        .consultation-stars span:nth-child(6) { left: 39%; top: 64%; animation-delay: 2.7s; }
        .consultation-stars span:nth-child(7) { left: 45%; top: 22%; animation-delay: 0.4s; }
        .consultation-stars span:nth-child(8) { left: 51%; top: 82%; animation-delay: 1.5s; }
        .consultation-stars span:nth-child(9) { left: 57%; top: 8%; animation-delay: 2.4s; }
        .consultation-stars span:nth-child(10) { left: 63%; top: 58%; animation-delay: 0.9s; }
        .consultation-stars span:nth-child(11) { left: 69%; top: 18%; animation-delay: 2.2s; }
        .consultation-stars span:nth-child(12) { left: 74%; top: 89%; animation-delay: 1.1s; }
        .consultation-stars span:nth-child(13) { left: 80%; top: 37%; animation-delay: 2.9s; }
        .consultation-stars span:nth-child(14) { left: 86%; top: 68%; animation-delay: 0.2s; }
        .consultation-stars span:nth-child(15) { left: 92%; top: 17%; animation-delay: 1.6s; }
        .consultation-stars span:nth-child(16) { left: 95%; top: 82%; animation-delay: 2.5s; }
        .consultation-stars span:nth-child(17) { left: 4%; top: 47%; animation-delay: 1.3s; }
        .consultation-stars span:nth-child(18) { left: 89%; top: 49%; animation-delay: 2.1s; }
        .consultation-stars span:nth-child(19) { left: 10%; top: 26%; animation-delay: 3.1s; }
        .consultation-stars span:nth-child(20) { left: 16%; top: 91%; animation-delay: 0.5s; }
        .consultation-stars span:nth-child(21) { left: 23%; top: 53%; animation-delay: 2.8s; }
        .consultation-stars span:nth-child(22) { left: 30%; top: 76%; animation-delay: 1.4s; }
        .consultation-stars span:nth-child(23) { left: 36%; top: 35%; animation-delay: 3.3s; }
        .consultation-stars span:nth-child(24) { left: 42%; top: 94%; animation-delay: 0.8s; }
        .consultation-stars span:nth-child(25) { left: 49%; top: 43%; animation-delay: 2.6s; }
        .consultation-stars span:nth-child(26) { left: 55%; top: 69%; animation-delay: 1.7s; }
        .consultation-stars span:nth-child(27) { left: 61%; top: 27%; animation-delay: 3s; }
        .consultation-stars span:nth-child(28) { left: 67%; top: 78%; animation-delay: 0.3s; }
        .consultation-stars span:nth-child(29) { left: 72%; top: 47%; animation-delay: 2.3s; }
        .consultation-stars span:nth-child(30) { left: 78%; top: 8%; animation-delay: 1s; }
        .consultation-stars span:nth-child(31) { left: 83%; top: 93%; animation-delay: 3.4s; }
        .consultation-stars span:nth-child(32) { left: 88%; top: 29%; animation-delay: 1.9s; }
        .consultation-stars span:nth-child(33) { left: 93%; top: 61%; animation-delay: 0.6s; }
        .consultation-stars span:nth-child(34) { left: 2%; top: 84%; animation-delay: 2.5s; }
        .consultation-stars span:nth-child(35) { left: 52%; top: 15%; animation-delay: 3.2s; }
        .consultation-stars span:nth-child(36) { left: 97%; top: 39%; animation-delay: 1.3s; }

        @property --consultation-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes consultationBorderRotate {
          to {
            --consultation-angle: 360deg;
          }
        }

        @keyframes consultationShellEnter {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.72);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes consultationGlassSweep {
          0%,
          58% {
            transform: translateX(-145%) skewX(-17deg);
          }
          76%,
          100% {
            transform: translateX(145%) skewX(-17deg);
          }
        }

        @keyframes consultationStarDriftOne {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-70px, 48px, 0) scale(1.02);
          }
        }

        @keyframes consultationStarDriftTwo {
          from {
            transform: translate3d(0, 0, 0) scale(1.02);
          }
          to {
            transform: translate3d(52px, -44px, 0) scale(1);
          }
        }

        @keyframes consultationStarDriftThree {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-38px, -54px, 0);
          }
        }

        @keyframes consultationNebulaOne {
          from {
            transform: translate3d(-2vw, -2vh, 0) scale(0.92);
          }
          to {
            transform: translate3d(5vw, 4vh, 0) scale(1.08);
          }
        }

        @keyframes consultationNebulaTwo {
          from {
            transform: translate3d(3vw, 2vh, 0) scale(0.94);
          }
          to {
            transform: translate3d(-5vw, -4vh, 0) scale(1.1);
          }
        }

        @keyframes consultationPlanetFloat {
          from {
            transform: translate3d(-8px, 6px, 0) rotate(-2deg);
          }
          to {
            transform: translate3d(10px, -8px, 0) rotate(2deg);
          }
        }

        @keyframes consultationOrbitOne {
          from {
            transform: translate(-50%, -50%) rotate(-7deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(353deg);
          }
        }

        @keyframes consultationOrbitTwo {
          from {
            transform: translate(-50%, -50%) rotate(13deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(373deg);
          }
        }

        @keyframes consultationCometOne {
          0%,
          54% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(-28deg);
          }
          58% {
            opacity: 0.9;
          }
          93% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translate3d(78vw, 38vh, 0) rotate(-28deg);
          }
        }

        @keyframes consultationCometTwo {
          0%,
          57% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(208deg);
          }
          61% {
            opacity: 0.82;
          }
          94% {
            opacity: 0.82;
          }
          100% {
            opacity: 0;
            transform: translate3d(-82vw, 35vh, 0) rotate(208deg);
          }
        }

        @keyframes consultationCometThree {
          0%,
          60% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(-28deg);
          }
          64% {
            opacity: 0.84;
          }
          94% {
            opacity: 0.84;
          }
          100% {
            opacity: 0;
            transform: translate3d(82vw, -34vh, 0) rotate(-28deg);
          }
        }

        @keyframes consultationCometFour {
          0%,
          62% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(204deg);
          }
          66% {
            opacity: 0.78;
          }
          95% {
            opacity: 0.78;
          }
          100% {
            opacity: 0;
            transform: translate3d(-78vw, -32vh, 0) rotate(204deg);
          }
        }

        @keyframes consultationStarTwinkle {
          0%,
          100% {
            opacity: 0.28;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @media (max-width: 767px) {
          .consultation-orbit,
          .consultation-comet {
            display: none;
          }

          .consultation-stars span:nth-child(n + 19) {
            display: none;
          }

          .consultation-nebula {
            opacity: 0.13;
            filter: blur(72px);
          }

          .consultation-planet {
            left: -92px;
            bottom: -105px;
            transform: scale(0.78);
          }

          .consultation-premium-shell {
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 0 30px rgba(75, 34, 255, 0.22),
              0 0 48px rgba(255, 47, 125, 0.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .consultation-premium-shell,
          .consultation-premium-shell::before,
          .consultation-modal-card::after,
          .consultation-space-field,
          .consultation-nebula,
          .consultation-planet,
          .consultation-orbit,
          .consultation-comet,
          .consultation-stars span {
            animation: none !important;
          }

          .consultation-premium-shell {
            opacity: 1;
            transform: none;
            transition: none !important;
          }

          .consultation-comet {
            display: none;
          }
        }
      `}</style>
      </div>
    </div>
  );
}