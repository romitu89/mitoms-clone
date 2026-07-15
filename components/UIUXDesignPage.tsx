"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Paintbrush,
  PenTool,
  Rocket,
  Search,
  Shapes,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const capabilities = [
  {
    icon: Search,
    title: "User Research",
    description:
      "We understand your audience, their expectations, problems and digital behavior.",
    gradient: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: Workflow,
    title: "User Experience Strategy",
    description:
      "Clear user journeys and product structures designed around business and user goals.",
    gradient: "from-[#00b8ff] to-[#4b22ff]",
  },
  {
    icon: Layers3,
    title: "Wireframes and Architecture",
    description:
      "Logical screen structures that organize content, features and user interactions.",
    gradient: "from-[#743cff] to-[#ff2f7d]",
  },
  {
    icon: Palette,
    title: "Visual Interface Design",
    description:
      "Modern interfaces with thoughtful colors, typography, spacing and brand consistency.",
    gradient: "from-[#ff2f7d] to-[#ff7ca8]",
  },
  {
    icon: MousePointerClick,
    title: "Interactive Prototypes",
    description:
      "Clickable prototypes that demonstrate navigation, interactions and complete product flow.",
    gradient: "from-[#4b22ff] to-[#00b8ff]",
  },
  {
    icon: Eye,
    title: "Usability Evaluation",
    description:
      "Design reviews and testing focused on clarity, accessibility and ease of use.",
    gradient: "from-[#ff2f7d] to-[#743cff]",
  },
];

const designSolutions = [
  {
    icon: MonitorSmartphone,
    number: "01",
    title: "Website UI/UX Design",
    description:
      "Responsive website experiences that clearly present your brand and guide users toward action.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Mobile App Design",
    description:
      "Intuitive mobile interfaces designed around touch interactions, user habits and smaller screens.",
  },
  {
    icon: LayoutDashboard,
    number: "03",
    title: "Dashboard Design",
    description:
      "Clean dashboards that simplify complex data, workflows and administrative operations.",
  },
  {
    icon: AppWindow,
    number: "04",
    title: "SaaS Product Design",
    description:
      "Scalable interfaces for software products with multiple features, roles and user journeys.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "MVP and Prototype Design",
    description:
      "Focused product designs created to validate an idea and present it to users or investors.",
  },
  {
    icon: Paintbrush,
    number: "06",
    title: "Product Redesign",
    description:
      "Modernization of existing products to improve usability, visual quality and user engagement.",
  },
];

const designProcess = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We understand the product idea, target users, business requirements and project goals.",
  },
  {
    icon: Users,
    number: "02",
    title: "Research",
    description:
      "We study user expectations, competitor experiences and important product opportunities.",
  },
  {
    icon: Workflow,
    number: "03",
    title: "Structure",
    description:
      "We create user flows, information architecture and logical screen relationships.",
  },
  {
    icon: Layers3,
    number: "04",
    title: "Wireframe",
    description:
      "We define page structures, content placement and core interaction patterns.",
  },
  {
    icon: Palette,
    number: "05",
    title: "Design",
    description:
      "We create responsive, branded and visually consistent high-fidelity interfaces.",
  },
  {
    icon: MousePointerClick,
    number: "06",
    title: "Prototype and Validate",
    description:
      "We connect screens, test the journey and prepare the design for development.",
  },
];

const designDeliverables = [
  {
    icon: Search,
    title: "Research and Strategy",
    items: [
      "Product discovery",
      "Competitor analysis",
      "User personas",
      "Journey mapping",
      "Design strategy",
    ],
  },
  {
    icon: Layers3,
    title: "UX Architecture",
    items: [
      "Information architecture",
      "User flows",
      "Wireframes",
      "Content hierarchy",
      "Feature mapping",
    ],
  },
  {
    icon: Palette,
    title: "Visual Design",
    items: [
      "Responsive layouts",
      "Typography system",
      "Color system",
      "Component design",
      "Visual guidelines",
    ],
  },
  {
    icon: MousePointerClick,
    title: "Prototype and Handoff",
    items: [
      "Clickable prototypes",
      "Interaction states",
      "Developer specifications",
      "Design assets",
      "Component library",
    ],
  },
];

const principles = [
  {
    icon: Target,
    title: "Purposeful Design",
    description:
      "Every visual and interaction decision should support a clear user or business objective.",
  },
  {
    icon: Eye,
    title: "Simple and Clear",
    description:
      "We reduce unnecessary complexity and make important information easier to understand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive by Default",
    description:
      "Interfaces are planned for different screen sizes from the beginning of the project.",
  },
  {
    icon: Shapes,
    title: "Consistent Experience",
    description:
      "Reusable patterns and components create a unified experience across the complete product.",
  },
];

