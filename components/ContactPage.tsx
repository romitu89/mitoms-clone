"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

const services = [
  "Website Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "AI & Digital Transformation",
  "IT Consulting",
  "Digital Marketing",
  "Other",
];

const budgets = [
  "Not decided yet",
  "Below ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
];

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Share your requirements with our team.",
    value: "info@mitoms.com",
    href: "mailto:info@mitoms.com",
    iconBg: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Serving clients across India and globally.",
    value: "India",
    href: "",
    iconBg: "from-[#ff315d] to-[#ff72a3]",
  },
  {
    icon: Clock3,
    title: "Response Time",
    description: "We usually respond within one business day.",
    value: "Within 24 Hours",
    href: "",
    iconBg: "from-[#00aef0] to-[#4b22ff]",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Free Initial Consultation",
    description:
      "Discuss your idea and receive practical recommendations from our team.",
  },
  {
    icon: ShieldCheck,
    title: "Your Information Is Safe",
    description:
      "Your project details and business information remain confidential.",
  },
  {
    icon: Zap,
    title: "Quick Response",
    description:
      "Our team will review your requirements and respond within one business day.",
  },
];


function TypewriterOnce({
  text,
  speed = 115,
  delay = 250,
  display = "inline",
  className = "",
  cursorClassName = "bg-current",
}: {
  text: string;
  speed?: number;
  delay?: number;
  display?: "inline" | "block";
  className?: string;
  cursorClassName?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || visibleCharacters >= text.length) {
      return;
    }

    const timeoutId = setTimeout(
      () => {
        setVisibleCharacters((current) =>
          Math.min(current + 1, text.length),
        );
      },
      visibleCharacters === 0 ? delay : speed,
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, hasStarted, speed, text, visibleCharacters]);

  const isTyping =
    hasStarted && visibleCharacters < text.length;

  const layoutClassName =
    display === "block" ? "grid w-fit" : "inline-grid";

  return (
    <span
      ref={elementRef}
      aria-label={text}
      className={`${layoutClassName} whitespace-nowrap`}
    >
      <span
        aria-hidden="true"
        className={`invisible col-start-1 row-start-1 whitespace-nowrap ${className}`}
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 whitespace-nowrap ${className}`}
      >
        {text.slice(0, visibleCharacters)}

        {isTyping && (
          <span
            className={`ml-1 inline-block h-[0.88em] w-[2px] animate-pulse align-[-0.06em] ${cursorClassName}`}
          />
        )}
      </span>
    </span>
  );
}

const frequentlyAskedQuestions = [
  {
    question: "What information should I include in my enquiry?",
    answer:
      "Tell us about your business, project requirements, preferred timeline, expected features and approximate budget. Even if everything is not finalized, our team can help you define the next steps.",
  },
  {
    question: "How quickly will MITOMS respond?",
    answer:
      "Our team generally responds within one business day. More detailed project estimates may require an additional discovery discussion.",
  },
  {
    question: "Can you work with an existing website or application?",
    answer:
      "Yes. We can evaluate, redesign, modernize, optimize or extend an existing website, application or software product.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We support startups, growing companies and established organizations with flexible engagement and development models.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend success state only.
    // Later this can be connected to an API, email service or database.
    setSubmitted(true);
  };

  return (
    <main className="overflow-hidden bg-white text-[#07112f] antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-18 lg:px-10 lg:pb-28 lg:pt-24">
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-[#4b22ff]/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-24 top-[-80px] h-[390px] w-[390px] rounded-full bg-[#ff315d]/10 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[420px] w-[850px] -translate-x-1/2 rounded-full bg-[#693bff]/5 blur-[100px]" />

        {/* Dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.14)_1px,transparent_1px)] [background-size:25px_25px]" />

        <div className="relative mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-[800px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/75 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
              <MessageSquareText size={15} className="text-[#4b22ff]" />

              <TypewriterOnce
                text="Let&apos;s Talk"
                speed={100}
                delay={120}
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]"
                cursorClassName="bg-[#4b22ff]"
              />
            </div>

            <h1 className="mt-6 overflow-visible text-[36px] font-bold leading-[1.09] tracking-[-0.045em] text-[#081232] sm:text-[50px] lg:text-[64px]">
              Have an Idea?
              <span className="mt-2 block overflow-visible px-[0.08em] pb-[0.1em]">
                Let&apos;s Build Something{" "}
                <TypewriterOnce
                  text="Remarkable"
                  speed={120}
                  delay={320}
                  className="overflow-visible pb-[0.06em] pr-[0.16em] tracking-[-0.012em] bg-gradient-to-r from-[#4b22ff] via-[#7439ff] to-[#ff315d] bg-clip-text text-transparent"
                  cursorClassName="bg-[#ff315d]"
                />
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-medium leading-7 text-[#34405f]/70 sm:mt-6 sm:text-[16px] sm:leading-8">
              Tell us about your project, business goals or technology
              challenges. Our team will help you identify the right solution and
              practical next steps.
            </p>
          </div>

          {/* Contact cards */}
          <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
            {contactCards.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="group flex h-full min-w-0 items-center gap-4 rounded-[20px] border border-[#e7e2f5] bg-white/90 p-4 shadow-[0_14px_40px_rgba(38,27,104,0.07)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(75,34,255,0.12)] sm:gap-5 sm:rounded-[22px] sm:p-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${item.iconBg} text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                  >
                    <Icon size={25} strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#4b22ff] sm:text-[11px] sm:tracking-[0.18em]">
                      <TypewriterOnce
                        text={item.title}
                        speed={85}
                        delay={120}
                        cursorClassName="bg-[#4b22ff]"
                      />
                    </p>

                    <p className="mt-1 text-[12px] font-medium leading-5 text-[#52607a]/60">
                      {item.description}
                    </p>

                    <p className="mt-2 break-words text-[13px] font-bold leading-5 text-[#081232] sm:text-[14px]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a key={item.title} href={item.href}>
                    {content}
                  </a>
                );
              }

              return <div key={item.title}>{content}</div>;
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section
        id="contact-form"
        className="relative scroll-mt-24 px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24"
      >
        <div className="pointer-events-none absolute left-[-150px] top-[20%] h-[350px] w-[350px] rounded-full bg-[#4b22ff]/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[24px] border border-[#e4dff3] bg-white shadow-[0_30px_90px_rgba(19,14,65,0.12)] sm:rounded-[30px] lg:grid-cols-[0.86fr_1.14fr]">
          {/* LEFT INFORMATION */}
          <div className="relative overflow-hidden bg-[linear-gradient(145deg,#06112f_0%,#18104f_45%,#5c175c_78%,#ff315d_145%)] p-5 text-white sm:p-8 lg:min-h-[760px] lg:p-12">
            <div className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#1685ff]/25 blur-[95px]" />

            <div className="pointer-events-none absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:23px_23px]" />

            {/* Decorative curves */}
            <svg
              className="pointer-events-none absolute bottom-0 left-0 h-[230px] w-full opacity-55"
              viewBox="0 0 600 230"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="contactCurve"
                  x1="0"
                  y1="0"
                  x2="600"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#24baff" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="#7a4cff" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#ff3b95" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <path
                d="M-30 190C80 90 170 235 285 145C385 68 470 195 640 62"
                stroke="url(#contactCurve)"
                strokeWidth="2"
              />

              <path
                d="M-20 220C100 125 190 260 310 175C420 96 505 220 640 108"
                stroke="#ffffff"
                strokeOpacity="0.13"
                strokeWidth="1"
                strokeDasharray="5 8"
              />
            </svg>

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff80bb]">
                <TypewriterOnce
                  text="Start a Conversation"
                  speed={90}
                  delay={120}
                  cursorClassName="bg-[#ff80bb]"
                />
              </p>

              <h2 className="mt-4 max-w-[440px] text-[31px] font-bold leading-[1.14] tracking-[-0.04em] sm:mt-5 sm:text-[42px] lg:text-[44px]">
                Your Next Digital
                <TypewriterOnce
                  text="Success Story"
                  display="block"
                  speed={120}
                  delay={260}
                  className="mt-1 pb-[0.08em] font-serif text-[40px] font-medium italic leading-[1.05] text-[#ff88bd] sm:text-[51px] lg:text-[55px]"
                  cursorClassName="bg-[#ff88bd]"
                />
                Starts Here
              </h2>

              <p className="mt-5 max-w-[430px] text-[13px] font-medium leading-7 text-white/68 sm:mt-6 sm:text-[14px]">
                Whether you need a new website, mobile application, cloud
                solution or expert technology guidance, our team is ready to
                help.
              </p>

              <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-[18px] border border-white/12 bg-white/[0.07] p-3.5 backdrop-blur sm:gap-4 sm:rounded-[20px] sm:p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#ff8dc1]">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="text-[14px] font-bold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[12px] font-medium leading-5 text-white/58">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                  Prefer Email?
                </p>

                <a
                  href="mailto:info@mitoms.com"
                  className="group mt-3 inline-flex max-w-full items-center gap-3 break-all text-[15px] font-bold text-white transition-colors hover:text-[#ff8dc1] sm:text-[17px]"
                >
                  <Mail size={19} />
                  info@mitoms.com
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative min-w-0 bg-[#fbfaff] p-5 sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4b22ff]/8 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-24 left-[-70px] h-64 w-64 rounded-full bg-[#ff315d]/8 blur-[90px]" />

            {!submitted ? (
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.27em] text-[#4b22ff]">
                  <TypewriterOnce
                    text="Project Enquiry"
                    speed={90}
                    delay={120}
                    cursorClassName="bg-[#4b22ff]"
                  />
                </p>

                <h2 className="mt-3 text-[27px] font-bold leading-[1.15] tracking-[-0.035em] text-[#081232] sm:text-[34px] lg:text-[36px]">
                  Tell Us About Your Project
                </h2>

                <p className="mt-3 max-w-[560px] text-[13px] font-medium leading-7 text-[#34405f]/65">
                  Complete the form below and provide as much information as
                  possible. Our team will review your enquiry and contact you.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4 sm:mt-8">
                  {/* Name and email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="group block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Full Name <span className="text-[#ff315d]">*</span>
                      </span>

                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98] transition-colors group-focus-within:text-[#4b22ff]"
                        />

                        <input
                          required
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Enter your name"
                          className="h-[52px] w-full rounded-[14px] border border-[#e1ddec] bg-white pl-11 pr-3 text-[12px] font-semibold text-[#081232] outline-none transition-all placeholder:font-medium placeholder:text-[#71809f]/50 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)] sm:h-14 sm:rounded-[15px] sm:pl-12 sm:pr-4 sm:text-[13px]"
                        />
                      </div>
                    </label>

                    <label className="group block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Email Address <span className="text-[#ff315d]">*</span>
                      </span>

                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98] transition-colors group-focus-within:text-[#4b22ff]"
                        />

                        <input
                          required
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="name@company.com"
                          className="h-14 w-full rounded-[15px] border border-[#e1ddec] bg-white pl-12 pr-4 text-[13px] font-semibold text-[#081232] outline-none transition-all placeholder:font-medium placeholder:text-[#71809f]/50 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Phone and company */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="group block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Phone Number
                      </span>

                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98] transition-colors group-focus-within:text-[#4b22ff]"
                        />

                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="+91 00000 00000"
                          className="h-14 w-full rounded-[15px] border border-[#e1ddec] bg-white pl-12 pr-4 text-[13px] font-semibold text-[#081232] outline-none transition-all placeholder:font-medium placeholder:text-[#71809f]/50 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        />
                      </div>
                    </label>

                    <label className="group block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Company Name
                      </span>

                      <div className="relative">
                        <Building2
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98] transition-colors group-focus-within:text-[#4b22ff]"
                        />

                        <input
                          type="text"
                          name="company"
                          autoComplete="organization"
                          placeholder="Your company"
                          className="h-14 w-full rounded-[15px] border border-[#e1ddec] bg-white pl-12 pr-4 text-[13px] font-semibold text-[#081232] outline-none transition-all placeholder:font-medium placeholder:text-[#71809f]/50 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Service and budget */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Service Required{" "}
                        <span className="text-[#ff315d]">*</span>
                      </span>

                      <div className="relative">
                        <BriefcaseBusiness
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98]"
                        />

                        <select
                          required
                          name="service"
                          defaultValue=""
                          className="h-[52px] w-full appearance-none rounded-[14px] border border-[#e1ddec] bg-white pl-11 pr-10 text-[12px] font-semibold text-[#34405f] outline-none transition-all focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)] sm:h-14 sm:rounded-[15px] sm:pl-12 sm:pr-11 sm:text-[13px]"
                        >
                          <option value="" disabled>
                            Select service
                          </option>

                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#786f98]"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                        Estimated Budget
                      </span>

                      <div className="relative">
                        <Code2
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#786f98]"
                        />

                        <select
                          name="budget"
                          defaultValue=""
                          className="h-14 w-full appearance-none rounded-[15px] border border-[#e1ddec] bg-white pl-12 pr-11 text-[13px] font-semibold text-[#34405f] outline-none transition-all focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)]"
                        >
                          <option value="" disabled>
                            Select budget
                          </option>

                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#786f98]"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Message */}
                  <label className="group block">
                    <span className="mb-2 block text-[12px] font-bold text-[#202b48]">
                      Project Details <span className="text-[#ff315d]">*</span>
                    </span>

                    <div className="relative">
                      <MessageSquareText
                        size={18}
                        className="absolute left-4 top-5 text-[#786f98] transition-colors group-focus-within:text-[#4b22ff]"
                      />

                      <textarea
                        required
                        name="message"
                        rows={6}
                        placeholder="Tell us about your project, goals, required features and expected timeline..."
                        className="w-full resize-none rounded-[14px] border border-[#e1ddec] bg-white py-3.5 pl-11 pr-3 text-[12px] font-semibold leading-6 text-[#081232] outline-none transition-all placeholder:font-medium placeholder:text-[#71809f]/50 focus:border-[#6d45ff] focus:shadow-[0_0_0_4px_rgba(75,34,255,0.08)] sm:rounded-[15px] sm:py-4 sm:pl-12 sm:pr-4 sm:text-[13px]"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="group flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-gradient-to-r from-[#4b22ff] via-[#7138ff] to-[#ff315d] px-5 text-[12px] font-bold text-white shadow-[0_15px_32px_rgba(75,34,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(255,49,93,0.25)] sm:h-14 sm:rounded-[15px] sm:px-6 sm:text-[13px]"
                  >
                    Send Project Enquiry

                    <Send
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <div className="flex flex-col items-start gap-2 pt-1 text-[10px] font-bold text-[#4a5671]/55 min-[430px]:flex-row min-[430px]:flex-wrap min-[430px]:items-center min-[430px]:justify-center min-[430px]:gap-x-6">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#4b22ff]" />
                      Free Consultation
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#4b22ff]" />
                      No Spam
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#4b22ff]" />
                      Confidential
                    </span>
                  </div>
                </form>
              </div>
            ) : (
              /* SUCCESS MESSAGE */
              <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-1 text-center sm:min-h-[650px]">
                <div className="relative">
                  <div className="absolute inset-[-25px] rounded-full bg-[#4b22ff]/10 blur-2xl" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_22px_50px_rgba(75,34,255,0.30)]">
                    <Check size={45} strokeWidth={2.5} />
                  </div>
                </div>

                <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                  <TypewriterOnce
                    text="Enquiry Received"
                    speed={90}
                    delay={120}
                    cursorClassName="bg-[#4b22ff]"
                  />
                </p>

                <h2 className="mt-3 text-[32px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[38px]">
                  Thank You!
                </h2>

                <p className="mt-4 max-w-[480px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                  Your project enquiry has been received. Our team will review
                  the details and contact you within one business day.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
                >
                  Send Another Message
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUICK HELP */}
      <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
              <TypewriterOnce
                text="How Can We Help?"
                speed={90}
                delay={120}
                cursorClassName="bg-[#ff315d]"
              />
            </p>

            <h2 className="mt-4 text-[32px] font-bold tracking-[-0.035em] text-[#081232] sm:text-[42px]">
              Start With the Option That{" "}
              <TypewriterOnce
                text="Works for You"
                speed={115}
                delay={250}
                className="text-[#4b22ff]"
                cursorClassName="bg-[#4b22ff]"
              />
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
            {[
              {
                icon: MessageSquareText,
                title: "Discuss a New Project",
                description:
                  "Share your idea and let us help you plan the right digital solution.",
                action: "Start a Project",
                href: "#contact-form",
                gradient: "from-[#4b22ff] to-[#7a5cff]",
              },
              {
                icon: Headphones,
                title: "Get Technical Support",
                description:
                  "Need assistance with an existing product, website or application?",
                action: "Contact Support",
                href: "mailto:info@mitoms.com?subject=Technical Support",
                gradient: "from-[#00aeef] to-[#4b22ff]",
              },
              {
                icon: BriefcaseBusiness,
                title: "Business Partnership",
                description:
                  "Explore development partnerships, outsourcing and collaboration opportunities.",
                action: "Partner With Us",
                href: "mailto:info@mitoms.com?subject=Business Partnership",
                gradient: "from-[#ff315d] to-[#8b3dff]",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-[21px] border border-[#e4dff2] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#4b22ff]/5 blur-3xl transition-all duration-500 group-hover:bg-[#ff315d]/8" />

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${item.gradient} text-white shadow-[0_12px_25px_rgba(75,34,255,0.20)]`}
                  >
                    <Icon size={25} />
                  </div>

                  <h3 className="relative mt-6 text-[19px] font-bold text-[#081232]">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 text-[13px] font-medium leading-7 text-[#34405f]/62">
                    {item.description}
                  </p>

                  <span className="relative mt-6 inline-flex items-center gap-2 text-[12px] font-bold text-[#4b22ff]">
                    {item.action}

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
              <TypewriterOnce
                text="Common Questions"
                speed={90}
                delay={120}
                cursorClassName="bg-[#4b22ff]"
              />
            </p>

            <h2 className="mt-4 text-[32px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px]">
              Before You
              <TypewriterOnce
                text="Contact Us"
                display="block"
                speed={115}
                delay={220}
                className="text-[#ff315d]"
                cursorClassName="bg-[#ff315d]"
              />
            </h2>

            <p className="mt-5 max-w-[400px] text-[13px] font-medium leading-7 text-[#34405f]/65">
              Here are answers to some common questions about project enquiries
              and working with MITOMS.
            </p>

            <a
              href="mailto:info@mitoms.com"
              className="group mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-[13px] border border-[#dcd6ef] bg-white px-6 text-[12px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
            >
              Ask Another Question
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="space-y-4">
            {frequentlyAskedQuestions.map((item, index) => (
              <details
                key={item.question}
                className="group rounded-[18px] border border-[#e4dff1] bg-white p-4 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] open:shadow-[0_16px_38px_rgba(75,34,255,0.08)] sm:rounded-[20px] sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 sm:gap-5">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="min-w-0 text-[13px] font-bold leading-5 text-[#081232] sm:text-[15px]">
                      {item.question}
                    </h3>
                  </div>

                  <ChevronDown
                    size={19}
                    className="shrink-0 text-[#4b22ff] transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>

                <p className="ml-0 mt-4 border-t border-[#ebe7f4] pt-4 text-[13px] font-medium leading-7 text-[#34405f]/65 sm:ml-[52px]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-8 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[26px] sm:px-8 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff84b8]">
                <TypewriterOnce
                  text="Ready to Get Started?"
                  speed={90}
                  delay={120}
                  cursorClassName="bg-[#ff84b8]"
                />
              </p>

              <h2 className="mt-3 max-w-[650px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                Let&apos;s Turn Your Idea Into a Powerful Digital Solution
              </h2>

              <p className="mt-3 max-w-[620px] text-[13px] font-medium leading-7 text-white/65">
                Start a conversation with our team and receive a practical plan
                for your project.
              </p>
            </div>

            <a
              href="mailto:info@mitoms.com?subject=Project Enquiry"
              className="group inline-flex min-h-[50px] w-full shrink-0 items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
            >
              Contact Our Team

              <ArrowRight
                size={18}
                className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}