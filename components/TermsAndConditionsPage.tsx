"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Copyright,
  FileCheck2,
  FileText,
  Globe2,
  Handshake,
  Landmark,
  Link2,
  LockKeyhole,
  Mail,
  RefreshCcw,
  Scale,
  ScrollText,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { useBidirectionalScrollReveal } from "./useBidirectionalScrollReveal";

const termsDetails = {
  companyName: "MITOMS Technologies",
  contactEmail: "legal@mitoms.com",
  lastUpdated: "12 July 2026",
};

type SummaryCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

type TermsSection = {
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
    icon: FileCheck2,
    title: "Using Our Website",
    description:
      "These terms explain the rules that apply when you browse our website or contact our team.",
    gradient: "from-[#4B22FF] to-[#7B5CFF]",
  },
  {
    icon: Handshake,
    title: "Working With Us",
    description:
      "Project scope, pricing and delivery commitments are confirmed in separate written agreements.",
    gradient: "from-[#FF2F7D] to-[#FF7CA8]",
  },
  {
    icon: Copyright,
    title: "Content and Ownership",
    description:
      "Website content belongs to its lawful owner, while project ownership follows the signed agreement.",
    gradient: "from-[#00B8FF] to-[#4B22FF]",
  },
  {
    icon: Scale,
    title: "Rights and Responsibilities",
    description:
      "The terms outline acceptable use, limitations, dispute handling and available remedies.",
    gradient: "from-[#743CFF] to-[#FF2F7D]",
  },
];

