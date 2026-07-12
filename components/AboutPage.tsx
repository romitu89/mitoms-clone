"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  Globe2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

type Stat = {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
};

type ValueCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

type ProcessStep = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const stats: Stat[] = [
  {
    icon: Star,
    target: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: Briefcase,
    target: 500,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    target: 250,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    icon: Globe2,
    target: 25,
    suffix: "+",
    label: "Countries Served",
  },
];

const values: ValueCard[] = [
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    description:
      "We work as an extension of your team, taking ownership of outcomes instead of simply completing tasks.",
    gradient: "from-[#4B22FF] to-[#7B5CFF]",
  },
  {
    icon: Lightbulb,
    title: "Purposeful Innovation",
    description:
      "We use technology to solve real business challenges, improve experiences and create measurable value.",
    gradient: "from-[#FF315D] to-[#FF74A0]",
  },
  {
    icon: ShieldCheck,
    title: "Quality and Trust",
    description:
      "Clear communication, responsible delivery and dependable engineering guide every project we undertake.",
    gradient: "from-[#00AEEF] to-[#4B22FF]",
  },
  {
    icon: Rocket,
    title: "Growth Mindset",
    description:
      "We design solutions that can evolve with your users, operations and long-term business ambitions.",
    gradient: "from-[#8B3DFF] to-[#FF3B9D]",
  },
];

const capabilities = [
  {
    icon: Compass,
    title: "Business Strategy",
    description:
      "We connect product decisions with business goals, user needs and practical delivery priorities.",
  },
  {
    icon: Palette,
    title: "Experience Design",
    description:
      "We create clear, responsive and memorable digital experiences that people enjoy using.",
  },
  {
    icon: Code2,
    title: "Product Engineering",
    description:
      "We build secure, maintainable and scalable applications using suitable modern technologies.",
  },
  {
    icon: Workflow,
    title: "Continuous Improvement",
    description:
      "We monitor, learn and improve products after launch so they remain useful as requirements evolve.",
  },
];

const process: ProcessStep[] = [
  {
    icon: Search,
    number: "01",
    title: "Understand",
    description:
      "We begin by understanding the business, users, challenges and desired outcomes.",
  },
  {
    icon: Target,
    number: "02",
    title: "Align",
    description:
      "We define priorities, scope, success measures and a realistic delivery roadmap.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Create",
    description:
      "Design and engineering teams work together to build a thoughtful digital solution.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch and Grow",
    description:
      "We support launch, measure performance and improve the product as the business grows.",
  },
];

