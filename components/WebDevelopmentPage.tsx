"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Gauge,
  Globe2,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  MonitorSmartphone,
  MousePointerClick,
  Paintbrush,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import ConsultationModal from "./ConsultationModal";
import { useBidirectionalScrollReveal } from "./useBidirectionalScrollReveal";

const capabilities = [
  {
    icon: MonitorSmartphone,
    title: "Responsive Development",
    description:
      "Websites that look and work beautifully across desktop, tablet and mobile devices.",
    gradient: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: Gauge,
    title: "High Performance",
    description:
      "Optimized code, images and architecture for better speed and user experience.",
    gradient: "from-[#00b8ff] to-[#4b22ff]",
  },
  {
    icon: ShieldCheck,
    title: "Secure Architecture",
    description:
      "Reliable development practices focused on security, privacy and stability.",
    gradient: "from-[#ff2f7d] to-[#743cff]",
  },
  {
    icon: Search,
    title: "SEO-Friendly Structure",
    description:
      "Clean, accessible and search-engine-friendly website architecture.",
    gradient: "from-[#743cff] to-[#ff2f7d]",
  },
  {
    icon: Blocks,
    title: "Scalable Solutions",
    description:
      "Flexible architecture that can grow with your users, services and business.",
    gradient: "from-[#4b22ff] to-[#00b8ff]",
  },
  {
    icon: Wrench,
    title: "Maintenance and Support",
    description:
      "Continuous monitoring, updates, improvements and technical assistance.",
    gradient: "from-[#ff2f7d] to-[#ff7ca8]",
  },
];

const solutions = [
  {
    icon: Globe2,
    number: "01",
    title: "Corporate Websites",
    description:
      "Professional websites that clearly communicate your brand, services and business value.",
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "E-Commerce Platforms",
    description:
      "Secure online stores with product management, payments and customer-focused experiences.",
  },
  {
    icon: LayoutDashboard,
    number: "03",
    title: "Business Portals",
    description:
      "Customer, employee, vendor and administrative portals built around your workflow.",
  },
  {
    icon: Blocks,
    number: "04",
    title: "Custom Web Applications",
    description:
      "Purpose-built applications designed around your specific processes and business goals.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Startup MVP Development",
    description:
      "Focused minimum viable products created to validate ideas and reach the market faster.",
  },
  {
    icon: Workflow,
    number: "06",
    title: "Website Modernization",
    description:
      "Redesign, migration and performance improvement for outdated websites and platforms.",
  },
];

const process = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description:
      "We understand your business, audience, requirements and project goals.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Planning",
    description:
      "We define features, architecture, timelines and the right technology stack.",
  },
  {
    icon: Paintbrush,
    number: "03",
    title: "UI/UX Design",
    description:
      "We create responsive interfaces focused on usability and your brand identity.",
  },
  {
    icon: Code2,
    number: "04",
    title: "Development",
    description:
      "Our developers build the frontend, backend, database and required integrations.",
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Testing",
    description:
      "We test responsiveness, functionality, performance, security and compatibility.",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Launch and Support",
    description:
      "We deploy the website and continue supporting its performance and growth.",
  },
];

const frontendTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
];

const backendTechnologies = [
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "REST APIs",
  "GraphQL",
];

const databaseTechnologies = [
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Elasticsearch",
  "Redis",
  "Firebase",
];

const cloudTechnologies = [
  "AWS",
  "Docker",
  "Kubernetes",
  "Vercel",
  "CI/CD",
  "Cloud Hosting",
];

const benefits = [
  "Custom design aligned with your brand",
  "Mobile-first and responsive development",
  "Fast-loading and optimized pages",
  "SEO-friendly website architecture",
  "Secure and scalable source code",
  "Easy content and website management",
  "Third-party API and payment integrations",
  "Ongoing technical support",
];