const sections: TermsSection[] = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of These Terms",
    icon: FileCheck2,
    paragraphs: [
      "By accessing or using this website, you agree to these Terms and Conditions. If you do not agree, please stop using the website.",
      "These website terms apply separately from any proposal, statement of work, master services agreement, support agreement or other contract entered into with MITOMS Technologies.",
    ],
  },
  {
    id: "about-website",
    number: "02",
    title: "About This Website",
    icon: Globe2,
    paragraphs: [
      "This website provides general information about MITOMS Technologies, our capabilities, services, portfolio concepts and ways to contact our team.",
      "Website content is provided for general information and does not, by itself, create a client relationship, professional engagement, binding quotation or commitment to deliver services.",
    ],
  },
  {
    id: "services",
    number: "03",
    title: "Services, Proposals and Project Agreements",
    icon: BriefcaseBusiness,
    paragraphs: [
      "Any project scope, timeline, price, deliverable, dependency, acceptance process, support commitment or ownership arrangement must be confirmed in a separate written agreement.",
      "Where there is a conflict between these website terms and a signed project agreement, the signed project agreement will control for that project.",
    ],
    bullets: [
      "Project scope and deliverables",
      "Milestones and expected timelines",
      "Client dependencies and approval responsibilities",
      "Pricing, taxes and payment schedule",
      "Intellectual-property ownership and licensing",
      "Support, maintenance and change-request procedures",
    ],
  },
  {
    id: "user-responsibilities",
    number: "04",
    title: "Your Responsibilities",
    icon: UserCheck,
    paragraphs: [
      "You agree to provide accurate information when submitting an enquiry and to use the website lawfully and responsibly.",
    ],
    bullets: [
      "Do not submit false, misleading or unauthorised information",
      "Do not upload malware, harmful code or unlawful material",
      "Do not attempt to interfere with website security or availability",
      "Do not access systems, data or areas without permission",
      "Do not use the website to violate another person's rights",
      "Keep confidential any access credentials issued for a client service",
    ],
  },
  {
    id: "acceptable-use",
    number: "05",
    title: "Prohibited and Unacceptable Use",
    icon: Ban,
    paragraphs: [
      "You must not use the website in a way that could damage our systems, disrupt other users, infringe rights or expose any person or organisation to harm.",
    ],
    bullets: [
      "Automated scraping that places an unreasonable load on the website",
      "Reverse engineering or probing for vulnerabilities without written permission",
      "Copying or republishing protected content without authorisation",
      "Impersonation, fraud, harassment or unlawful communication",
      "Introducing viruses, ransomware, spyware or other malicious software",
      "Using website content to misrepresent an affiliation with MITOMS Technologies",
    ],
  },
  {
    id: "intellectual-property",
    number: "06",
    title: "Intellectual Property",
    icon: Copyright,
    paragraphs: [
      "Unless otherwise stated, the website design, text, graphics, branding, interface elements, code, illustrations and other content are owned by or licensed to MITOMS Technologies and are protected by applicable intellectual-property laws.",
      "You may view and use the website for legitimate personal or business evaluation. No ownership rights are transferred by allowing access to the website.",
    ],
    note:
      "Client-project ownership, source-code rights, design files, reusable components, third-party materials and portfolio rights should be addressed in the relevant signed project agreement.",
  },
  {
    id: "client-materials",
    number: "07",
    title: "Client Materials and Instructions",
    icon: Users,
    paragraphs: [
      "Where a client provides logos, text, images, data, software, credentials or other materials, the client is responsible for confirming that it has the necessary rights and permissions for their intended use.",
      "We may rely on the accuracy, legality and completeness of materials and instructions supplied by the client unless otherwise agreed in writing.",
    ],
  },
  {
    id: "payments",
    number: "08",
    title: "Pricing, Payments and Taxes",
    icon: CircleDollarSign,
    paragraphs: [
      "Website descriptions do not constitute a fixed-price offer. Pricing is confirmed through a written proposal, quotation, order form or project agreement.",
      "Invoices, payment dates, deposits, late-payment consequences, taxes, expenses and refund arrangements are governed by the applicable project agreement or invoice terms.",
    ],
    note:
      "Before publication, align this section with your actual invoicing, tax, cancellation and refund practices.",
  },
  {
    id: "third-party-services",
    number: "09",
    title: "Third-Party Tools, Links and Services",
    icon: Link2,
    paragraphs: [
      "Our website or services may refer to, integrate with or rely on third-party platforms, libraries, hosting providers, payment services, APIs or websites.",
      "Third-party services are governed by their own terms, availability, security and privacy practices. We are not responsible for third-party content or changes outside our reasonable control.",
    ],
  },
  {
    id: "confidentiality",
    number: "10",
    title: "Confidentiality",
    icon: LockKeyhole,
    paragraphs: [
      "Information shared through a general website enquiry should not be treated as confidential unless confidentiality has been separately agreed in writing.",
      "Confidential project information is handled according to the applicable non-disclosure agreement, project agreement and reasonable security practices.",
    ],
  },
  {
    id: "availability",
    number: "11",
    title: "Website Availability and Changes",
    icon: Wrench,
    paragraphs: [
      "We aim to keep the website useful and available, but we do not guarantee uninterrupted, error-free or permanent access.",
      "We may update, suspend, remove or change website features, content and availability for maintenance, security, operational or business reasons.",
    ],
  },
  {
    id: "disclaimers",
    number: "12",
    title: "Disclaimers",
    icon: TriangleAlert,
    paragraphs: [
      "The website and its general content are provided on an as-available basis. To the maximum extent permitted by applicable law, we do not make warranties about completeness, uninterrupted availability, fitness for a particular purpose or the results of relying on general website information.",
      "Portfolio concepts, illustrations, statistics and examples should not be interpreted as guaranteed results for every project. Actual outcomes depend on scope, data, market conditions, client participation and many other factors.",
    ],
  },
  {
    id: "liability",
    number: "13",
    title: "Limitation of Liability",
    icon: ShieldCheck,
    paragraphs: [
      "To the maximum extent permitted by applicable law, MITOMS Technologies will not be liable for indirect, incidental, special, punitive or consequential loss arising only from use of, or inability to use, this website.",
      "Any liability connected with paid services is governed by the limitation and allocation of risk agreed in the applicable signed contract.",
    ],
    note:
      "Liability clauses can be restricted or treated differently depending on the jurisdiction, customer type and nature of the service. Obtain legal review before publication.",
  },
  {
    id: "indemnity",
    number: "14",
    title: "Indemnity",
    icon: Handshake,
    paragraphs: [
      "To the extent permitted by applicable law, you agree to be responsible for losses or claims arising from your unlawful use of the website, violation of these terms or infringement caused by materials you submit.",
      "Any broader indemnity relating to a client project must be stated in the applicable signed agreement.",
    ],
  },
  {
    id: "termination",
    number: "15",
    title: "Suspension and Termination",
    icon: Clock3,
    paragraphs: [
      "We may restrict or suspend access to the website where reasonably necessary to protect security, investigate misuse, comply with law or prevent harm.",
      "Ending access to the website does not affect rights, payment obligations or provisions that are intended to continue after termination.",
    ],
  },
  {
    id: "governing-law",
    number: "16",
    title: "Governing Law and Disputes",
    icon: Landmark,
    paragraphs: [
      "The governing law, dispute procedure and competent courts should match the legal entity operating this website and the jurisdiction stated in the final published version.",
      "Where a separate project agreement applies, its governing-law and dispute-resolution provisions will control for that project.",
    ],
    note:
      "Replace this section with the registered company name, governing state or country, court jurisdiction and any arbitration or mediation process approved by your legal adviser.",
  },
  {
    id: "changes",
    number: "17",
    title: "Changes to These Terms",
    icon: RefreshCcw,
    paragraphs: [
      "We may update these Terms and Conditions when our website, services, business practices or legal requirements change.",
      "The updated version will be published on this page with a revised date. Continued use after an update indicates acceptance to the extent permitted by applicable law.",
    ],
  },
  {
    id: "contact",
    number: "18",
    title: "Contact Us",
    icon: Mail,
    paragraphs: [
      "For questions about these Terms and Conditions, contact MITOMS Technologies using the details below or through the website contact page.",
    ],
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

function SummaryCard({
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

export default function TermsAndConditionsPage() {
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
                <ScrollText size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="Terms and Conditions"
                  speed={82}
                  delay={100}
                  nowrap
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-7 max-w-[760px] overflow-visible text-[34px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:text-[46px] lg:text-[50px]">
                Clear Terms for
                <span className="mt-2 flex overflow-visible pb-[0.22em] leading-[1.14]">
                  <TypewriterText
                    text="Working Together"
                    speed={110}
                    delay={260}
                    nowrap
                    className="overflow-visible pb-[0.14em] pr-[0.12em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[16px] font-medium leading-8 text-[#27314f]/90 sm:text-[17px]">
                These terms explain the rules for using the {termsDetails.companyName} website
                and how website information relates to proposals, projects and
                separate service agreements.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e3def1] bg-white px-4 py-3 text-[12px] font-bold text-[#27314f]/82 shadow-[0_8px_22px_rgba(22,17,62,0.05)]">
                  <FileText size={15} className="text-[#4b22ff]" />
                  Last updated: {termsDetails.lastUpdated}
                </span>

                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#e3def1] bg-white px-4 py-3 text-[12px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                >
                  Ask a question
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
                          text="Fair and Transparent"
                          speed={82}
                          delay={120}
                          cursorClassName="bg-[#ff7ca8]"
                        />
                      </p>

                      <h2 className="mt-4 max-w-[420px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] sm:text-[38px]">
                        Know the Rules.
                        <span className="block text-[#ff7ca8]">
                          Understand the Relationship.
                        </span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          icon: FileCheck2,
                          label: "Clear Terms",
                        },
                        {
                          icon: Handshake,
                          label: "Fair Working",
                        },
                        {
                          icon: ShieldCheck,
                          label: "Protected Rights",
                        },
                      ].map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="rounded-[15px] border border-white/10 bg-white/[0.08] p-3 text-center backdrop-blur"
                          >
                            <Icon
                              size={18}
                              className="mx-auto text-[#ff7ca8]"
                            />

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
                  Website Use
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Responsible Access
                </p>
              </div>

              <div className="absolute bottom-[6%] right-[0%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4b22ff]">
                  Project Terms
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Confirmed in Writing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section data-bidirectional-reveal className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff2f7d]">
                <TypewriterText
                  text="Terms at a Glance"
                  speed={84}
                  delay={100}
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 overflow-visible text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                <span className="block">The Important Points,</span>

                <span className="mt-1 flex justify-center overflow-visible pb-[0.1em]">
                  <TypewriterText
                    text="Made Easier to Understand"
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
                <SummaryCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* TERMS CONTENT */}
        <section data-bidirectional-reveal className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[300px_1fr]">
            {/* TABLE OF CONTENTS */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[24px] border border-[#e3deef] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f0ecff] text-[#4b22ff]">
                    <ScrollText size={21} />
                  </div>

                  <div>
                    <p className="bg-gradient-to-r from-[#4b22ff] to-[#ff2f7d] bg-clip-text text-[11px] font-bold uppercase tracking-[0.16em] text-transparent">
                      On This Page
                    </p>

                    <h2 className="mt-1 text-[16px] font-bold text-[#081232]">
                      Terms Sections
                    </h2>
                  </div>
                </div>

                <nav className="mt-5 max-h-[540px] space-y-1 overflow-y-auto pr-1">
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

            {/* SECTIONS */}
            <div className="space-y-5">
              <div className="rounded-[24px] border border-[#eadff0] bg-[linear-gradient(105deg,#fff8fb,#f7f4ff)] p-6 shadow-[0_12px_32px_rgba(75,34,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#fff0f5] text-[#ff2f7d]">
                    <AlertTriangle size={21} />
                  </div>

                  <div>
                    <h2 className="text-[16px] font-bold text-[#081232]">
                      Review before publishing
                    </h2>

                    <p className="mt-2 text-[14px] font-medium leading-7 text-[#27314f]/86">
                      This is a general website template. Replace the legal
                      email, registered entity, governing law, payment terms,
                      refund rules and service-specific language so the page
                      accurately reflects your actual business.
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

                    {section.id === "contact" && (
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <a
                          href={`mailto:${termsDetails.contactEmail}`}
                          className="group flex items-center justify-between rounded-[17px] border border-[#e3deef] bg-[#fbfaff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff]"
                        >
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff2f7d]">
                              Legal Email
                            </p>

                            <p className="mt-2 break-all text-[13px] font-bold text-[#081232] group-hover:text-[#4b22ff]">
                              {termsDetails.contactEmail}
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
                    text="Need Clarification?"
                    speed={82}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[730px] overflow-visible text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[39px] lg:text-[42px]">
                  <span className="block">Have a Question About These Terms</span>

                  <span className="mt-1 block overflow-visible pb-[0.08em]">
                    <TypewriterText
                      text="or a Project Agreement?"
                      speed={98}
                      delay={220}
                      className="overflow-visible pb-[0.04em] pr-[0.08em] text-[#ff7ca8]"
                      cursorClassName="bg-[#ff7ca8]"
                    />
                  </span>
                </h2>

                <p className="mt-3 max-w-[670px] text-[15px] font-medium leading-7 text-white/84">
                  Contact our team before relying on any website statement for a
                  specific project, price, timeline or legal commitment.
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