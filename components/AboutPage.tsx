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
        <section className="relative overflow-hidden bg-[#fbfaff] px-5 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#4b22ff]/10 blur-[135px]" />

          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#ff315d]/10 blur-[135px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Sparkles size={15} className="text-[#4b22ff]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]">
                  About MITOMS
                </span>
              </div>

              <h1 className="mt-7 max-w-[730px] text-[43px] font-bold leading-[1.06] tracking-[-0.055em] text-[#081232] sm:text-[56px] lg:text-[66px]">
                Building Technology
                <span className="mt-2 block">
                  With{" "}
                  <span className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent">
                    Purpose and Impact
                  </span>
                </span>
              </h1>

              <p className="mt-7 max-w-[640px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
                MITOMS Technologies helps businesses transform ideas into
                practical digital products through strategy, design,
                engineering and long-term collaboration.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]"
                >
                  Work With Our Team

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio"
                  className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
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
            <div className="relative min-h-[520px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cec4ff]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.16),transparent_68%)]" />

              <div className="absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] border border-white/70 bg-white p-4 shadow-[0_35px_80px_rgba(38,25,104,0.20)]">
                <div className="relative min-h-[390px] overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#061330_0%,#1d1059_52%,#8a1c78_115%)] p-7 text-white sm:p-9">
                  <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#1685ff]/25 blur-[90px]" />

                  <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="relative z-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff83b7]">
                      Ideas. People. Technology.
                    </p>

                    <h2 className="mt-5 max-w-[410px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] sm:text-[38px]">
                      One Team Focused on Building Meaningful Digital Products
                    </h2>

                    <p className="mt-6 max-w-[420px] text-[13px] font-medium leading-7 text-white/65">
                      We bring business understanding, thoughtful design and
                      dependable engineering together in one collaborative
                      delivery process.
                    </p>
                  </div>

                  <div className="absolute bottom-7 left-7 right-7 z-10 grid grid-cols-3 gap-3">
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
                          className="rounded-[15px] border border-white/10 bg-white/[0.08] p-3 text-center backdrop-blur"
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
                  Our Focus
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Business Outcomes
                </p>
              </div>

              <div className="absolute bottom-[5%] right-[-1%] z-30 hidden rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)] sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4b22ff]">
                  Our Approach
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Partnership First
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ANIMATED STATS */}
        <section className="relative z-20 px-5 sm:px-8 lg:px-10">
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
        <section className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Visual */}
            <div className="relative pb-6">
              {/* Back card */}
              <div className="relative min-h-[430px] w-[92%] overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#07112f_0%,#20105c_55%,#7d1d72_100%)] shadow-[0_30px_70px_rgba(15,12,57,0.20)]">
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

                <div className="relative z-10 flex min-h-[430px] flex-col p-8 text-white sm:p-10">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff83b7]">
                      Our Foundation
                    </p>

                    <h3 className="mt-5 max-w-[410px] text-[32px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[38px]">
                      Technology Should Make Business Better
                    </h3>
                  </div>

                  <p className="mt-8 max-w-[420px] pr-6 text-[13px] font-medium leading-7 text-white/65">
                    We believe technology becomes valuable when it simplifies
                    work, creates better experiences and helps people achieve
                    more.
                  </p>
                </div>
              </div>

              {/* Front quote card */}
              <div className="relative z-20 -mt-16 ml-auto w-[82%] rounded-[25px] border border-[#e4dff2] bg-white p-6 shadow-[0_25px_60px_rgba(32,22,92,0.15)] sm:w-[78%] sm:p-7">
                <MessageSquareText
                  size={30}
                  className="text-[#4b22ff]"
                />

                <p className="mt-4 text-[16px] font-bold leading-7 text-[#081232] sm:text-[19px]">
                  “We treat every client&apos;s vision with the same care,
                  responsibility and commitment as our own.”
                </p>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                  The MITOMS Approach
                </p>
              </div>
            </div>

            {/* Story copy */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Our Story
              </p>

              <h2 className="mt-4 max-w-[650px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                A Technology Partner Built Around{" "}
                <span className="text-[#ff315d]">
                  Collaboration and Trust
                </span>
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
        <section className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                Our Values
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Principles That Guide{" "}
                <span className="text-[#4b22ff]">Every Project</span>
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
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                What We Bring Together
              </p>

              <h2 className="mt-4 max-w-[590px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Different Disciplines.
                <span className="block text-[#ff315d]">
                  One Unified Product Team.
                </span>
              </h2>

              <p className="mt-6 max-w-[570px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                Strategy, design and engineering work together from the
                beginning. This reduces unnecessary handoffs and keeps the
                complete team aligned around the same outcome.
              </p>

              <Link
                href="/services"
                className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
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
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#041033] px-6 py-16 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.28),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.20),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.18),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                  Why MITOMS
                </p>

                <h2 className="mt-4 max-w-[580px] text-[35px] font-bold leading-[1.15] tracking-[-0.04em] sm:text-[46px]">
                  A Delivery Approach Built for
                  <span className="block text-[#ff43a1]">
                    Clarity and Confidence
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
                  className="group mt-8 inline-flex cursor-pointer items-center gap-3 rounded-[13px] bg-white px-6 py-4 text-[12px] font-bold text-[#081232] transition-all duration-300 hover:-translate-y-1"
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
                How We Work
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                A Collaborative Journey From{" "}
                <span className="text-[#ff315d]">
                  Idea to Business Impact
                </span>
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
        <section className="px-5 pb-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-7 py-12 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:px-10 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff84b8]">
                  Build With MITOMS
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
                className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1"
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