const faqs = [
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline depends on the size, design complexity, required features and integrations. A standard business website may take a few weeks, while a custom web application may require a longer development cycle.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Yes. We follow a responsive and mobile-first approach so the website works properly across smartphones, tablets, laptops and larger desktop screens.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can evaluate your existing website and improve its design, structure, performance, user experience, technology and content presentation.",
  },
  {
    question: "Will I be able to manage the website content?",
    answer:
      "Yes. Depending on your requirements, we can provide a suitable content-management solution or develop an admin panel for managing website information.",
  },
  {
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. We can provide ongoing maintenance, updates, performance monitoring, security improvements and technical support after deployment.",
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

  const isTyping =
    hasStarted && visibleCharacters < text.length;

  const displayClassName =
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
      className={`${displayClassName} ${whitespaceClassName}`}
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


function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-bidirectional-reveal
      style={{ "--mitoms-reveal-delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}

function TechnologyGroup({
  icon: Icon,
  title,
  technologies,
}: {
  icon: LucideIcon;
  title: string;
  technologies: string[];
}) {
  return (
    <div className="rounded-[19px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[22px] sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#4b22ff] to-[#ff2f7d] text-white shadow-[0_12px_25px_rgba(75,34,255,0.24)]">
          <Icon size={22} />
        </div>

        <h3 className="text-[17px] font-bold text-white">{title}</h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-[12px] font-semibold text-white/82"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WebDevelopmentPage() {
  const [showConsultation, setShowConsultation] = useState(false);
  const pageRef = useBidirectionalScrollReveal<HTMLElement>();

  return (
    <>
      <main ref={pageRef} className="w-full overflow-x-clip bg-white font-sans text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff2f7d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#743cff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid w-full max-w-[1320px] min-w-0 items-center gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            {/* Hero content */}
            <div className="relative z-20 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Code2 size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="Web Development Company in India"
                  speed={85}
                  delay={100}
                  className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[700px] overflow-visible font-bold tracking-[-0.045em] text-[#081232] sm:mt-7">
                {/* Mobile: three balanced lines, without a single-word orphan */}
                <span className="block whitespace-nowrap text-[32px] leading-[1.08] min-[390px]:text-[34px] sm:hidden">
                  Websites Built to
                </span>

                <span className="mt-2 block whitespace-nowrap text-[32px] leading-[1.08] min-[390px]:text-[34px] sm:hidden">
                  Perform, Scale
                </span>

                <span className="mt-1 flex items-baseline whitespace-nowrap text-[32px] leading-[1.08] min-[390px]:text-[34px] sm:hidden">
                  and{" "}
                  <TypewriterText
                    text="Convert"
                    speed={125}
                    delay={300}
                    nowrap
                    className="ml-2 overflow-visible bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text pb-[0.06em] pr-[0.08em] tracking-[-0.015em] text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet and desktop: two balanced lines */}
                <span className="hidden whitespace-nowrap text-[43px] leading-[1.08] sm:block lg:text-[48px]">
                  Websites Built to
                </span>

                <span className="mt-2 hidden items-baseline whitespace-nowrap text-[43px] leading-[1.08] sm:flex lg:text-[48px]">
                  Perform, Scale and{" "}
                  <TypewriterText
                    text="Convert"
                    speed={125}
                    delay={300}
                    nowrap
                    className="ml-3 overflow-visible bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text pb-[0.06em] pr-[0.08em] tracking-[-0.015em] text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[600px] text-[16px] font-medium leading-7 text-[#27314f]/90 sm:mt-7 sm:text-[17px] sm:leading-[1.8]">
                MITOMS is a web development company in India creating fast,
                responsive and scalable websites and web applications that
                support business operations and customer growth.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Start Your Web Project

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio/"
                  className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto sm:px-7"
                >
                  View Our Work

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8 grid w-full max-w-[620px] auto-rows-fr grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))] xl:gap-2 2xl:gap-3">
                {[
                  {
                    icon: MonitorSmartphone,
                    title: "Responsive",
                  },
                  {
                    icon: Zap,
                    title: "Fast",
                  },
                  {
                    icon: LockKeyhole,
                    title: "Secure",
                  },
                  {
                    icon: Blocks,
                    title: "Scalable",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex min-h-[76px] h-full w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-[14px] border border-[#e7e2f5] bg-white/85 px-3 py-3 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:min-h-[82px] sm:gap-3 sm:rounded-[16px] sm:px-4 sm:py-4 xl:min-h-0 xl:gap-1.5 xl:px-2 xl:py-3 2xl:gap-2.5 2xl:px-3 2xl:py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff] xl:h-7 xl:w-7 xl:rounded-[10px] 2xl:h-9 2xl:w-9 2xl:rounded-[12px]">
                        <Icon size={17} className="xl:h-[14px] xl:w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
                      </div>

                      <span className="min-w-0 flex-1 whitespace-nowrap text-[12px] font-bold leading-5 text-[#24304f] xl:text-[10px] xl:leading-[1.25] 2xl:text-[12px] 2xl:leading-5">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mt-1 min-h-[300px] min-w-0 sm:mt-0 sm:min-h-[470px] lg:min-h-[530px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff] sm:block sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.13),transparent_67%)] sm:block sm:h-[330px] sm:w-[330px] lg:h-[380px] lg:w-[380px]" />

              <Image
                src="/images/home/laptop.webp"
                alt="Web development services"
                width={700}
                height={600}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 h-auto w-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)] sm:w-[92%] lg:w-[88%] xl:max-w-[620px]"
              />

              <div style={{ animationDelay: "0s" }}
                className="web-float-card absolute left-[1%] top-[9%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#7b5cff] text-white">
                    <Gauge size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Performance First
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Fast and optimized
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "0.7s" }}
                className="web-float-card absolute right-[0%] top-[18%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff2f7d] to-[#ff7ca8] text-white">
                    <MousePointerClick size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Conversion Focused
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Designed for action
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "1.4s" }}
                className="web-float-card absolute bottom-[8%] left-[4%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00b8ff] to-[#4b22ff] text-white">
                    <Smartphone size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Mobile Ready
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Every screen supported
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ animationDelay: "2.1s" }}
                className="web-float-card absolute bottom-[2%] right-[2%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#743cff] to-[#ff2f7d] text-white">
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Growth Driven
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Built for results
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
                  text="Web Development Partner"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[580px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                More Than a Website.
                <TypewriterText
                  text="A Digital Growth Platform."
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-6 max-w-[600px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Your website is often the first interaction a customer has with
                your business. We combine design, development and strategy to
                create websites that look professional, load quickly and make it
                easier for visitors to take action.
              </p>

              <p className="mt-5 max-w-[600px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                From corporate websites to complex web platforms, every project
                is planned around your audience, business processes and future
                growth.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
              >
                Discuss Your Requirements

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 80} className="h-full">
                    <div
                      className="group h-full rounded-[21px] border border-[#e4dff0] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
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
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="What We Build"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Web Solutions Designed Around{" "}
                <TypewriterText
                  text="Your Business"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[670px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                We develop websites and web platforms for different business
                models, audiences and operational requirements.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.number} delay={(index % 3) * 90} className="h-full">
                    <div
                      className="group relative h-full overflow-hidden rounded-[21px] border border-[#e4dff1] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
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
                      onClick={() => setShowConsultation(true)}
                      className="group/link relative mt-6 inline-flex cursor-pointer items-center gap-2 text-[12px] font-bold text-[#4b22ff]"
                    >
                      Discuss This Solution

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                      />
                    </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY STACK */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[21px] bg-[#041033] px-5 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[24px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[780px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#d75cff]">
                <TypewriterText
                  text="Technology Stack"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#d75cff]"
                />
              </p>

              <h2 className="mt-4 overflow-visible font-bold tracking-[-0.035em]">
                {/* Mobile: balanced two-line heading */}
                <span className="block whitespace-nowrap text-[26px] leading-[1.15] min-[390px]:text-[28px] sm:hidden">
                  Modern Technologies for
                </span>

                <span className="mt-1 flex justify-center overflow-visible pb-[0.1em] text-[26px] leading-[1.15] min-[390px]:text-[28px] sm:hidden">
                  <TypewriterText
                    text="Reliable Web Development"
                    speed={105}
                    delay={220}
                    nowrap
                    className="overflow-visible pb-[0.06em] pr-[0.08em] tracking-[-0.015em] text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[40px] leading-[1.15] sm:block lg:text-[44px]">
                  Modern Technologies for
                  <br />
                  <TypewriterText
                    text="Reliable Web Development"
                    speed={105}
                    delay={220}
                    nowrap
                    className="overflow-visible pb-[0.05em] pr-[0.08em] text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[670px] text-[16px] font-medium leading-7 text-white/82">
                We choose technologies according to the product requirements,
                business goals, performance needs and expected scale.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Reveal delay={0} className="h-full">
                <TechnologyGroup
                icon={Code2}
                title="Frontend"
                technologies={frontendTechnologies}
              />
              </Reveal>

              <Reveal delay={90} className="h-full">
                <TechnologyGroup
                icon={Server}
                title="Backend"
                technologies={backendTechnologies}
              />
              </Reveal>

              <Reveal delay={180} className="h-full">
                <TechnologyGroup
                icon={Database}
                title="Database"
                technologies={databaseTechnologies}
              />
              </Reveal>

              <Reveal delay={270} className="h-full">
                <TechnologyGroup
                icon={Cloud}
                title="Cloud and DevOps"
                technologies={cloudTechnologies}
              />
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Process"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                From Initial Idea to{" "}
                <TypewriterText
                  text="Successful Launch"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[660px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                A structured and transparent development process keeps your
                project aligned with its goals at every stage.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.number} delay={(index % 3) * 90} className="h-full">
                    <div
                      className="group relative h-full rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
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
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="relative bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-[#ff2f7d]/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="Why MITOMS"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 max-w-[570px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Web Development Focused on{" "}
                <TypewriterText
                  text="Business Results"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mt-6 max-w-[590px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                We do not approach web development as only a coding exercise.
                Every decision is connected to user experience, performance,
                maintainability and the goals of your business.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1 sm:mt-8 sm:w-auto sm:px-7"
              >
                Get Free Consultation

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit} delay={(index % 2) * 80}>
                  <div
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
                </Reveal>
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
                  text="Web Development"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-5 max-w-[400px] text-[15px] font-medium leading-7 text-[#27314f]/86">
                Some common questions businesses ask before beginning a website
                or web application project.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
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
          <Reveal>
            <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[26px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff7ca8]">
                  <TypewriterText
                    text="Build Your Next Website"
                    speed={85}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[700px] text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[39px] lg:text-[42px]">
                  Ready to Create a Website That Supports Your Business Growth?
                </h2>

                <p className="mt-3 max-w-[640px] text-[15px] font-medium leading-7 text-white/84">
                  Share your requirements with our team and receive a practical
                  development plan for your website or web application.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Start Your Project

                <ArrowRight
                  size={18}
                  className="text-[#ff2f7d] transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
            </div>
          </Reveal>
        </section>
      </main>

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />

      <style>{`
        .web-float-card {
          animation: webFloat 6.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes webFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .web-float-card {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}