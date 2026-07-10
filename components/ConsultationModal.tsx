"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
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

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => setSubmitted(false), 250);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#04081d]/75 px-4 py-8 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[980px] overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-[0_35px_100px_rgba(4,8,29,0.45)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close consultation form"
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#07112f]/75 text-white backdrop-blur transition hover:rotate-90 hover:bg-[#ff2f7d]"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
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
          <div className="relative min-h-[650px] bg-[#fbfaff] p-6 sm:p-9 lg:p-11">
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

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="group relative block">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#776d96] transition group-focus-within:text-[#4b22ff]"
                      />
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="h-14 w-full rounded-[16px] border border-[#e2def1] bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                      />
                    </label>

                    <label className="group relative block">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#776d96] transition group-focus-within:text-[#4b22ff]"
                      />
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        className="h-14 w-full rounded-[16px] border border-[#e2def1] bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                      />
                    </label>
                  </div>

                  <label className="group relative block">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#776d96] transition group-focus-within:text-[#4b22ff]"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Business email"
                      className="h-14 w-full rounded-[16px] border border-[#e2def1] bg-white pl-12 pr-4 text-sm font-semibold text-[#081232] outline-none transition placeholder:text-[#71809f]/55 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                    />
                  </label>

                  <label className="block">
                    <select
                      required
                      name="service"
                      defaultValue=""
                      className="h-14 w-full appearance-none rounded-[16px] border border-[#e2def1] bg-white px-4 text-sm font-semibold text-[#34405f] outline-none transition focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
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
                  </label>

                  <label className="group relative block">
                    <MessageSquareText
                      size={18}
                      className="absolute left-4 top-5 text-[#776d96] transition group-focus-within:text-[#4b22ff]"
                    />
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us briefly about your project, goals and timeline..."
                      className="w-full resize-none rounded-[16px] border border-[#e2def1] bg-white py-4 pl-12 pr-4 text-sm font-semibold leading-6 text-[#081232] outline-none transition placeholder:text-[#71809f]/55 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-[#4b22ff] via-[#7038ff] to-[#ff315d] text-sm font-black text-white shadow-[0_14px_30px_rgba(75,34,255,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]"
                  >
                    Schedule Free Consultation
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
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
                  Your consultation request has been submitted. Our team will
                  contact you within 24 hours.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-[14px] bg-[#081232] px-7 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#4b22ff]"
                >
                  Back to Website
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
