"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Compass,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Lightbulb,
  RefreshCcw,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const consultingCapabilities = [
  {
    icon: Compass,
    title: "Technology Strategy",
    description:
      "A practical technology roadmap aligned with your business priorities and long-term plans.",
    gradient: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: Layers3,
    title: "Solution Architecture",
    description:
      "Scalable application and infrastructure architecture designed around your requirements.",
    gradient: "from-[#00b8ff] to-[#4b22ff]",
  },
  {
    icon: RefreshCcw,
    title: "Digital Modernization",
    description:
      "Modernize outdated systems, workflows and platforms without unnecessary disruption.",
    gradient: "from-[#743cff] to-[#ff2f7d]",
  },
  {
    icon: ShieldCheck,
    title: "Security Consulting",
    description:
      "Identify technology risks and improve the security of applications, data and infrastructure.",
    gradient: "from-[#ff2f7d] to-[#ff7ca8]",
  },
  {
    icon: Cloud,
    title: "Cloud Consulting",
    description:
      "Select, migrate and optimize cloud services according to performance and business needs.",
    gradient: "from-[#4b22ff] to-[#00b8ff]",
  },
  {
    icon: Gauge,
    title: "Technology Optimization",
    description:
      "Improve system performance, reliability, maintainability and operational efficiency.",
    gradient: "from-[#ff2f7d] to-[#743cff]",
  },
];

const consultingServices = [
  {
    icon: Target,
    number: "01",
    title: "IT Strategy Consulting",
    description:
      "Define technology priorities, investments and initiatives that directly support business objectives.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Architecture Consulting",
    description:
      "Plan scalable application, API, database and infrastructure architecture for new or existing products.",
  },
  {
    icon: RefreshCcw,
    number: "03",
    title: "Legacy System Modernization",
    description:
      "Assess older systems and create a phased plan for migration, redevelopment or integration.",
  },
  {
    icon: Cloud,
    number: "04",
    title: "Cloud and Infrastructure",
    description:
      "Evaluate cloud platforms, hosting environments, scalability, deployment and operational requirements.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Technology Risk Assessment",
    description:
      "Identify security, performance, reliability and maintainability risks within your technology environment.",
  },
  {
    icon: Workflow,
    number: "06",
    title: "Process and Automation Consulting",
    description:
      "Review business workflows and identify opportunities for automation and system integration.",
  },
];

const businessOutcomes = [
  {
    icon: Target,
    title: "Clear Technology Direction",
    description:
      "Create a defined technology roadmap instead of making disconnected technical decisions.",
  },
  {
    icon: Gauge,
    title: "Improved Performance",
    description:
      "Identify bottlenecks and improve application, infrastructure and operational performance.",
  },
  {
    icon: ShieldCheck,
    title: "Reduced Technology Risk",
    description:
      "Address security, scalability and reliability concerns before they become major problems.",
  },
  {
    icon: Zap,
    title: "Faster Delivery",
    description:
      "Improve development, testing and deployment practices to deliver changes more efficiently.",
  },
  {
    icon: BarChart3,
    title: "Better Investment Decisions",
    description:
      "Prioritize technology initiatives according to value, urgency, cost and expected impact.",
  },
  {
    icon: Users,
    title: "Stronger Team Alignment",
    description:
      "Help business leaders, product teams and technology teams work toward the same objectives.",
  },
];

const consultingProcess = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We understand your business, existing systems, challenges, users and future goals.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Assess",
    description:
      "We evaluate technology, architecture, workflows, performance, security and maintainability.",
  },
  {
    icon: Target,
    number: "03",
    title: "Prioritize",
    description:
      "We identify the most important issues and organize them according to business impact.",
  },
  {
    icon: Compass,
    number: "04",
    title: "Recommend",
    description:
      "We prepare practical recommendations, architecture options and an implementation roadmap.",
  },
  {
    icon: Code2,
    number: "05",
    title: "Implement",
    description:
      "Our team can support development, migration, integration and technical improvements.",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Measure and Improve",
    description:
      "We review outcomes, monitor progress and refine the technology plan as the business evolves.",
  },
];