const reasons = [
  "Business-focused recommendations",
  "Transparent project communication",
  "Design and engineering under one team",
  "Scalable and maintainable solutions",
  "Responsive support throughout delivery",
  "Long-term product partnership",
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
        threshold: 0.22,
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

  return (
    <span
      ref={elementRef}
      aria-label={text}
      className={`${display === "block" ? "block" : "inline"} ${
        nowrap ? "whitespace-nowrap" : ""
      } ${className}`}
    >
      <span aria-hidden="true">
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

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1700,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) {
      return;
    }

    let animationFrameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;
        observer.disconnect();

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduceMotion) {
          setCount(target);
          return;
        }

        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCount(Math.round(target * easedProgress));

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        animationFrameId = requestAnimationFrame(animate);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, target]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  gradient,
}: ValueCard) {
  return (
    <article className="group rounded-[24px] border border-[#e5e0f1] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#cec4ff] hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)]">
      <div
        className={`flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-gradient-to-br ${gradient} text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
      >
        <Icon size={24} />
      </div>

      <h3 className="mt-6 text-[19px] font-bold text-[#081232]">
        {title}
      </h3>

      <p className="mt-3 text-[13px] font-medium leading-7 text-[#34405f]/65">
        {description}
      </p>
    </article>
  );
}

export default function AboutPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <>
      <main className="overflow-hidden bg-white text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#4b22ff]/10 blur-[135px]" />

          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#ff315d]/10 blur-[135px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Sparkles size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="About MITOMS"
                  speed={90}
                  delay={100}
                  nowrap
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[760px] overflow-visible text-[36px] font-bold leading-[1.09] tracking-[-0.05em] text-[#081232] sm:mt-7 sm:text-[52px] lg:text-[66px]">
                Building Technology
                <span className="mt-2 block overflow-visible pr-[0.18em]">
                  With{" "}
                  <TypewriterText
                    text="Purpose and Impact"
                    speed={115}
                    delay={260}
                    className="overflow-visible pb-[0.06em] pr-[0.14em] tracking-[-0.012em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff315d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[640px] text-[14px] font-medium leading-7 text-[#34405f]/72 sm:mt-7 sm:text-[16px] sm:leading-8">
                MITOMS Technologies helps businesses transform ideas into
                practical digital products through strategy, design,
                engineering and long-term collaboration.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-6 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Work With Our Team

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio"
                  className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto sm:px-7"
                >
                  Explore Our Work

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative min-h-[430px] sm:min-h-[520px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cec4ff] sm:h-[440px] sm:w-[440px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.16),transparent_68%)] sm:h-[350px] sm:w-[350px]" />

              <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/70 bg-white p-3 shadow-[0_35px_80px_rgba(38,25,104,0.20)] sm:w-[88%] sm:rounded-[30px] sm:p-4">
                <div className="relative min-h-[350px] overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#061330_0%,#1d1059_52%,#8a1c78_115%)] p-5 text-white sm:min-h-[390px] sm:rounded-[24px] sm:p-9">
                  <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#1685ff]/25 blur-[90px]" />

                  <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="relative z-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff83b7]">
                      <TypewriterText
                        text="Ideas. People. Technology."
                        speed={85}
                        delay={120}
                        cursorClassName="bg-[#ff83b7]"
                      />
                    </p>

                    <h2 className="mt-4 max-w-[410px] text-[27px] font-bold leading-[1.17] tracking-[-0.04em] sm:mt-5 sm:text-[38px]">
                      One Team Focused on Building Meaningful Digital Products
                    </h2>

                    <p className="mt-4 max-w-[420px] text-[12px] font-medium leading-6 text-white/65 sm:mt-6 sm:text-[13px] sm:leading-7">
                      We bring business understanding, thoughtful design and
                      dependable engineering together in one collaborative
                      delivery process.
                    </p>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-3 gap-2 sm:bottom-7 sm:left-7 sm:right-7 sm:gap-3">
                    {[
                      {
                        icon: Compass,
                        label: "Strategy",
                      },
                      {
                        icon: Palette,
                        label: "Design",
                      },
                      {
                        icon: Code2,
                        label: "Engineering",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-[13px] border border-white/10 bg-white/[0.08] p-2 text-center backdrop-blur sm:rounded-[15px] sm:p-3"
                        >
                          <Icon
                            size={18}
                            className="mx-auto text-[#ff84b8]"
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

              <div className="absolute left-[0%] top-[6%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                  <TypewriterText
                    text="Our Focus"
                    speed={80}
                    delay={100}
                    nowrap
                    cursorClassName="bg-[#ff315d]"
                  />
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Business Outcomes
                </p>
              </div>

              <div className="absolute bottom-[5%] right-[-1%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4b22ff]">
                  <TypewriterText
                    text="Our Approach"
                    speed={80}
                    delay={100}
                    nowrap
                    cursorClassName="bg-[#4b22ff]"
                  />
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Partnership First
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ANIMATED STATS */}
        <section className="relative z-20 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1320px] -translate-y-1 rounded-[26px] border border-[#e4dff0] bg-white p-4 shadow-[0_22px_60px_rgba(35,25,88,0.10)] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="group flex min-h-[118px] items-center gap-4 rounded-[20px] border border-[#ebe7f4] bg-[#fbfaff] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:bg-white hover:shadow-[0_14px_34px_rgba(75,34,255,0.09)]"
                  >
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[17px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                      <Icon size={23} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[31px] font-black leading-none tracking-[-0.04em] text-[#4b22ff]">
                        <AnimatedCounter
                          target={item.target}
                          suffix={item.suffix}
                        />
                      </h3>

                      <p className="mt-2 text-[11px] font-bold leading-5 text-[#34405f]/65">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="relative px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            {/* Visual */}
            <div className="relative pb-6">
              {/* Back card */}
              <div className="relative min-h-[390px] w-full overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#07112f_0%,#20105c_55%,#7d1d72_100%)] shadow-[0_30px_70px_rgba(15,12,57,0.20)] sm:min-h-[430px] sm:w-[92%] sm:rounded-[30px]">
                <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#1685ff]/25 blur-[90px]" />

                <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

                <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

                <svg
                  className="pointer-events-none absolute bottom-0 left-0 h-[190px] w-full opacity-60"
                  viewBox="0 0 650 200"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="storyLine"
                      x1="0"
                      y1="0"
                      x2="650"
                      y2="0"
                    >
                      <stop stopColor="#20b8ff" />
                      <stop offset="0.5" stopColor="#7746ff" />
                      <stop offset="1" stopColor="#ff315d" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M-30 170C80 80 170 210 285 125C390 48 485 175 690 38"
                    stroke="url(#storyLine)"
                    strokeWidth="2.2"
                  />

                  <path
                    d="M-20 195C100 115 195 235 315 158C430 84 520 205 680 85"
                    stroke="white"
                    strokeOpacity="0.14"
                    strokeWidth="1.2"
                    strokeDasharray="5 8"
                  />
                </svg>

                <div className="relative z-10 flex min-h-[390px] flex-col p-5 text-white sm:min-h-[430px] sm:p-10">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff83b7]">
                      <TypewriterText
                        text="Our Foundation"
                        speed={90}
                        delay={120}
                        nowrap
                        cursorClassName="bg-[#ff83b7]"
                      />
                    </p>

                    <h3 className="mt-4 max-w-[410px] text-[28px] font-bold leading-[1.17] tracking-[-0.035em] sm:mt-5 sm:text-[38px]">
                      Technology Should Make Business Better
                    </h3>
                  </div>

                  <p className="mt-6 max-w-[420px] pr-0 text-[12px] font-medium leading-6 text-white/65 sm:mt-8 sm:pr-6 sm:text-[13px] sm:leading-7">
                    We believe technology becomes valuable when it simplifies
                    work, creates better experiences and helps people achieve
                    more.
                  </p>
                </div>
              </div>

              {/* Front quote card */}
              <div className="relative z-20 -mt-12 ml-auto w-[94%] rounded-[21px] border border-[#e4dff2] bg-white p-5 shadow-[0_25px_60px_rgba(32,22,92,0.15)] sm:-mt-16 sm:w-[78%] sm:rounded-[25px] sm:p-7">
                <MessageSquareText
                  size={30}
                  className="text-[#4b22ff]"
                />

                <p className="mt-4 text-[14px] font-bold leading-6 text-[#081232] sm:text-[19px] sm:leading-7">
                  “We treat every client&apos;s vision with the same care,
                  responsibility and commitment as our own.”
                </p>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                  <TypewriterText
                    text="The MITOMS Approach"
                    speed={85}
                    delay={120}
                    cursorClassName="bg-[#ff315d]"
                  />
                </p>
              </div>
            </div>

            {/* Story copy */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="Our Story"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[650px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                A Technology Partner Built Around{" "}
                <TypewriterText
                  text="Collaboration and Trust"
                  speed={110}
                  delay={220}
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mt-6 max-w-[630px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                MITOMS was created with a simple belief: businesses deserve a
                technology partner that listens carefully, communicates
                clearly and takes responsibility for the complete outcome.
              </p>

              <p className="mt-5 max-w-[630px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                Our multidisciplinary team combines strategy, user experience,
                software development, cloud and emerging technologies to build
                solutions that are both attractive and practical.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Award,
                    title: "Committed to Quality",
                    text: "Thoughtful decisions and dependable execution at every stage.",
                  },
                  {
                    icon: Users,
                    title: "Built for Partnership",
                    text: "Open communication and shared ownership throughout delivery.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[18px] border border-[#e4dff0] bg-[#fbfaff] p-5"
                    >
                      <Icon size={22} className="text-[#4b22ff]" />

                      <h3 className="mt-4 text-[15px] font-bold text-[#081232]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[11px] font-medium leading-6 text-[#34405f]/62">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                <TypewriterText
                  text="Our Values"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff315d]"
                />
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Principles That Guide{" "}
                <TypewriterText
                  text="Every Project"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                Our values influence how we communicate, make decisions,
                manage challenges and build long-term relationships.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item) => (
                <ValueCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="What We Bring Together"
                  speed={85}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[590px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Different Disciplines.
                <TypewriterText
                  text="One Unified Product Team."
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mt-6 max-w-[570px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                Strategy, design and engineering work together from the
                beginning. This reduces unnecessary handoffs and keeps the
                complete team aligned around the same outcome.
              </p>

              <Link
                href="/services"
                className="group mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
              >
                Explore Our Services

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
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

                    <p className="mt-3 text-[12px] font-medium leading-6 text-[#34405f]/62">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* DARK APPROACH SECTION */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[22px] bg-[#041033] px-5 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[28px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.28),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.20),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.18),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                  <TypewriterText
                    text="Why MITOMS"
                    speed={90}
                    delay={100}
                    nowrap
                    cursorClassName="bg-[#d96bff]"
                  />
                </p>

                <h2 className="mt-4 max-w-[720px] overflow-visible font-bold tracking-[-0.04em]">
                  {/* Mobile: balanced three-line layout */}
                  <span className="block text-[28px] leading-[1.16] min-[390px]:text-[30px] sm:hidden">
                    A Delivery Approach
                  </span>

                  <span className="mt-1 flex items-baseline overflow-visible text-[28px] leading-[1.16] min-[390px]:text-[30px] sm:hidden">
                    Built for{" "}
                    <TypewriterText
                      text="Clarity and"
                      speed={110}
                      delay={220}
                      nowrap
                      className="ml-2 pb-[0.04em] pr-[0.06em] text-[#ff43a1]"
                      cursorClassName="bg-[#ff43a1]"
                    />
                  </span>

                  <span className="mt-1 flex overflow-visible pb-[0.1em] text-[28px] leading-[1.16] min-[390px]:text-[30px] sm:hidden">
                    <TypewriterText
                      text="Confidence"
                      speed={110}
                      delay={1050}
                      nowrap
                      className="pb-[0.06em] pr-[0.08em] text-[#ff43a1]"
                      cursorClassName="bg-[#ff43a1]"
                    />
                  </span>

                  {/* Tablet and laptop */}
                  <span className="hidden text-[38px] leading-[1.14] sm:block lg:text-[37px] xl:text-[40px]">
                    A Delivery Approach
                  </span>

                  <span className="mt-2 hidden items-baseline whitespace-nowrap text-[38px] leading-[1.14] sm:flex lg:text-[37px] xl:text-[40px]">
                    Built for{" "}
                    <TypewriterText
                      text="Clarity and Confidence"
                      speed={110}
                      delay={220}
                      nowrap
                      className="ml-2 overflow-visible pb-[0.06em] pr-[0.08em] tracking-[-0.015em] text-[#ff43a1]"
                      cursorClassName="bg-[#ff43a1]"
                    />
                  </span>
                </h2>

                <p className="mt-6 max-w-[550px] text-[14px] font-medium leading-7 text-white/60">
                  We keep the process collaborative and transparent so your
                  team always understands what is being built, why it matters
                  and what happens next.
                </p>

                <button
                  type="button"
                  onClick={openConsultation}
                  className="group mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-white px-6 py-4 text-[12px] font-bold text-[#081232] transition-all duration-300 hover:-translate-y-1 sm:mt-8 sm:w-auto"
                >
                  Meet Our Approach

                  <ArrowRight
                    size={17}
                    className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <div
                    key={reason}
                    className="flex items-center gap-4 rounded-[19px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.085]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-[11px] font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#ff60aa]"
                      />

                      <p className="text-[12px] font-bold leading-6 text-white/75">
                        {reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                <TypewriterText
                  text="How We Work"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                A Collaborative Journey From{" "}
                <TypewriterText
                  text="Idea to Business Impact"
                  speed={110}
                  delay={220}
                  className="text-[#ff315d]"
                  cursorClassName="bg-[#ff315d]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                Each stage is designed to keep business goals, user needs and
                technical delivery connected.
              </p>
            </div>

            <div className="relative mt-14">
              <div className="pointer-events-none absolute left-[11%] right-[11%] top-[34px] hidden h-px bg-gradient-to-r from-[#4b22ff] via-[#ff315d] to-[#4b22ff] opacity-25 lg:block" />

              <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {process.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.number}
                      className="group rounded-[23px] border border-[#e3deef] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <Icon size={27} />
                        </div>

                        <span className="text-[27px] font-black text-[#eeeaff]">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-[19px] font-bold text-[#081232]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[12px] font-medium leading-6 text-[#34405f]/62">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 pb-8 sm:px-6 lg:px-10">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[28px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff84b8]">
                  <TypewriterText
                    text="Build With MITOMS"
                    speed={90}
                    delay={100}
                    nowrap
                    cursorClassName="bg-[#ff84b8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[760px] text-[31px] font-bold tracking-[-0.035em] sm:text-[40px]">
                  Looking for a Technology Partner Who Treats Your Vision Like
                  Their Own?
                </h2>

                <p className="mt-3 max-w-[690px] text-[13px] font-medium leading-7 text-white/65">
                  Tell us what you are planning and let our team help shape the
                  right path from idea to launch.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Start a Conversation

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