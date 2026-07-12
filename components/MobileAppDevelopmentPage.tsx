"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  
  Apple,
  ArrowRight,
  BarChart3,
  BellRing,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Fingerprint,
  Gauge,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  MonitorSmartphone,
  Paintbrush,
  RefreshCcw,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const capabilities = [
  {
    icon: Smartphone,
    title: "Native App Development",
    description:
      "High-performance mobile applications designed specifically for iOS and Android platforms.",
    gradient: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: RefreshCcw,
    title: "Cross-Platform Apps",
    description:
      "One efficient codebase that delivers consistent experiences across multiple devices.",
    gradient: "from-[#ff315d] to-[#ff72a3]",
  },
  {
    icon: Paintbrush,
    title: "Mobile UI/UX Design",
    description:
      "Simple, engaging and user-friendly interfaces designed around mobile behavior.",
    gradient: "from-[#8b3dff] to-[#ff315d]",
  },
  {
    icon: Cloud,
    title: "Backend and API Integration",
    description:
      "Secure backend systems, databases and APIs that keep your application connected.",
    gradient: "from-[#00aef0] to-[#4b22ff]",
  },
  {
    icon: ShieldCheck,
    title: "Security and Performance",
    description:
      "Reliable architecture focused on application security, speed and stability.",
    gradient: "from-[#4b22ff] to-[#00aef0]",
  },
  {
    icon: Wrench,
    title: "Support and Maintenance",
    description:
      "Continuous monitoring, updates, improvements and operating-system compatibility.",
    gradient: "from-[#ff315d] to-[#8b3dff]",
  },
];

const appSolutions = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "E-Commerce Applications",
    description:
      "Mobile shopping experiences with product discovery, secure payments and order management.",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    title: "Business Applications",
    description:
      "Custom mobile solutions for employees, customers, vendors and internal operations.",
  },
  {
    icon: Users,
    number: "03",
    title: "On-Demand Applications",
    description:
      "Applications for bookings, deliveries, services, appointments and real-time requests.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Fintech Applications",
    description:
      "Secure financial applications with payments, transactions, reporting and user verification.",
  },
  {
    icon: Brain,
    number: "05",
    title: "AI-Powered Applications",
    description:
      "Mobile products enhanced with intelligent automation, recommendations and analytics.",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Startup MVP Applications",
    description:
      "Focused mobile products built to validate an idea, attract users and reach the market faster.",
  },
];

const process = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description:
      "We understand your users, business model, application goals and required features.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Planning",
    description:
      "We define user journeys, application architecture, timeline and technology stack.",
  },
  {
    icon: Paintbrush,
    number: "03",
    title: "UI/UX Design",
    description:
      "We design intuitive screens, interactions and prototypes for the complete user journey.",
  },
  {
    icon: Code2,
    number: "04",
    title: "Development",
    description:
      "Our team develops the mobile application, backend, database and required integrations.",
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Testing",
    description:
      "We test functionality, usability, security, speed and compatibility across devices.",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Launch and Support",
    description:
      "We assist with store deployment and continue supporting future versions and improvements.",
  },
];

const mobileFeatures = [
  {
    icon: BellRing,
    title: "Push Notifications",
  },
  {
    icon: Fingerprint,
    title: "Secure Authentication",
  },
  {
    icon: CreditCard,
    title: "Payment Integration",
  },
  {
    icon: Cloud,
    title: "Cloud Synchronization",
  },
  {
    icon: BarChart3,
    title: "Analytics and Reports",
  },
  {
    icon: MessageSquareText,
    title: "Chat and Messaging",
  },
  {
    icon: RefreshCcw,
    title: "Real-Time Updates",
  },
  {
    icon: LockKeyhole,
    title: "Data Protection",
  },
];

const technologies = [
  {
    icon: Apple,
    title: "iOS Development",
    items: ["Swift", "SwiftUI", "Xcode", "Apple SDK", "App Store"],
  },
  {
    icon: TabletSmartphone,
    title: "Android Development",
    items: ["Kotlin", "Java", "Android Studio", "Jetpack", "Google Play"],
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-Platform",
    items: ["React Native", "Flutter", "TypeScript", "Expo", "Dart"],
  },
  {
    icon: Server,
    title: "Backend and Cloud",
    items: ["Node.js", "Python", "REST APIs", "Firebase", "AWS", "PostgreSQL"],
  },
];

const benefits = [
  "Mobile-first product strategy",
  "User-friendly application design",
  "Secure and scalable architecture",
  "Fast and responsive application performance",
  "iOS and Android platform support",
  "API and third-party integrations",
  "Application-store deployment assistance",
  "Ongoing maintenance and feature development",
];