const expertiseGroups = [
  {
    icon: Code2,
    title: "Application Consulting",
    items: [
      "Web applications",
      "Mobile applications",
      "API strategy",
      "System integrations",
      "Product architecture",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud and Infrastructure",
    items: [
      "Cloud strategy",
      "Cloud migration",
      "Hosting architecture",
      "Scalability planning",
      "Monitoring",
    ],
  },
  {
    icon: Database,
    title: "Data and Systems",
    items: [
      "Database architecture",
      "Data migration",
      "Business intelligence",
      "System modernization",
      "Data integration",
    ],
  },
  {
    icon: GitBranch,
    title: "Engineering and DevOps",
    items: [
      "Development workflow",
      "CI/CD",
      "Code-quality review",
      "Deployment strategy",
      "Automation",
    ],
  },
];

const benefits = [
  "Business-focused technology recommendations",
  "Independent evaluation of existing systems",
  "Clear and practical technology roadmap",
  "Scalable architecture and platform planning",
  "Reduced technical debt and operational risk",
  "Improved development and delivery processes",
  "Support during implementation and migration",
  "Long-term technology guidance",
];

const faqs = [
  {
    question: "When does a business need IT consulting?",
    answer:
      "IT consulting is useful when a business is planning a new digital product, modernizing existing systems, experiencing performance or scalability problems, moving to the cloud or needing a clear technology roadmap.",
  },
  {
    question: "Can you review our existing technology systems?",
    answer:
      "Yes. We can evaluate applications, infrastructure, databases, integrations, development practices, security concerns and overall maintainability before preparing recommendations.",
  },
  {
    question: "Do you only provide recommendations?",
    answer:
      "We can provide an assessment and roadmap, or continue with design, development, migration, integration and implementation support depending on your requirements.",
  },
  {
    question: "Can you help us choose the right technology stack?",
    answer:
      "Yes. We evaluate product requirements, team capabilities, budget, timeline, expected users, integrations and long-term maintenance before recommending suitable technologies.",
  },
  {
    question: "Can you help modernize a legacy application?",
    answer:
      "Yes. We can assess the current application and recommend phased modernization, migration, redevelopment, integration or infrastructure improvements.",
  },
];


function TypewriterText({
  text,
  speed = 105,
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
        threshold: 0.2,
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timeoutId = window.setTimeout(
      () => {
        setVisibleCharacters((current) => {
          if (reduceMotion) {
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

function ExpertiseCard({
  icon: Icon,
  title,
  items,
}: {
  icon: ElementType;
  title: string;
  items: string[];
}) {
  return (
    <div data-service-reveal className="rounded-[19px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[22px] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_12px_25px_rgba(75,34,255,0.24)]">
          <Icon size={22} />
        </div>

        <h3 className="text-[17px] font-bold text-white">{title}</h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-[12px] font-semibold text-white/82"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ITConsultingPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    const elements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-service-reveal]"),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.dataset.revealVisible = "true";
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          element.dataset.revealVisible = "true";
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main ref={pageRef} className="w-full overflow-x-clip bg-white font-sans text-[#07112f] antialiased">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff2f7d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#743cff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-9 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            {/* LEFT CONTENT */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Compass size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="IT Consulting Services"
                  speed={85}
                  delay={100}
                  className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:mt-7 sm:text-[46px] lg:text-[50px]">
                Technology Decisions
                <span className="mt-2 block">
                  That Move Your Business{" "}
                  <TypewriterText
                    text="Forward"
                    speed={125}
                    delay={300}
                    nowrap
                    className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[620px] text-[16px] font-medium leading-7 text-[#27314f]/90 sm:mt-7 sm:text-[17px] sm:leading-[1.8]">
                We help businesses plan, modernize and optimize technology with
                practical strategies that improve performance, reduce risk and
                support long-term growth.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Discuss Your IT Strategy

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/contact/"
                  className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto sm:px-7"
                >
                  Talk to Our Team

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8 grid w-full max-w-[640px] auto-rows-fr grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))] xl:gap-2 2xl:gap-3">
                {[
                  {
                    icon: Target,
                    title: "Strategic",
                  },
                  {
                    icon: Lightbulb,
                    title: "Practical",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure",
                  },
                  {
                    icon: Rocket,
                    title: "Growth Ready",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                  data-service-reveal
                      className="flex min-h-[76px] h-full w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-[14px] border border-[#e7e2f5] bg-white/85 px-3 py-3 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:min-h-[82px] sm:gap-3 sm:rounded-[16px] sm:px-4 sm:py-4 xl:min-h-0 xl:gap-1.5 xl:px-2 xl:py-3 2xl:gap-2.5 2xl:px-3 2xl:py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff] xl:h-7 xl:w-7 xl:rounded-[10px] 2xl:h-9 2xl:w-9 2xl:rounded-[12px]">
                        <Icon size={17} className="xl:h-[14px] xl:w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
                      </div>

                      <span className="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere] text-[12px] font-bold leading-4 text-[#24304f] sm:leading-5 xl:text-[10px] xl:leading-[1.25] 2xl:text-[12px] 2xl:leading-5">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative mt-1 min-h-[300px] min-w-0 sm:mt-0 sm:min-h-[480px] lg:min-h-[550px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff] sm:block sm:h-[405px] sm:w-[405px] lg:h-[475px] lg:w-[475px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.15),transparent_67%)] sm:block sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]" />

              <Image
                src="/images/home/machine.webp"
                alt="IT consulting services"
                width={720}
                height={650}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 w-[94%] max-w-[620px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)] sm:w-[90%] lg:w-[94%]"
              />

              <div style={{ animationDelay: "0s" }}
                className="itconsulting-float-card absolute left-[0%] top-[8%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#7b5cff] text-white">
                    <Target size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      IT Strategy
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Clear technology roadmap
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "0.7s" }}
                className="itconsulting-float-card absolute right-[0%] top-[18%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff2f7d] to-[#ff7ca8] text-white">
                    <Layers3 size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Architecture
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Designed to scale
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "1.4s" }}
                className="itconsulting-float-card absolute bottom-[8%] left-[3%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00b8ff] to-[#4b22ff] text-white">
                   <RefreshCcw size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Modernization
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Upgrade older systems
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "2.1s" }}
                className="itconsulting-float-card absolute bottom-[2%] right-[1%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#743cff] to-[#ff2f7d] text-white">
    <BarChart3 size={21} />
  </div>

  <div>
    <p className="text-[13px] font-bold text-[#081232]">
      Business Impact
    </p>

    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
      Technology with purpose
    </p>
  </div>