const benefits = [
  "User-focused product decisions",
  "Clear and intuitive navigation",
  "Responsive design for every screen",
  "Consistent visual identity",
  "Clickable prototypes before development",
  "Reusable design systems and components",
  "Better collaboration with developers",
  "Design prepared for future growth",
];

const faqs = [
  {
    question: "What is included in UI/UX design services?",
    answer:
      "The exact scope depends on the project. It can include product discovery, user research, information architecture, user flows, wireframes, visual interface design, responsive layouts, prototypes, design systems and developer handoff.",
  },
  {
    question: "What is the difference between UI and UX design?",
    answer:
      "UX design focuses on how the product works, how information is organized and how users complete tasks. UI design focuses on the visual appearance of screens, including colors, typography, components, spacing and interaction states.",
  },
  {
    question: "Can you redesign an existing website or application?",
    answer:
      "Yes. We can review the current product, identify usability and visual problems and create an improved experience while retaining important business functionality.",
  },
  {
    question: "Will the design be responsive?",
    answer:
      "Yes. Website and web-application interfaces are designed for mobile, tablet and desktop screens. Mobile applications are also planned for different device sizes and operating-system requirements.",
  },
  {
    question: "Do you provide the design files to developers?",
    answer:
      "Yes. The final handoff can include design screens, reusable components, responsive behavior, interaction states, assets and relevant specifications required for development.",
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

  const layoutClassName =
    display === "block"
      ? "grid w-fit max-w-full"
      : "inline-grid max-w-full";

  const whitespaceClassName = nowrap
    ? "whitespace-normal sm:whitespace-nowrap"
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

function DeliverableCard({
  icon: Icon,
  title,
  items,
}: {
  icon: ElementType;
  title: string;
  items: string[];
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

export default function UIUXDesignPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <>
      <main className="w-full overflow-x-clip bg-white font-sans text-[#07112f] antialiased">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff2f7d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#743cff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid w-full max-w-[1320px] min-w-0 items-center gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            {/* LEFT CONTENT */}
            <div className="relative z-20 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <PenTool size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="UI/UX Design Services"
                  speed={85}
                  delay={100}
                  className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[720px] overflow-visible text-[36px] font-bold leading-[1.09] tracking-[-0.05em] text-[#081232] sm:mt-7 sm:text-[52px] lg:text-[66px]">
                Digital Experiences
                <span className="mt-2 block overflow-visible pr-[0.18em]">
                  Designed Around{" "}
                  <TypewriterText
                    text="People"
                    speed={130}
                    delay={300}
                    nowrap
                    className="overflow-visible pb-[0.06em] pr-[0.14em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[610px] text-[16px] font-medium leading-7 text-[#27314f]/90 sm:mt-7 sm:text-[17px] sm:leading-[1.8]">
                We design intuitive websites, mobile applications and digital
                products that are easy to understand, visually engaging and
                aligned with real business goals.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Start Your Design Project

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

              <div className="mt-8 grid w-full max-w-[620px] auto-rows-fr grid-cols-2 gap-3 sm:mt-10 xl:grid-cols-[repeat(4,minmax(0,1fr))] xl:gap-2 2xl:gap-3">
                {[
                  {
                    icon: Users,
                    title: "User Focused",
                  },
                  {
                    icon: Eye,
                    title: "Easy to Use",
                  },
                  {
                    icon: MonitorSmartphone,
                    title: "Responsive",
                  },
                  {
                    icon: Sparkles,
                    title: "Modern",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex h-full w-full min-w-0 overflow-hidden rounded-[15px] border border-[#e7e2f5] bg-white/85 px-3 py-3.5 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:rounded-[16px] sm:px-4 sm:py-4 xl:items-center xl:gap-1.5 xl:px-2 xl:py-3 2xl:gap-2.5 2xl:px-3 2xl:py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff] xl:h-7 xl:w-7 xl:rounded-[10px] 2xl:h-9 2xl:w-9 2xl:rounded-[12px]">
                        <Icon size={17} className="xl:h-[14px] xl:w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
                      </div>

                      <span className="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere] text-[12px] font-bold leading-5 text-[#24304f] xl:text-[10px] xl:leading-[1.25] 2xl:text-[12px] 2xl:leading-5">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative min-h-[390px] min-w-0 sm:min-h-[470px] lg:min-h-[540px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.14),transparent_67%)] sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]" />

              <Image
                src="/images/home/knowledge.webp"
                alt="UI and UX design services"
                width={700}
                height={650}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 h-auto w-[92%] max-w-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)] sm:w-[84%] xl:max-w-[580px]"
              />

              <div className="absolute left-[0%] top-[8%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#7b5cff] text-white">
                    <Search size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      User Research
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Understand real needs
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute right-[0%] top-[18%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff2f7d] to-[#ff7ca8] text-white">
                    <Palette size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Visual Design
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Modern and consistent
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-[3%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00b8ff] to-[#4b22ff] text-white">
                    <MousePointerClick size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Prototyping
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Test before development
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[2%] right-[1%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#743cff] to-[#ff2f7d] text-white">
                    <Layers3 size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Design System
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Ready to scale
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

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Design That Solves Problems"
                  speed={82}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[600px] text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                Beautiful Interfaces With
                <TypewriterText
                  text="Clear Business Purpose"
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-6 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Effective design is not only about making a product look
                attractive. It should help users understand information,
                complete tasks and confidently interact with the product.
              </p>

              <p className="mt-5 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                We combine user research, product strategy, interface design and
                prototyping to create experiences that support both users and
                business objectives.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
              >
                Discuss Your Design Project

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group min-w-0 rounded-[21px] border border-[#e4dff0] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
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

        {/* DESIGN SOLUTIONS */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[790px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="What We Design"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                User Experiences for Every{" "}
                <TypewriterText
                  text="Digital Product"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                We design complete user experiences for websites, mobile
                applications, business software and new digital-product ideas.
              </p>
            </div>

            <div className="mt-12 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {designSolutions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative min-w-0 overflow-hidden rounded-[21px] border border-[#e4dff1] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
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
                      Discuss This Design

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

        {/* DESIGN PRINCIPLES */}
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Design Principles"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[580px] text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                Experiences That Feel
                <TypewriterText
                  text="Natural and Consistent"
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-6 max-w-[590px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Our design decisions are guided by usability, clarity and
                consistency. This helps create products that users can
                understand without unnecessary effort.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1 sm:mt-8 sm:w-auto sm:px-7"
              >
                Improve Your Product Experience

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="group min-w-0 rounded-[22px] border border-[#e3deef] bg-white p-6 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
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
                      {principle.title}
                    </h3>

                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#27314f]/84">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[21px] bg-[#041033] px-5 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[24px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[790px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#d75cff]">
                <TypewriterText
                  text="Design Deliverables"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#d75cff]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em]">
                {/* Mobile: controlled, balanced line breaks */}
                <span className="block text-[26px] leading-[1.16] sm:hidden">
                  Everything Required
                </span>

                <span className="mt-1 block text-[26px] leading-[1.16] sm:hidden">
                  to Turn{" "}
                  <TypewriterText
                    text="Ideas Into"
                    speed={105}
                    delay={220}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                <span className="mt-1 flex justify-center text-[26px] leading-[1.16] sm:hidden">
                  <TypewriterText
                    text="Clear Interfaces"
                    speed={105}
                    delay={1050}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[38px] leading-[1.16] sm:block lg:text-[44px]">
                  Everything Required to Turn
                </span>

                <span className="mt-2 hidden justify-center text-[38px] leading-[1.16] sm:flex lg:text-[44px]">
                  <TypewriterText
                    text="Ideas Into Clear Interfaces"
                    speed={105}
                    delay={220}
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[16px] font-medium leading-7 text-white/82">
                Our design process produces clear deliverables that help
                stakeholders review the product and developers build it
                accurately.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {designDeliverables.map((item) => (
                <DeliverableCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Design Process"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                From Product Idea to{" "}
                <TypewriterText
                  text="Development-Ready Design"
                  speed={105}
                  delay={220}
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[16px] font-medium leading-7 text-[#27314f]/86">
                A structured process keeps design decisions connected to user
                requirements and the goals of the business.
              </p>
            </div>

            <div className="mt-14 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {designProcess.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative min-w-0 rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
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

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
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

              <h2 className="mt-4 max-w-[590px] text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                UI/UX Design Connected to{" "}
                <TypewriterText
                  text="Real Product Development"
                  speed={105}
                  delay={220}
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mt-6 max-w-[600px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Our designers and developers work with a shared understanding of
                the product. This helps us create interfaces that are visually
                strong, technically practical and easier to implement.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Work With Our Design Team

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="group flex min-h-[96px] min-w-0 items-center gap-4 rounded-[19px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
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
          <div className="mx-auto grid max-w-[1180px] gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Frequently Asked Questions"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                Questions About
                <TypewriterText
                  text="UI/UX Design"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-5 max-w-[410px] text-[15px] font-medium leading-7 text-[#27314f]/86">
                Some common questions businesses ask before starting a UI/UX
                design or product-redesign project.
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
                  className="group min-w-0 rounded-[18px] border border-[#e4dff1] bg-white p-4 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] open:shadow-[0_16px_38px_rgba(75,34,255,0.08)] sm:rounded-[20px] sm:p-5"
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
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[26px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff7ca8]">
                  <TypewriterText
                    text="Design a Better Product"
                    speed={85}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[720px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                  Ready to Create an Experience Your Users Will Enjoy?
                </h2>

                <p className="mt-3 max-w-[650px] text-[15px] font-medium leading-7 text-white/84">
                  Share your product idea or existing design challenges with our
                  team and receive a practical UI/UX design approach.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Start Your Design Project

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
    </>
  );
}