const faqs = [
  {
    question: "Should I build a native or cross-platform mobile application?",
    answer:
      "The right approach depends on application complexity, performance requirements, timeline, budget and required device features. We evaluate your requirements before recommending native iOS and Android development or a cross-platform solution.",
  },
  {
    question: "How long does mobile application development take?",
    answer:
      "A focused MVP may take a few months, while a complex application with multiple user roles, integrations and administrative systems may require a longer timeline. The final estimate is prepared after discovery and feature planning.",
  },
  {
    question: "Will you develop the backend and admin panel?",
    answer:
      "Yes. We can develop the complete solution, including mobile applications, backend APIs, database, cloud infrastructure and web-based administrative panels.",
  },
  {
    question: "Can you publish the application on app stores?",
    answer:
      "Yes. We can assist with application preparation, store guidelines, builds, testing and submission to the Apple App Store and Google Play Store.",
  },
  {
    question: "Do you provide support after the application is launched?",
    answer:
      "Yes. We provide maintenance, operating-system compatibility updates, performance monitoring, bug fixes, security improvements and new-feature development.",
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

function TechnologyCard({
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_25px_rgba(75,34,255,0.24)]">
          <Icon size={22} />
        </div>

        <h3 className="text-[17px] font-bold text-white">{title}</h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-[11px] font-semibold text-white/68"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MobileAppDevelopmentPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <>
      <main className="overflow-hidden bg-white text-[#07112f] antialiased">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-12 sm:px-6 sm:pb-18 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff315d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#673aff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-9 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            {/* LEFT CONTENT */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Smartphone size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="Mobile App Development"
                  speed={85}
                  delay={100}
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[670px] text-[36px] font-bold leading-[1.09] tracking-[-0.05em] text-[#081232] sm:mt-7 sm:text-[52px] lg:text-[66px]">
                Mobile Experiences
                <span className="mt-2 block">
                  Users Love to{" "}
                  <TypewriterText
                    text="Use"
                    speed={135}
                    delay={300}
                    nowrap
                    className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff315d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[600px] text-[14px] font-medium leading-7 text-[#34405f]/72 sm:mt-7 sm:text-[16px] sm:leading-8">
                We design and develop secure, scalable and engaging mobile
                applications that connect businesses with their customers and
                simplify everyday digital interactions.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-6 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Start Your App Project

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio"
                  className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto sm:px-7"
                >
                  View Our Work

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8 grid max-w-[620px] grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
                {[
                  {
                    icon: Apple,
                    title: "iOS Apps",
                  },
                  {
                    icon: TabletSmartphone,
                    title: "Android Apps",
                  },
                  {
                    icon: RefreshCcw,
                    title: "Cross-Platform",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex min-w-0 items-center gap-2.5 rounded-[15px] border border-[#e7e2f5] bg-white/85 px-3 py-3.5 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:gap-3 sm:rounded-[16px] sm:px-4 sm:py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff]">
                        <Icon size={17} />
                      </div>

                      <span className="min-w-0 text-[10px] font-bold leading-4 text-[#24304f] sm:text-[11px]">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative min-h-[390px] sm:min-h-[470px] lg:min-h-[540px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.14),transparent_67%)] sm:h-[330px] sm:w-[330px] lg:h-[380px] lg:w-[380px]" />

              <Image
                src="/images/home/mobile.png"
                alt="Mobile app development services"
                width={700}
                height={650}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)] sm:w-[82%]"
              />

              <div className="absolute left-[0%] top-[8%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#7b5cff] text-white">
                    <Gauge size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Smooth Performance
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Fast and responsive
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute right-[0%] top-[18%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff315d] to-[#ff72a3] text-white">
                    <Paintbrush size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Intuitive Design
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Easy to understand
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-[3%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00aef0] to-[#4b22ff] text-white">
                    Cloud
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Cloud Connected
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Reliable synchronization
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[2%] right-[1%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#8b3dff] to-[#ff315d] text-white">
                    <Rocket size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Ready to Scale
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Built for growth
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
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="Your Mobile Technology Partner"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[600px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                From an App Idea to a
                <TypewriterText
                  text="Complete Digital Product"
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mt-6 max-w-[600px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                A successful mobile application requires more than attractive
                screens. It needs a clear product strategy, smooth interactions,
                reliable technology and a strong understanding of its users.
              </p>

              <p className="mt-5 max-w-[600px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                We support the complete mobile-product journey, including
                discovery, UI/UX design, application development, backend
                systems, testing, deployment and continuous improvement.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
              >
                Discuss Your App Idea

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
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

                    <p className="mt-2 text-[12px] font-medium leading-6 text-[#34405f]/62">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* APP SOLUTIONS */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                <TypewriterText
                  text="Mobile Solutions"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff315d]"
                />
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Applications Designed Around{" "}
                <TypewriterText
                  text="Real User Needs"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                We develop mobile products for different industries, business
                models and customer experiences.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {appSolutions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative overflow-hidden rounded-[21px] border border-[#e4dff1] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4b22ff]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#ff315d]/8" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        <Icon size={25} />
                      </div>

                      <span className="text-[26px] font-black text-[#eeeaff]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="relative mt-6 text-[19px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="relative mt-3 text-[13px] font-medium leading-7 text-[#34405f]/62">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={openConsultation}
                      className="group/link relative mt-6 inline-flex cursor-pointer items-center gap-2 text-[12px] font-bold text-[#4b22ff]"
                    >
                      Discuss This App

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

        {/* MOBILE FEATURES */}
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="Application Features"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[650px] text-[30px] font-bold leading-[1.14] tracking-[-0.04em] text-[#081232] sm:text-[38px] lg:text-[40px] xl:text-[44px]">
                <span className="block">Everything Your</span>
                <span className="block whitespace-nowrap">Mobile Product</span>
                <TypewriterText
                  text="Needs to Perform"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mt-6 max-w-[590px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                We integrate features according to your users, business
                processes and application goals. Every feature is planned to
                remain secure, simple and easy to maintain.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-6 text-[12px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1 sm:mt-8 sm:w-auto sm:px-7"
              >
                Plan Your App Features

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {mobileFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group flex min-h-[100px] items-center gap-4 rounded-[20px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#f0ecff] text-[#4b22ff] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                      <Icon size={21} />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#ff315d]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-1 text-[13px] font-bold text-[#24304f]">
                        {feature.title}
                      </p>
                    </div>
                  </div>
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

            <div className="relative z-10 mx-auto max-w-[790px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                <TypewriterText
                  text="Mobile Technology Stack"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#d96bff]"
                />
              </p>

              <h2 className="mt-4 text-[27px] font-bold leading-[1.16] tracking-[-0.04em] sm:text-[38px] lg:text-[44px]">
                <span className="block sm:inline">Modern Technologies</span>
                <span className="hidden sm:inline"> for</span>

                <span className="mt-1 block sm:hidden">
                  for{" "}
                  <TypewriterText
                    text="Powerful Mobile"
                    speed={105}
                    delay={220}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                <span className="mt-1 block sm:hidden">
                  <TypewriterText
                    text="Applications"
                    speed={105}
                    delay={220}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                <span className="mt-2 hidden sm:block">
                  <TypewriterText
                    text="Powerful Mobile Applications"
                    speed={105}
                    delay={220}
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-medium leading-7 text-white/62">
                We select the application architecture and technologies
                according to platform requirements, performance, timeline and
                expected scale.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {technologies.map((technology) => (
                <TechnologyCard key={technology.title} {...technology} />
              ))}
            </div>
          </div>
        </section>

        {/* DEVELOPMENT PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Development Process"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                From Product Concept to{" "}
                <TypewriterText
                  text="App Store Launch"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[670px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                Our structured mobile-development process keeps every stage
                aligned with user expectations and business requirements.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <Icon size={27} />
                      </div>

                      <span className="text-[28px] font-black text-[#eeeaff]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[19px] font-bold text-[#081232]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[13px] font-medium leading-7 text-[#34405f]/62">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE MITOMS */}
        <section className="relative bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-[#ff315d]/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                <TypewriterText
                  text="Why Choose MITOMS"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff315d]"
                />
              </p>

              <h2 className="mt-4 max-w-[580px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Mobile Applications Built for{" "}
                <TypewriterText
                  text="Long-Term Growth"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mt-6 max-w-[590px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                We combine product thinking, user-focused design and reliable
                engineering to create mobile applications that remain valuable
                beyond the initial launch.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Work With Our Team

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
                  className="group flex min-h-[96px] items-center gap-4 rounded-[19px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex items-start gap-2">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#ff315d]"
                    />

                    <p className="text-[12px] font-bold leading-6 text-[#24304f]/82">
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
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="Frequently Asked Questions"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[34px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[42px]">
                Questions About
                <TypewriterText
                  text="Mobile Development"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mt-5 max-w-[410px] text-[13px] font-medium leading-7 text-[#34405f]/65">
                Some common questions businesses ask before starting a mobile
                application project.
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

                  <p className="mt-4 border-t border-[#ebe7f4] pt-4 text-[13px] font-medium leading-7 text-[#34405f]/65 sm:ml-[52px]">
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
                  <TypewriterText
                    text="Build Your Mobile Product"
                    speed={85}
                    delay={100}
                    cursorClassName="bg-[#ff84b8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[720px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                  Ready to Transform Your App Idea Into a Real Product?
                </h2>

                <p className="mt-3 max-w-[650px] text-[13px] font-medium leading-7 text-white/65">
                  Share your requirements with our team and receive a practical
                  roadmap for your iOS, Android or cross-platform application.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Start Your App Project

                <ArrowRight
                  size={18}
                  className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
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