</div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="relative px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Technology With Direction"
                  speed={82}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[680px] overflow-visible font-bold tracking-[-0.035em] text-[#081232]">
                {/* Mobile: fixed three-line layout */}
                <span className="block whitespace-nowrap text-[29px] leading-[1.15] min-[390px]:text-[31px] sm:hidden">
                  Build a Smarter
                </span>

                <span className="mt-1 flex items-baseline whitespace-nowrap text-[29px] leading-[1.15] min-[390px]:text-[31px] sm:hidden">
                  Technology{" "}
                  <TypewriterText
                    text="Roadmap"
                    speed={105}
                    delay={220}
                    nowrap
                    className="ml-2 overflow-visible pb-[0.04em] pr-[0.06em] text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                <span className="mt-1 block overflow-visible pb-[0.1em] text-[29px] leading-[1.15] min-[390px]:text-[31px] sm:hidden">
                  <TypewriterText
                    text="for Your Business"
                    speed={105}
                    delay={900}
                    nowrap
                    className="overflow-visible pb-[0.06em] pr-[0.08em] text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[40px] leading-[1.15] sm:block lg:text-[44px]">
                  Build a Smarter Technology
                </span>

                <span className="mt-1 hidden text-[40px] leading-[1.15] sm:block lg:text-[44px]">
                  <TypewriterText
                    text="Roadmap for Your Business"
                    speed={105}
                    delay={220}
                    className="text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h2>

              <p className="mt-6 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Technology should help the business operate better, serve
                customers more effectively and respond quickly to change.
              </p>

              <p className="mt-5 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                We review your systems, processes and goals before recommending
                practical improvements that your team can realistically
                implement and maintain.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
              >
                Request an IT Assessment

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {consultingCapabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                  data-service-reveal
                    className="group rounded-[21px] border border-[#e4dff0] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br ${item.gradient} text-white shadow-[0_10px_24px_rgba(75,34,255,0.18)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-4 text-[16px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[14px] font-medium leading-6 text-[#27314f]/84">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[810px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="Consulting Services"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em] text-[#081232]">
                {/* Mobile */}
                <span className="block text-[29px] leading-[1.15] sm:hidden">
                  Practical Consulting
                </span>

                <span className="mt-1 flex items-baseline justify-center text-[29px] leading-[1.15] sm:hidden">
                  for Every{" "}
                  <TypewriterText
                    text="Technology"
                    speed={105}
                    delay={220}
                    nowrap
                    className="ml-2 text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>

                <span className="mt-1 flex justify-center text-[29px] leading-[1.15] sm:hidden">
                  <TypewriterText
                    text="Challenge"
                    speed={105}
                    delay={900}
                    nowrap
                    className="text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[40px] leading-[1.15] sm:inline lg:text-[44px]">
                  Practical Consulting for Every{" "}
                </span>

                <span className="hidden text-[40px] leading-[1.15] sm:inline lg:text-[44px]">
                  <TypewriterText
                    text="Technology Challenge"
                    speed={105}
                    delay={220}
                    className="text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[700px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                Our consulting services help organizations understand their
                current environment and make better technology decisions.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {consultingServices.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                  data-service-reveal
                    className="group relative overflow-hidden rounded-[21px] border border-[#e4dff1] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4b22ff]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#ff2f7d]/8" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        <Icon size={25} />
                      </div>

                      <span className="text-[26px] font-black text-[#eeeaff]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="relative mt-6 text-[19px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="relative mt-3 text-[15px] font-medium leading-7 text-[#27314f]/86">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={openConsultation}
                      className="group/link relative mt-6 inline-flex cursor-pointer items-center gap-2 text-[12px] font-bold text-[#4b22ff]"
                    >
                      Discuss This Service

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BUSINESS OUTCOMES */}
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                  <TypewriterText
                    text="Business Outcomes"
                    speed={88}
                    delay={100}
                    cursorClassName="bg-[#4b22ff]"
                  />
                </p>

                <h2 className="mt-4 max-w-[640px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                  Turn Technology Challenges Into{" "}
                  <TypewriterText
                    text="Business Opportunities"
                    speed={105}
                    delay={220}
                    className="text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </h2>
              </div>

              <p className="max-w-[580px] text-[16px] font-medium leading-8 text-[#27314f]/88 lg:justify-self-end">
                Our recommendations are designed to improve the way your
                technology supports people, processes, customers and business
                growth.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businessOutcomes.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                  data-service-reveal
                    className="group rounded-[22px] border border-[#e3deef] bg-white p-6 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#f0ecff] text-[#4b22ff] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        <Icon size={22} />
                      </div>

                      <span className="text-[22px] font-black text-[#eeeaff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[17px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#27314f]/84">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[21px] bg-[#041033] px-5 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[24px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[820px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#d75cff]">
                <TypewriterText
                  text="Consulting Expertise"
                  speed={88}
                  delay={100}
                  cursorClassName="bg-[#d75cff]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em]">
                {/* Mobile */}
                <span className="block text-[28px] leading-[1.15] sm:hidden">
                  Technology Expertise
                </span>

                <span className="mt-1 block text-[28px] leading-[1.15] sm:hidden">
                  Across{" "}
                  <TypewriterText
                    text="Your Digital"
                    speed={105}
                    delay={220}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                <span className="mt-1 flex justify-center text-[28px] leading-[1.15] sm:hidden">
                  <TypewriterText
                    text="Environment"
                    speed={105}
                    delay={900}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[40px] leading-[1.15] sm:block lg:text-[44px]">
                  Technology Expertise Across
                </span>

                <span className="mt-2 hidden justify-center text-[40px] leading-[1.15] sm:flex lg:text-[44px]">
                  <TypewriterText
                    text="Your Digital Environment"
                    speed={105}
                    delay={220}
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[700px] text-[16px] font-medium leading-7 text-white/82">
                We review the complete technology environment rather than
                evaluating one system or platform in isolation.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {expertiseGroups.map((group) => (
                <ExpertiseCard key={group.title} {...group} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[810px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Consulting Process"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em] text-[#081232]">
                {/* Mobile: exactly two balanced lines */}
                <span className="block whitespace-nowrap text-[24px] leading-[1.15] min-[390px]:text-[27px] sm:hidden">
                  From Technology Assessment
                </span>

                <span className="mt-2 flex items-baseline justify-center whitespace-nowrap text-[24px] leading-[1.15] min-[390px]:text-[27px] sm:hidden">
                  to{" "}
                  <TypewriterText
                    text="Successful Implementation"
                    speed={105}
                    delay={220}
                    nowrap
                    className="ml-2 text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[40px] leading-[1.15] sm:inline lg:text-[44px]">
                  From Technology Assessment to{" "}
                </span>

                <span className="hidden text-[40px] leading-[1.15] sm:inline lg:text-[44px]">
                  <TypewriterText
                    text="Successful Implementation"
                    speed={105}
                    delay={220}
                    className="text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[700px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                A structured consulting process ensures that recommendations
                remain realistic, prioritized and connected to business needs.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {consultingProcess.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                  data-service-reveal
                    className="group relative rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <Icon size={27} />
                      </div>

                      <span className="text-[28px] font-black text-[#eeeaff]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[19px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[15px] font-medium leading-7 text-[#27314f]/86">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY MITOMS */}
        <section className="relative bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-[#ff2f7d]/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="Why Choose MITOMS"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 max-w-[700px] overflow-visible font-bold tracking-[-0.035em] text-[#081232]">
                {/* Mobile */}
                <span className="block whitespace-nowrap text-[29px] leading-[1.15] min-[390px]:text-[31px] sm:hidden">
                  Technology Consulting
                </span>

                <span className="mt-1 flex items-baseline whitespace-nowrap text-[29px] leading-[1.15] min-[390px]:text-[31px] sm:hidden">
                  Focused on{" "}
                  <TypewriterText
                    text="Practical Results"
                    speed={110}
                    delay={220}
                    nowrap
                    className="ml-2 overflow-visible pb-[0.04em] pr-[0.08em] tracking-[-0.015em] text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>

                {/* Tablet, laptop and desktop: balanced two-line layout */}
                <span className="hidden whitespace-nowrap text-[40px] leading-[1.15] sm:block lg:text-[42px] xl:text-[44px]">
                  Technology Consulting
                </span>

                <span className="mt-1 hidden items-baseline whitespace-nowrap text-[40px] leading-[1.15] sm:flex lg:text-[42px] xl:text-[44px]">
                  Focused on{" "}
                  <TypewriterText
                    text="Practical Results"
                    speed={110}
                    delay={220}
                    nowrap
                    className="ml-2 overflow-visible pb-[0.05em] pr-[0.08em] tracking-[-0.015em] text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>
              </h2>

              <p className="mt-6 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                We combine business understanding with design, engineering,
                cloud and product-development experience. This helps us provide
                recommendations that are practical to implement.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Work With Our Consultants

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  data-service-reveal
                  className="group flex min-h-[96px] items-center gap-4 rounded-[19px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex items-start gap-2">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#ff2f7d]"
                    />

                    <p className="text-[14px] font-bold leading-6 text-[#24304f]/90">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-9 sm:gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Frequently Asked Questions"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Questions About
                <TypewriterText
                  text="IT Consulting"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-5 max-w-[410px] text-[15px] font-medium leading-7 text-[#27314f]/86">
                Common questions businesses ask before beginning an IT
                consulting or technology-assessment engagement.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] border border-[#dcd6ef] bg-white px-6 text-[12px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto"
              >
                Ask Your Question

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={item.question}
                  data-service-reveal
                  className="group rounded-[18px] border border-[#e4dff1] bg-white p-4 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] open:shadow-[0_16px_38px_rgba(75,34,255,0.08)] sm:rounded-[20px] sm:p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 sm:gap-5">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="min-w-0 text-[14px] font-bold leading-6 text-[#081232] sm:text-[16px]">
                        {item.question}
                      </h3>
                    </div>

                    <ChevronDown
                      size={19}
                      className="shrink-0 text-[#4b22ff] transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  <p className="mt-4 border-t border-[#ebe7f4] pt-4 text-[15px] font-medium leading-7 text-[#27314f]/86 sm:ml-[52px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 pb-8 sm:px-6 lg:px-10">
          <div data-service-reveal className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[26px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff7ca8]">
                  <TypewriterText
                    text="Plan Your Technology Future"
                    speed={84}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[740px] text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[39px] lg:text-[42px]">
                  Need a Clear Technology Roadmap for Your Business?
                </h2>

                <p className="mt-3 max-w-[670px] text-[15px] font-medium leading-7 text-white/84">
                  Share your current technology challenges with our team and
                  receive a practical recommendation for your next steps.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Book IT Consultation

                <ArrowRight
                  size={18}
                  className="text-[#ff2f7d] transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>
      </main>

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />

      <style>{`
        [data-service-reveal] {
          opacity: 0;
          transform: translate3d(0, 28px, 0);
          transition:
            opacity 700ms ease-out,
            transform 700ms ease-out;
        }

        [data-service-reveal][data-reveal-visible="true"] {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .itconsulting-float-card {
          animation: itconsultingFloat 6.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes itconsultingFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-service-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .itconsulting-float-card {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}