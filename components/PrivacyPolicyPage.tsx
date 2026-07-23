"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  Clock3,
  Cookie,
  Database,
  Eye,
  FileText,
  Globe2,
  Link2,
  LockKeyhole,
  Mail,
  RefreshCcw,
  Settings2,
  Share2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { useBidirectionalScrollReveal } from "./useBidirectionalScrollReveal";

const policyDetails = {
  legalName: "MITOMS TECHNOLOGIES PRIVATE LIMITED",
  brandName: "MITOMS",
  cin: "U62012UP2023PTC192943",
  registeredLocation:
    "Shalimar Garden Extension, Sahibabad, Ghaziabad, Uttar Pradesh, India - 201005",
  contactEmail: "sales@mitoms.com",
  lastUpdated: "23 July 2026",
};

type SummaryCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

type PolicySection = {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

const summaryCards: SummaryCard[] = [
  {
    icon: Database,
    title: "Data We Collect",
    description:
      "Information you submit, technical usage information and necessary communication records.",
    gradient: "from-[#4B22FF] to-[#7B5CFF]",
  },
  {
    icon: Settings2,
    title: "How We Use It",
    description:
      "To respond to enquiries, deliver services, improve our website and protect our systems.",
    gradient: "from-[#FF2F7D] to-[#FF7CA8]",
  },
  {
    icon: ShieldCheck,
    title: "How We Protect It",
    description:
      "We use reasonable organisational and technical safeguards appropriate to the information.",
    gradient: "from-[#00B8FF] to-[#4B22FF]",
  },
  {
    icon: UserCheck,
    title: "Your Choices",
    description:
      "You may request access, correction, deletion or other available privacy choices.",
    gradient: "from-[#743CFF] to-[#FF2F7D]",
  },
];

const sections: PolicySection[] = [
  {
    id: "information-we-collect",
    number: "01",
    title: "Information We Collect",
    icon: Database,
    paragraphs: [
      "We collect information that you choose to provide when you contact us, request a consultation, submit a project enquiry or otherwise communicate with MITOMS.",
      "We also receive limited technical and usage information when you visit our website so that we can operate the site, understand performance and protect our systems.",
    ],
    bullets: [
      "Name, email address, phone number and company details",
      "Selected service, estimated budget and optional project description",
      "Messages, attachments and communication history you choose to provide",
      "IP address, browser, device, operating system and approximate location",
      "Pages visited, referral source, timestamps and website interaction information",
      "Cookie and analytics identifiers, where enabled and permitted",
    ],
    note:
      "Please do not submit passwords, payment-card information, government identification numbers, health records or other highly sensitive information through a general website form.",
  },
  {
    id: "how-we-use-information",
    number: "02",
    title: "How We Use Information",
    icon: Settings2,
    paragraphs: [
      "We use personal information for business purposes connected with our website, enquiries, proposals, services, client relationships and legal responsibilities, as permitted by applicable law.",
    ],
    bullets: [
      "Responding to enquiries and consultation requests",
      "Preparing proposals, estimates and project recommendations",
      "Sending acknowledgement or confirmation emails after a form submission",
      "Delivering, managing and supporting agreed services",
      "Managing client communication, invoices and business records",
      "Improving website performance, usability and content",
      "Detecting spam, misuse, fraud, technical problems or security threats",
      "Meeting contractual, accounting, tax, regulatory and legal obligations",
    ],
  },
  {
    id: "cookies",
    number: "03",
    title: "Cookies and Google Analytics",
    icon: Cookie,
    paragraphs: [
      "Our website may use essential cookies and similar technologies required for normal functionality, security and user preferences.",
      "We use Google Analytics to understand general website traffic and interactions. Google Analytics may collect pseudonymous usage information through cookies or similar technologies, such as pages visited, device and browser details, approximate location and referral information.",
      "We do not intentionally send names, email addresses, phone numbers or other directly identifying form information to Google Analytics. Where consent is required, optional analytics should only operate after an appropriate choice has been made.",
    ],
    bullets: [
      "Essential technologies needed for website operation and security",
      "Preference technologies that remember selected settings, where used",
      "Google Analytics technologies used to measure website usage",
      "Browser or device controls that may allow cookies to be blocked or deleted",
    ],
    note:
      "Blocking some technologies may affect limited website functionality. Analytics preferences may also be managed through any cookie controls made available on the website.",
  },
  {
    id: "sharing-information",
    number: "04",
    title: "When We Share Information",
    icon: Share2,
    paragraphs: [
      "We do not sell personal information. We share information only where reasonably necessary to operate our business, respond to you, deliver services, maintain security or comply with law.",
    ],
    bullets: [
      "Hostinger and related hosting or infrastructure providers",
      "Email systems used to deliver website enquiries and confirmations",
      "Google Analytics and supporting measurement services",
      "Professional advisers such as legal, accounting or security specialists",
      "Project partners or contractors working under appropriate obligations",
      "Authorities or other parties where disclosure is legally required",
      "A successor organisation in connection with a merger, acquisition or business transfer",
    ],
    note:
      "Our consultation forms are submitted to a PHP-based endpoint hosted with our website provider and are delivered to authorised MITOMS email recipients.",
  },
  {
    id: "data-security",
    number: "05",
    title: "Data Security",
    icon: LockKeyhole,
    paragraphs: [
      "We use reasonable technical and organisational measures designed to protect personal information against unauthorised access, misuse, alteration, loss or disclosure.",
      "No method of internet transmission or electronic storage is completely secure, so absolute security cannot be guaranteed.",
    ],
    bullets: [
      "Encrypted website connections where available",
      "Access controls and limited account permissions",
      "Input validation, spam controls and request-rate protections on forms",
      "System monitoring, maintenance and software updates",
      "Confidentiality expectations for employees and service providers",
      "Data minimisation and retention controls where practical",
    ],
  },
  {
    id: "data-retention",
    number: "06",
    title: "How Long We Keep Information",
    icon: Clock3,
    paragraphs: [
      "We keep personal information only for as long as reasonably necessary for the purpose for which it was collected and for relevant business, contractual, security, accounting, tax and legal requirements.",
      "Enquiry and project records may be retained while we respond, prepare a proposal, manage a client relationship or maintain required business records. Analytics information is retained according to the settings applied in the relevant analytics account.",
      "When information is no longer reasonably required, we may delete, anonymise or securely archive it, subject to applicable obligations and technical limitations.",
    ],
  },
  {
    id: "your-rights",
    number: "07",
    title: "Your Privacy Rights and Choices",
    icon: UserCheck,
    paragraphs: [
      "Depending on your location and the law that applies, you may have rights relating to the personal information we hold about you.",
    ],
    bullets: [
      "Request information about personal data we process",
      "Request correction of inaccurate or incomplete information",
      "Request deletion or erasure where legally available",
      "Withdraw consent where processing depends on consent",
      "Raise a concern or request grievance redressal",
      "Nominate another person to exercise available rights where applicable",
      "Complain to an appropriate data-protection authority where available",
    ],
    note:
      "We may need to verify your identity and request before taking action. Some requests may be limited by legal, contractual, security or record-keeping obligations.",
  },
  {
    id: "international-transfers",
    number: "08",
    title: "International Data Processing",
    icon: Globe2,
    paragraphs: [
      "Some hosting, analytics, email, cloud or technical service providers may operate systems in more than one country. Information may therefore be processed outside the country where it was originally collected.",
      "Where required, we use service-provider terms, contractual protections and reasonable organisational or technical measures for such processing, subject to applicable law.",
    ],
  },
  {
    id: "third-party-links",
    number: "09",
    title: "Third-Party Links and Services",
    icon: Link2,
    paragraphs: [
      "Our website may contain links to third-party websites, social networks, platforms or services. Their privacy practices and content are controlled by those third parties and not by MITOMS.",
      "We encourage you to review the privacy information of any external service before providing personal information or using its features.",
    ],
  },
  {
    id: "children",
    number: "10",
    title: "Children's Privacy",
    icon: Baby,
    paragraphs: [
      "Our website and services are intended for businesses and professional audiences and are not intentionally directed to persons under 18 years of age.",
      "We do not knowingly collect personal information from children through this website. Please contact us if you believe a child has provided information so that we can review and take appropriate action.",
    ],
  },
  {
    id: "policy-updates",
    number: "11",
    title: "Updates to This Privacy Policy",
    icon: RefreshCcw,
    paragraphs: [
      "We may update this Privacy Policy when our website, services, technology providers, legal obligations or data practices change.",
      "The latest version will be posted on this page with an updated revision date. Material changes may also be communicated through an additional notice where appropriate.",
    ],
  },
  {
    id: "contact-us",
    number: "12",
    title: "Company and Privacy Contact",
    icon: Mail,
    paragraphs: [
      "MITOMS TECHNOLOGIES PRIVATE LIMITED is responsible for the website and the personal information described in this policy.",
      "For privacy questions, corrections, deletion requests or grievances, contact us using the email address below or through our website contact page.",
      "Registered location: Shalimar Garden Extension, Sahibabad, Ghaziabad, Uttar Pradesh, India - 201005.",
    ],
    bullets: [
      "CIN: U62012UP2023PTC192943",
      "Privacy and business email: sales@mitoms.com",
      "Website: https://mitoms.com/",
    ],
    note:
      "Use the subject line 'Privacy Request' and include enough information for us to identify and respond to your request. Do not send passwords or highly sensitive documents by email unless specifically requested through a secure method.",
  },
];


function TypewriterText({
  text,
  speed = 95,
  delay = 120,
  display = "inline",
  nowrap = false,
  className = "",
  cursorClassName = "bg-current",
}: {
  text: string;
  speed?: number;
  delay?: number;
  display?: "inline" | "block";
  nowrap?: boolean;
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
        if (!entry.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      {
        threshold: 0.18,
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timeoutId = window.setTimeout(
      () => {
        setVisibleCharacters((current) => {
          if (reducedMotion) {
            return text.length;
          }

          return Math.min(current + 1, text.length);
        });
      },
      visibleCharacters === 0 ? delay : speed,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delay, hasStarted, speed, text, visibleCharacters]);

  const isTyping = hasStarted && visibleCharacters < text.length;
  const layoutClassName =
    display === "block"
      ? "grid w-fit max-w-full"
      : "inline-grid max-w-full";
  const whitespaceClassName = nowrap
    ? "whitespace-nowrap"
    : "whitespace-normal";

  return (
    <span
      ref={elementRef}
      aria-label={text}
      className={`${layoutClassName} ${whitespaceClassName}`}
    >
      <span
        aria-hidden="true"
        className={`invisible col-start-1 row-start-1 ${whitespaceClassName} ${className}`}
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 ${whitespaceClassName} ${className}`}
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

function PrivacySummaryCard({
  icon: Icon,
  title,
  description,
  gradient,
}: SummaryCard) {
  return (
    <article className="group rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#cec4ff] hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]">
      <div
        className={`flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-gradient-to-br ${gradient} text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
      >
        <Icon size={24} />
      </div>

      <h2 className="mt-5 text-[18px] font-bold text-[#081232]">
        {title}
      </h2>

      <p className="mt-3 text-[15px] font-medium leading-7 text-[#27314f]/86">
        {description}
      </p>
    </article>
  );
}

export default function PrivacyPolicyPage() {
  const pageRef = useBidirectionalScrollReveal<HTMLElement>();
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <>
      <main ref={pageRef} className="overflow-hidden bg-white font-sans text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-20 pt-10 sm:px-6 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11">
          <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#4b22ff]/10 blur-[135px] motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#ff2f7d]/10 blur-[135px] motion-safe:animate-[pulse_7s_ease-in-out_infinite] motion-safe:[animation-delay:1s]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <ShieldCheck size={15} className="text-[#4b22ff]" />
                <TypewriterText
                  text="Privacy Policy"
                  speed={82}
                  delay={100}
                  nowrap
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-7 max-w-[730px] overflow-visible text-[34px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:text-[46px] lg:text-[50px]">
                Your Privacy,
                <span className="mt-2 flex overflow-visible pb-[0.22em] leading-[1.14]">
                  <TypewriterText
                    text="Explained Clearly"
                    speed={110}
                    delay={260}
                    nowrap
                    className="overflow-visible pb-[0.14em] pr-[0.12em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-7 max-w-[640px] text-[16px] font-medium leading-8 text-[#27314f]/90 sm:text-[17px]">
                This policy explains what {policyDetails.brandName} may collect, why we use it,
                when it may be shared and the choices
                available to you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e3def1] bg-white px-4 py-3 text-[12px] font-bold text-[#27314f]/82 shadow-[0_8px_22px_rgba(22,17,62,0.05)]">
                  <FileText size={15} className="text-[#4b22ff]" />
                  Last updated: {policyDetails.lastUpdated}
                </span>

                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#e3def1] bg-white px-4 py-3 text-[12px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                >
                  Privacy question
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative min-h-[500px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cec4ff]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.16),transparent_68%)]" />

              <div className="absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-white/70 bg-white p-4 shadow-[0_35px_80px_rgba(38,25,104,0.20)]">
                <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#061330_0%,#1d1059_52%,#8a1c78_115%)] p-8 text-white">
                  <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#00b8ff]/25 blur-[90px]" />
                  <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="relative z-10 flex min-h-[296px] flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff7ca8]">
                        <TypewriterText
                          text="Privacy by Design"
                          speed={82}
                          delay={120}
                          cursorClassName="bg-[#ff7ca8]"
                        />
                      </p>

                      <h2 className="mt-4 max-w-[410px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] sm:text-[38px]">
                        Clear Information.
                        <span className="block text-[#ff7ca8]">
                          Responsible Handling.
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Eye, label: "Transparent" },
                        { icon: LockKeyhole, label: "Protected" },
                        { icon: UserCheck, label: "User Control" },
                      ].map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="rounded-[15px] border border-white/10 bg-white/[0.08] p-3 text-center backdrop-blur"
                          >
                            <Icon size={18} className="mx-auto text-[#ff7ca8]" />
                            <p className="mt-2 text-[10px] font-bold text-white/75">
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[0%] top-[6%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="bg-gradient-to-r from-[#4b22ff] to-[#ff2f7d] bg-clip-text text-[11px] font-bold uppercase tracking-[0.16em] text-transparent">
                  Our Commitment
                </p>
                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Respect Your Data
                </p>
              </div>

              <div className="absolute bottom-[6%] right-[0%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4b22ff]">
                  Your Choice
                </p>
                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Access and Control
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section data-bidirectional-reveal className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff2f7d]">
                <TypewriterText
                  text="Privacy at a Glance"
                  speed={84}
                  delay={100}
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 overflow-visible text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                <span className="block">The Important Points,</span>

                <span className="mt-1 flex justify-center overflow-visible pb-[0.1em]">
                  <TypewriterText
                    text="Without the Complexity"
                    speed={105}
                    delay={220}
                    className="overflow-visible pb-[0.06em] pr-[0.08em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {summaryCards.map((item) => (
                <PrivacySummaryCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* POLICY CONTENT */}
        <section data-bidirectional-reveal className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[300px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[24px] border border-[#e3deef] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f0ecff] text-[#4b22ff]">
                    <FileText size={21} />
                  </div>
                  <div>
                    <p className="bg-gradient-to-r from-[#4b22ff] to-[#ff2f7d] bg-clip-text text-[11px] font-bold uppercase tracking-[0.16em] text-transparent">
                      On This Page
                    </p>
                    <h2 className="mt-1 text-[16px] font-bold text-[#081232]">
                      Policy Sections
                    </h2>
                  </div>
                </div>

                <nav className="mt-5 max-h-[520px] space-y-1 overflow-y-auto pr-1">
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[13px] font-semibold text-[#27314f]/82 transition-all duration-300 hover:bg-[#f3efff] hover:text-[#4b22ff]"
                    >
                      <span className="w-6 shrink-0 text-[9px] font-black text-[#c0b8dc] transition-colors group-hover:text-[#ff2f7d]">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-5">
              <div className="rounded-[24px] border border-[#ded7f3] bg-[linear-gradient(105deg,#f8f5ff,#fff7fb)] p-6 shadow-[0_12px_32px_rgba(75,34,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f0ecff] text-[#4b22ff]">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h2 className="text-[16px] font-bold text-[#081232]">
                      Privacy Contact and Company Details
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-[#27314f]/86">
                      {policyDetails.legalName} · CIN {policyDetails.cin}
                      <br />
                      {policyDetails.registeredLocation}
                      <br />
                      Privacy enquiries: {policyDetails.contactEmail}
                    </p>
                  </div>
                </div>
              </div>

              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 rounded-[25px] border border-[#e3deef] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[17px] bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)]">
                          <Icon size={23} />
                        </div>
                        <div>
                          <p className="bg-gradient-to-r from-[#4b22ff] to-[#ff2f7d] bg-clip-text text-[11px] font-bold uppercase tracking-[0.16em] text-transparent">
                            Section {section.number}
                          </p>
                          <h2 className="mt-2 text-[23px] font-bold tracking-[-0.03em] text-[#081232] sm:text-[27px]">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <span className="hidden text-[28px] font-black text-[#eeeaff] sm:block">
                        {section.number}
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[15px] font-medium leading-7 text-[#27314f]/88"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets && (
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-3 rounded-[14px] bg-[#f8f6ff] px-4 py-3.5"
                          >
                            <CheckCircle2
                              size={17}
                              className="mt-0.5 shrink-0 text-[#4b22ff]"
                            />
                            <p className="text-[13px] font-semibold leading-6 text-[#27314f]/86">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <div className="mt-6 rounded-[15px] border border-[#eadff0] bg-[#fff9fb] px-4 py-4">
                        <p className="text-[13px] font-semibold leading-6 text-[#6b4160]">
                          <strong className="text-[#ff2f7d]">Important:</strong>{" "}
                          {section.note}
                        </p>
                      </div>
                    )}

                    {section.id === "contact-us" && (
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <a
                          href={`mailto:${policyDetails.contactEmail}`}
                          className="group flex items-center justify-between rounded-[17px] border border-[#e3deef] bg-[#fbfaff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff]"
                        >
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff2f7d]">
                              Privacy Email
                            </p>
                            <p className="mt-2 break-all text-[13px] font-bold text-[#081232] group-hover:text-[#4b22ff]">
                              {policyDetails.contactEmail}
                            </p>
                          </div>
                          <Mail size={20} className="text-[#4b22ff]" />
                        </a>

                        <Link
                          href="/contact/"
                          className="group flex items-center justify-between rounded-[17px] border border-[#e3deef] bg-[#fbfaff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff]"
                        >
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff2f7d]">
                              Contact Page
                            </p>
                            <p className="mt-2 text-[13px] font-bold text-[#081232] group-hover:text-[#4b22ff]">
                              Send us a message
                            </p>
                          </div>
                          <ArrowRight
                            size={20}
                            className="text-[#4b22ff] transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section data-bidirectional-reveal className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-7 py-12 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:px-10 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#00b8ff]/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff7ca8]">
                  <TypewriterText
                    text="Need More Information?"
                    speed={82}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[730px] overflow-visible text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[39px] lg:text-[42px]">
                  <span className="block">Have a Question About Privacy</span>

                  <span className="mt-1 block overflow-visible pb-[0.08em]">
                    <TypewriterText
                      text="or How We Handle Information?"
                      speed={98}
                      delay={220}
                      className="overflow-visible pb-[0.04em] pr-[0.08em] text-[#ff7ca8]"
                      cursorClassName="bg-[#ff7ca8]"
                    />
                  </span>
                </h2>
                <p className="mt-3 max-w-[670px] text-[15px] font-medium leading-7 text-white/84">
                  Send us your question and our team will respond through the
                  most appropriate contact channel.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact/"
                  className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1"
                >
                  Contact Us
                  <ArrowRight
                    size={18}
                    className="text-[#ff2f7d] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] border border-white/20 bg-white/[0.06] px-7 py-4 text-[13px] font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]"
                >
                  Talk to Our Team
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </>
  );
}