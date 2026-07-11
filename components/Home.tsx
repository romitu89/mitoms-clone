"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import ConsultationModal from "./ConsultationModal";
import {
  Star,
  Rocket,
  Users,
  Globe,
  Search,
  Target,
  PenTool,
  Code2,
  TrendingUp,
  Smartphone,
  Cloud,
  Brain,
  Server,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const imgPath = "/images/home/";

const stats = [
  { icon: Star, target: 10, suffix: "+", label: "Years Experience" },
  { icon: Rocket, target: 500, suffix: "+", label: "Projects Delivered" },
  { icon: Users, target: 250, suffix: "+", label: "Happy Clients" },
  { icon: Globe, target: 25, suffix: "+", label: "Countries Served" },
];

const process = [
  {
    icon: Search,
    no: "01",
    title: "Discover",
    text: "We dive deep into your business, audience and goals.",
    theme: "violet",
    ring: "shadow-[0_0_0_12px_rgba(92,35,255,0.16),0_0_42px_rgba(92,35,255,0.70)]",
    circle: "from-[#3215ff] via-[#471fff] to-[#7729ff]",
    noColor: "text-[#d75cff]",
  },
  {
    icon: Target,
    no: "02",
    title: "Strategize",
    text: "We craft a tailored strategy and roadmap for success.",
    theme: "pink",
    ring: "shadow-[0_0_0_12px_rgba(255,47,166,0.15),0_0_42px_rgba(255,47,166,0.58)]",
    circle: "from-[#4d114d] via-[#9c1379] to-[#ff2bd2]",
    noColor: "text-[#ff21c8]",
  },
  {
    icon: PenTool,
    no: "03",
    title: "Design",
    text: "We design intuitive UI/UX that delivers real value.",
    theme: "orange",
    ring: "shadow-[0_0_0_12px_rgba(255,76,45,0.14),0_0_42px_rgba(255,50,74,0.55)]",
    circle: "from-[#4c1324] via-[#8f1839] to-[#ff4747]",
    noColor: "text-[#ff7d22]",
  },
  {
    icon: Code2,
    no: "04",
    title: "Develop",
    text: "We build robust, scalable and secure solutions.",
    theme: "blue",
    ring: "shadow-[0_0_0_12px_rgba(0,87,255,0.15),0_0_42px_rgba(0,87,255,0.58)]",
    circle: "from-[#052d8f] via-[#043ee0] to-[#116dff]",
    noColor: "text-[#d75cff]",
  },
  {
    icon: Rocket,
    no: "05",
    title: "Deploy",
    text: "We launch with precision and zero hassle.",
    theme: "blue",
    ring: "shadow-[0_0_0_12px_rgba(0,87,255,0.15),0_0_42px_rgba(0,87,255,0.58)]",
    circle: "from-[#052d8f] via-[#043ee0] to-[#116dff]",
    noColor: "text-[#e36cff]",
  },
  {
    icon: TrendingUp,
    no: "06",
    title: "Grow",
    text: "We optimize and support to drive continuous growth.",
    theme: "pink",
    ring: "shadow-[0_0_0_12px_rgba(255,47,213,0.15),0_0_42px_rgba(255,47,213,0.58)]",
    circle: "from-[#5c115c] via-[#a616a8] to-[#ff2be7]",
    noColor: "text-[#ff21e6]",
  },
];

const services = [
  { 
    icon: Code2, 
    no: "01", 
    title: "Web Development",
    href: "/services/web-development",
    image: "laptop.png",
    description: "High-performance websites that are secure, scalable and built to convert."
  },
  { 
    icon: Smartphone, 
    no: "02", 
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    image: "mobile.png",
    description: "Engaging mobile apps for iOS & Android that deliver real value."
  },
  { 
    icon: PenTool, 
    no: "03", 
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    image: "knowledge.png",
    description: "Creative, user-centric designs that turn ideas into delightful experiences."
  },
  { 
    icon: Cloud, 
    no: "04", 
    title: "Cloud Solutions",
    href: "/services/cloud-solutions",
    image: "cloud.png",
    description: "Scalable, secure and cost-effective cloud solutions for modern businesses."
  },
  { 
    icon: Brain, 
    no: "05", 
    title: "AI & Digital Transformation",
    href: "/services/ai-digital-transformation",
    image: "ai.png",
    description: "Reimagine your business with technology that makes you future-ready."
  },
  { 
    icon: Server, 
    no: "06", 
    title: "IT Consulting",
    href: "/services/it-consulting",
    image: "machine.png",
    description: "Strategic consulting to solve complex challenges and unlock growth."
  },
];

const heroCards = [
  {
    icon: Code2,
    title: "Web Development",
    href: "/services/web-development",
    text: "Modern scalable websites",
    pos: "left-[16%] top-[4%]",
    iconBg: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    href: "/services/mobile-app-development",
    text: "iOS & Android solutions",
    pos: "right-[0%] top-[21%]",
    iconBg: "from-[#ff2f7d] to-[#ff7ca8]",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    href: "/services/cloud-solutions",
    text: "Secure cloud architecture",
    pos: "left-[6%] bottom-[27%]",
    iconBg: "from-[#00b8ff] to-[#4b22ff]",
  },
  {
    icon: Brain,
    title: "AI Automation",
    href: "/services/ai-digital-transformation",
    text: "Smarter business workflows",
    pos: "right-[3%] bottom-[16%]",
    iconBg: "from-[#ff2f7d] to-[#4b22ff]",
  },
];

function useStartWhenVisible<T extends HTMLElement>(threshold = 0.2) {
  const elementRef = useRef<T>(null);
  const [hasStarted, setHasStarted] = useState(false);

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
        observer.unobserve(entry.target);
      },
      {
        threshold,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, threshold]);

  return { elementRef, hasStarted };
}

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const { elementRef, hasStarted } =
    useStartWhenVisible<HTMLSpanElement>(0.3);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrameId = 0;
    const duration = 1700;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1,
      );
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, target]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

type TypewriterSegment = {
  text: string;
  className?: string;
  underlineClassName?: string;
};

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  mediaQuery.addEventListener("change", onChange);

  return () => {
    mediaQuery.removeEventListener("change", onChange);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function TypewriterText({
  segments,
  speed = 95,
  delay = 100,
  display = "inline",
  className = "",
  cursorClassName = "bg-current",
}: {
  segments: TypewriterSegment[];
  speed?: number;
  delay?: number;
  display?: "inline" | "block";
  className?: string;
  cursorClassName?: string;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const { elementRef, hasStarted } =
    useStartWhenVisible<HTMLSpanElement>(0.12);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fullText = segments.map((segment) => segment.text).join("");
  const totalCharacters = fullText.length;
  const displayedCharacters = prefersReducedMotion
    ? totalCharacters
    : visibleCharacters;

  useEffect(() => {
    if (
      !hasStarted ||
      prefersReducedMotion ||
      totalCharacters === 0 ||
      visibleCharacters >= totalCharacters
    ) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => {
        setVisibleCharacters((current) =>
          Math.min(current + 1, totalCharacters),
        );
      },
      visibleCharacters === 0 ? delay : speed,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    delay,
    hasStarted,
    prefersReducedMotion,
    speed,
    totalCharacters,
    visibleCharacters,
  ]);

  const renderSegments = (showTypedText: boolean) =>
    segments.map((segment, index) => {
      const segmentStart = segments
        .slice(0, index)
        .reduce(
          (total, currentSegment) =>
            total + currentSegment.text.length,
          0,
        );

      const characterCount = showTypedText
        ? Math.max(
            0,
            Math.min(
              segment.text.length,
              displayedCharacters - segmentStart,
            ),
          )
        : segment.text.length;

      const visibleText = segment.text.slice(0, characterCount);
      const segmentComplete =
        characterCount === segment.text.length;

      return (
        <span
          key={`${segment.text}-${index}`}
          className={`${segment.className ?? ""} ${
            segment.underlineClassName ? "relative inline-block" : ""
          }`}
        >
          {visibleText}

          {showTypedText &&
            segment.underlineClassName &&
            segmentComplete && (
              <span
                className={segment.underlineClassName}
                aria-hidden="true"
              />
            )}
        </span>
      );
    });

  const showCursor =
    hasStarted &&
    !prefersReducedMotion &&
    visibleCharacters < totalCharacters;

  return (
    <span
      ref={elementRef}
      aria-label={fullText}
      className={`${
        display === "block" ? "grid w-fit" : "inline-grid"
      } ${className}`}
    >
      {/* Keeps the final text width reserved, so headings do not jump. */}
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 whitespace-pre"
      >
        {renderSegments(false)}
      </span>

      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 whitespace-pre"
      >
        {renderSegments(true)}

        {showCursor && (
          <span
            className={`ml-1 inline-block h-[0.88em] w-[2px] animate-pulse align-[-0.08em] ${cursorClassName}`}
          />
        )}
      </span>
    </span>
  );
}

function LoopingTypewriterText({
  text,
  typingSpeed = 135,
  deletingSpeed = 75,
  holdDuration = 1400,
  restartDelay = 350,
  className = "",
  cursorClassName = "bg-current",
}: {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDuration?: number;
  restartDelay?: number;
  className?: string;
  cursorClassName?: string;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [phase, setPhase] = useState<
    "typing" | "holding" | "deleting" | "restarting"
  >("typing");
  const { elementRef, hasStarted } =
    useStartWhenVisible<HTMLSpanElement>(0.2);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (
      !hasStarted ||
      prefersReducedMotion ||
      text.length === 0
    ) {
      return;
    }

    let timeoutDelay = restartDelay;
    let nextAction: () => void = () => {
      setPhase("typing");
    };

    if (phase === "typing") {
      if (visibleCharacters < text.length) {
        timeoutDelay = typingSpeed;
        nextAction = () => {
          setVisibleCharacters((current) =>
            Math.min(current + 1, text.length),
          );
        };
      } else {
        timeoutDelay = holdDuration;
        nextAction = () => {
          setPhase("deleting");
        };
      }
    } else if (phase === "deleting") {
      if (visibleCharacters > 0) {
        timeoutDelay = deletingSpeed;
        nextAction = () => {
          setVisibleCharacters((current) =>
            Math.max(current - 1, 0),
          );
        };
      } else {
        timeoutDelay = restartDelay;
        nextAction = () => {
          setPhase("restarting");
        };
      }
    } else if (phase === "restarting") {
      timeoutDelay = restartDelay;
      nextAction = () => {
        setPhase("typing");
      };
    } else {
      timeoutDelay = holdDuration;
      nextAction = () => {
        setPhase("deleting");
      };
    }

    const timeoutId = window.setTimeout(
      nextAction,
      timeoutDelay,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    deletingSpeed,
    hasStarted,
    holdDuration,
    phase,
    prefersReducedMotion,
    restartDelay,
    text,
    typingSpeed,
    visibleCharacters,
  ]);

  const visibleText = prefersReducedMotion
    ? text
    : text.slice(0, visibleCharacters);
  const showCursor = hasStarted && !prefersReducedMotion;

  return (
    <span
      ref={elementRef}
      aria-label={text}
      className={`inline-grid ${className}`}
    >
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 whitespace-pre"
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 whitespace-pre"
      >
        {visibleText}

        {showCursor && (
          <span
            className={`ml-1 inline-block h-[0.88em] w-[2px] animate-pulse align-[-0.08em] ${cursorClassName}`}
          />
        )}
      </span>
    </span>
  );
}

function HeroFloatingCard({
  icon: Icon,
  title,
  href,
  text,
  pos,
  iconBg,
}: {
  icon: LucideIcon;
  title: string;
  href: string;
  text: string;
  pos: string;
  iconBg: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Explore ${title}`}
      className={`group absolute ${pos} z-40 hidden w-[215px] rounded-[28px] bg-white/95 p-[14px] shadow-[0_18px_40px_rgba(35,27,84,0.14)] ring-1 ring-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(35,27,84,0.19)] md:block`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${iconBg} text-white shadow-[0_10px_22px_rgba(75,34,255,0.22)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <h4 className="text-[14px] font-bold leading-tight text-[#081232] transition-colors duration-300 group-hover:text-[#4b22ff]">
            {title}
          </h4>
          <p className="mt-1 text-[10px] font-semibold leading-tight text-[#27314f]/60">
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ProcessStep({
  icon: Icon,
  no,
  title,
  text,
  ring,
  circle,
  noColor,
}: {
  icon: LucideIcon;
  no: string;
  title: string;
  text: string;
  theme: string;
  ring: string;
  circle: string;
  noColor: string;
}) {
  return (
    <div className="relative z-20 flex flex-col items-center text-center">
      <div className={`relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-gradient-to-br ${circle} ${ring}`}>
        <span className="absolute inset-[-10px] rounded-full border border-white/5" />
        <span className="absolute inset-[-18px] rounded-full border border-white/5" />
        <Icon className="relative z-10 h-[34px] w-[34px] stroke-[2.1] text-white" />
      </div>

      <h3 className={`mt-8 text-[22px] font-bold leading-none ${noColor}`}>{no}</h3>
      <h4 className="mt-4 text-[20px] font-bold leading-none text-white drop-shadow-[0_6px_10px_rgba(0,0,0,0.55)]">
        {title}
      </h4>
      <p className="mt-5 max-w-[175px] text-[14px] font-medium leading-[1.85] text-white/72">
        {text}
      </p>
    </div>
  );
}

export default function Home() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <main className="overflow-hidden bg-white font-sans text-[#07112f] antialiased">
      {/* HERO SECTION */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#fbfaff]">
        <Image
          src={`${imgPath}hero-bg-glow.png`}
          alt=""
          fill
          priority
          unoptimized
          className="pointer-events-none object-cover object-center opacity-95"
        />

        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center px-6 pb-6 pt-11 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          {/* LEFT CONTENT */}
          <div className="relative z-30">
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.31em] text-[#5438ff]">
              WE BUILD.{" "}
              <TypewriterText
                segments={[
                  { text: "YOU GROW.", className: "text-[#ff2f8b]" },
                ]}
                speed={115}
                delay={180}
                cursorClassName="bg-[#ff2f8b]"
              />
            </p>

            <h1 className="max-w-[560px] text-[46px] font-bold leading-[1.07] tracking-[-0.045em] text-[#081232] sm:text-[56px] lg:text-[62px] xl:text-[66px]">
              Digital Solutions
              <br />
              That Drive
              <TypewriterText
                display="block"
                className="mt-1 font-serif text-[58px] font-medium italic leading-[0.9] tracking-[-0.07em] sm:text-[72px] lg:text-[82px]"
                speed={125}
                delay={380}
                cursorClassName="bg-[#4a25ff]"
                segments={[
                  { text: "Real ", className: "text-[#ff2488]" },
                  {
                    text: "Impact",
                    className: "text-[#4a25ff]",
                    underlineClassName:
                      "absolute -bottom-2 left-2 h-[3px] w-[95%] -rotate-3 rounded-full bg-[#4a25ff]",
                  },
                ]}
              />
            </h1>

            <p className="mt-9 max-w-[535px] text-[16px] font-medium leading-[1.85] text-[#27314f]/80">
              We partner with forward-thinking businesses to design, build and
              scale digital products and solutions that create measurable growth
              and lasting impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex h-[48px] cursor-pointer items-center justify-center rounded-[10px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-7 text-[13px] font-bold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(80,45,255,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(80,45,255,0.34)]"
              >
                Get Free Consultation
                <span className="ml-3 text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <Link
                href="/portfolio"
                className="inline-flex h-[48px] items-center justify-center rounded-[10px] border border-[#dfe3f1] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(16,24,60,0.06)]"
              >
                View Our Work <span className="ml-4 text-[#4b22ff]">→</span>
              </Link>
            </div>

            <div className="mt-14 grid max-w-[620px] grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex min-h-[92px] items-center gap-3 rounded-[18px] border border-[#e9e6f5] bg-white/75 px-4 py-4 shadow-[0_8px_24px_rgba(34,24,88,0.05)] backdrop-blur"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#f1edff] text-[#542cff]">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#3f24ff]">
                        <AnimatedCounter target={item.target} suffix={item.suffix} />
                      </h3>
                      <p className="mt-2 text-[10px] font-medium leading-[1.35] text-[#27314f]/65">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative min-h-[545px] lg:min-h-[570px]">
            <Image
              src={`${imgPath}hero-3d-m.png`}
              alt="MITOMS 3D M"
              width={760}
              height={650}
              priority
              unoptimized
              className="absolute left-[51%] top-[55%] z-20 w-[94%] max-w-[650px] -translate-x-1/2 -translate-y-1/2 object-contain"
            />

            <Image
              src={`${imgPath}hero-orb-pink.png`}
              alt=""
              width={70}
              height={70}
              unoptimized
              className="absolute left-[8%] top-[26%] z-30 w-[48px]"
            />

            <Image
              src={`${imgPath}hero-orb-blue.png`}
              alt=""
              width={55}
              height={55}
              unoptimized
              className="absolute left-[23%] top-[39%] z-30 w-[34px]"
            />

            <Image
              src={`${imgPath}hero-orb-blue.png`}
              alt=""
              width={65}
              height={65}
              unoptimized
              className="absolute right-[6%] top-[39%] z-30 w-[45px]"
            />

            <Image
              src={`${imgPath}hero-orb-pink.png`}
              alt=""
              width={65}
              height={65}
              unoptimized
              className="absolute right-[13%] top-[56%] z-30 w-[42px]"
            />

            {heroCards.map((card) => (
              <HeroFloatingCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-4 py-8 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[16px] border border-white/15 bg-[#041033] px-6 pb-12 pt-8 text-white shadow-[0_22px_70px_rgba(4,10,35,0.28)] sm:rounded-[22px] lg:px-12 lg:pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_13%_48%,rgba(71,26,255,0.22),transparent_20%),radial-gradient(circle_at_46%_47%,rgba(255,43,126,0.14),transparent_18%),radial-gradient(circle_at_83%_50%,rgba(0,87,255,0.18),transparent_20%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,30,0.75),rgba(3,13,45,0.2),rgba(1,8,30,0.75))]" />

          <div className="relative z-20 text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.36em] text-[#d75cff] drop-shadow-[0_0_12px_rgba(215,92,255,0.85)]">
              <TypewriterText
                segments={[
                  { text: "Our Process", className: "text-[#d75cff]" },
                ]}
                speed={105}
                cursorClassName="bg-[#d75cff]"
              />
            </p>
            <h2 className="mx-auto mt-4 max-w-[700px] text-[32px] font-bold leading-[1.22] tracking-[-0.035em] text-white sm:text-[42px]">
              We Turn Ideas Into{" "}
              <TypewriterText
                segments={[
                  { text: "Impactful", className: "text-[#ff18d4]" },
                ]}
                speed={110}
                delay={260}
                cursorClassName="bg-[#ff18d4]"
              />
              <br />
              Digital Experiences
            </h2>
            <p className="mt-5 text-[14px] font-medium text-white/62">
              A seamless process designed to deliver value at every step.
            </p>
          </div>

          <div className="relative z-10 mt-12 lg:mt-16">
            <svg
              className="pointer-events-none absolute left-[7%] -top-[28px] z-0 hidden h-[105px] w-[90%] lg:block"
              viewBox="0 0 1120 105"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="processWave" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a20ff" />
                  <stop offset="0.22" stopColor="#ff24c7" />
                  <stop offset="0.36" stopColor="#ff334b" />
                  <stop offset="0.55" stopColor="#ff24e2" />
                  <stop offset="0.72" stopColor="#0074ff" />
                  <stop offset="1" stopColor="#ff24e2" />
                </linearGradient>
                <filter id="processGlow" x="-10%" y="-100%" width="120%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M0 30 C75 30 75 92 150 92 S225 30 300 30 S375 92 450 92 S525 30 600 30 S675 92 750 92 S825 30 900 30 S975 92 1050 92"
                stroke="url(#processWave)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#processGlow)"
              />

              {[150, 300, 450, 600, 750, 900, 1050].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={i % 2 === 0 ? 92 : 30}
                  r="4"
                  fill="#fff"
                  opacity="0.9"
                />
              ))}
            </svg>

            <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
              {process.map((item) => (
                <ProcessStep key={item.no} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - WHAT WE DO */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.30em] text-[#ff2f7d]">
            <TypewriterText
              segments={[
                { text: "What We Do", className: "text-[#ff2f7d]" },
              ]}
              speed={105}
              cursorClassName="bg-[#ff2f7d]"
            />
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            End-to-End Solutions for Your{" "}
            <TypewriterText
              segments={[
                { text: "Business", className: "text-[#4b22ff]" },
              ]}
              speed={110}
              delay={220}
              cursorClassName="bg-[#4b22ff]"
            />
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.no}
                href={item.href}
                aria-label={`Explore ${item.title}`}
                className="group relative overflow-hidden rounded-2xl border border-[#dfe4f5] bg-[#020b2b] p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Brighter Background Image */}
                <div className="absolute inset-0 opacity-30 transition-all duration-500 group-hover:opacity-50">
                  <Image
                    src={`${imgPath}${item.image}`}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-contain p-5 brightness-125 contrast-110 saturate-125 drop-shadow-[0_0_28px_rgba(255,255,255,0.32)] transition-all duration-700 group-hover:scale-110 group-hover:brightness-150"
                  />
                </div>
                
                <div className="relative z-10">
                  <p className="text-2xl font-extrabold text-[#00c8ff]">{item.no}</p>
                  <Icon className="mt-5 h-10 w-10 text-[#ff2f7d]" />
                  <h3 className="mt-5 text-xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/70">
                    {item.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff2f7d] transition-transform duration-300 group-hover:translate-x-2">
                    Explore Service
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========== IMPACT - सिर्फ Build & Implement का टेक्स्ट ठीक किया ========== */}
      <section className="relative overflow-hidden px-5 pb-10 pt-10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_43%,rgba(98,47,255,0.055),transparent_31%)]" />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-6 lg:grid-cols-[0.68fr_1.32fr]">
          {/* LEFT CONTENT */}
          <div className="lg:pl-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#5b35ff]">
              <TypewriterText
                segments={[
                  {
                    text: "Innovative Solutions",
                    className: "text-[#5b35ff]",
                  },
                ]}
                speed={100}
                cursorClassName="bg-[#5b35ff]"
              />
            </p>

            <h2 className="mt-5 max-w-[440px] text-[31px] font-bold leading-[1.20] tracking-[-0.035em] text-[#081232] sm:text-[39px]">
              Ideas to{" "}
              <TypewriterText
                segments={[
                  { text: "Impact", className: "text-[#4b22ff]" },
                ]}
                speed={115}
                delay={160}
                cursorClassName="bg-[#4b22ff]"
              />{" "}
              – <br />
              We Make It{" "}
              <TypewriterText
                segments={[
                  { text: "Happen", className: "text-[#ff2f7d]" },
                ]}
                speed={115}
                delay={650}
                cursorClassName="bg-[#ff2f7d]"
              />
            </h2>

            <p className="mt-6 max-w-[450px] text-[14px] font-medium leading-7 text-[#34405f]/68">
              We turn your ideas into powerful digital products through
              innovation, technology and strategy.
            </p>

            <div className="mt-7 space-y-3.5">
              {[
                { icon: Server, text: "Deep understanding of your business" },
                { icon: Brain, text: "Cutting-edge technologies" },
                { icon: Code2, text: "Agile & transparent approach" },
                { icon: Rocket, text: "Results that drive growth" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex items-center gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0ecff] text-[#6238ff]">
                      <Icon className="h-3.5 w-3.5 stroke-[2.2]" />
                    </div>
                    <span className="text-[12px] font-medium text-[#24304f]/78">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT ORBIT DIAGRAM */}
          <div className="relative min-h-[510px]">
            {/* Dotted orbit */}
            <div className="absolute left-1/2 top-1/2 h-[405px] w-[405px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-[#d4c9ff]" />

            {/* Soft background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[455px] w-[455px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,41,255,0.08),transparent_68%)]" />

            {/* Center gradient circle */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-[184px] w-[184px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-[#8b46dd]/70 bg-[linear-gradient(180deg,#0b1026_0%,#161236_38%,#25114d_68%,#8b23b8_100%)] text-center text-[20px] font-bold leading-[1.75] text-white shadow-[0_0_0_6px_rgba(157,70,255,0.05),0_18px_40px_rgba(42,18,94,0.22),0_0_18px_rgba(190,70,255,0.18)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(132,76,255,0.38),transparent_34%)]" />
              <div className="pointer-events-none absolute bottom-[-6px] left-1/2 h-[92px] w-[150px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,58,221,0.52)_0%,rgba(181,41,206,0.34)_45%,transparent_80%)] blur-xl" />
              <span className="relative z-10">
                Your Idea
                <br />
                Our Expertise
                <br />
                Real Impact
              </span>
            </div>

            {/* Research text */}
            <div className="absolute left-[0%] top-[8%] w-[220px] text-right">
              <h3 className="text-[13px] font-semibold text-[#10183a]">
                Research &amp; Insights
              </h3>
              <p className="mt-2 text-[11px] font-semibold leading-[1.8] text-[#46516e]/68">
                We analyze, validate and
                <br />
                uncover opportunities.
              </p>
            </div>

            {/* Research icon */}
            <div className="absolute left-[31.2%] top-[21.1%] z-30 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f4efff] border border-[#ebe2ff] text-[#6b4dff] shadow-[0_3px_10px_rgba(91,50,255,0.06)]">
              <Search className="h-8 w-8 stroke-[2.2]" />
            </div>

            {/* Design text */}
            <div className="absolute right-[0%] top-[8%] w-[220px]">
              <h3 className="text-[13px] font-semibold text-[#10183a]">
                Design &amp; Prototype
              </h3>
              <p className="mt-2 text-[11px] font-semibold leading-[1.8] text-[#46516e]/68">
                We create wireframes
                <br />
                and prototypes to
                <br />
                visualize the solution.
              </p>
            </div>

            {/* Design icon */}
            <div className="absolute left-[68.8%] top-[21.1%] z-30 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f4efff] border border-[#ebe2ff] text-[#6b4dff] shadow-[0_3px_10px_rgba(91,50,255,0.06)]">
              <Rocket className="h-8 w-8 stroke-[2.2]" />
            </div>

            {/* ===== Build & Implement - यहाँ पर टेक्स्ट ठीक किया ===== */}
            <div className="absolute bottom-[7%] left-[0%] w-[225px] text-right">
              <h3 className="text-[13px] font-semibold text-[#10183a]">
                Build &amp; Implement
              </h3>
              <p className="mt-2 text-[11px] font-semibold leading-[1.8] text-[#46516e]/68">
                We build with precision
                <br />
                and scalable architecture.
              </p>
            </div>

            {/* Build icon */}
            <div className="absolute bottom-[21.1%] left-[31.2%] z-30 flex h-[70px] w-[70px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#f4efff] border border-[#ebe2ff] text-[#6b4dff] shadow-[0_3px_10px_rgba(91,50,255,0.06)]">
              <Code2 className="h-8 w-8 stroke-[2.2]" />
            </div>

            {/* Measure text */}
            <div className="absolute bottom-[7%] right-[0%] w-[225px]">
              <h3 className="text-[13px] font-semibold text-[#10183a]">
                Measure &amp; Optimize
              </h3>
              <p className="mt-2 text-[11px] font-semibold leading-[1.8] text-[#46516e]/68">
                We measure performance
                <br />
                and continuously
                <br />
                optimize for better ROI.
              </p>
            </div>

            {/* Measure icon */}
            <div className="absolute bottom-[21.1%] left-[68.8%] z-30 flex h-[70px] w-[70px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#f4efff] border border-[#ebe2ff] text-[#6b4dff] shadow-[0_3px_10px_rgba(91,50,255,0.06)]">
              <BarChart3 className="h-8 w-8 stroke-[2.2]" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 lg:px-7">
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-t-[12px] border border-white/15 bg-[linear-gradient(100deg,#07183f_0%,#09153a_30%,#24104f_58%,#64145f_80%,#ff2f7d_100%)] px-7 py-6 text-white shadow-[0_18px_50px_rgba(13,12,55,0.22)] sm:px-10 lg:px-14">
          {/* Glow and decorative curves */}
          <div className="pointer-events-none absolute -bottom-24 right-[-20px] h-64 w-64 rounded-full bg-[#ff2f7d]/32 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-92px] right-[-40px] h-40 w-[360px] -rotate-6 rounded-[50%] border border-white/10" />
          <div className="pointer-events-none absolute bottom-[-118px] right-[-60px] h-44 w-[420px] -rotate-6 rounded-[50%] border border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[4px]
            bg-gradient-to-r from-[#1eb8ff] via-[#7b3cff] to-[#ff2f7d]
            shadow-[0_0_10px_#1eb8ff,0_0_22px_#6a4dff,0_0_36px_#ff2f7d,0_6px_28px_rgba(255,47,125,.55)]" />

          <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1.15fr_0.85fr_1.3fr]">
            {/* Left heading */}
            <div className="lg:pr-8">
              <h2 className="text-[22px] font-bold tracking-[-0.025em] sm:text-[27px]">
                Let&apos;s Build Something
              </h2>

              <p className="mt-1 font-['Brush_Script_MT','Segoe_Script','Lucida_Handwriting',cursive] text-[40px] font-normal italic leading-[0.9] tracking-[0.02em] text-white sm:text-[50px] drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
                <LoopingTypewriterText
                  text="Amazing Together!"
                  typingSpeed={135}
                  deletingSpeed={75}
                  holdDuration={1400}
                  restartDelay={350}
                  cursorClassName="bg-white"
                />
              </p>
            </div>

            {/* Center copy */}
            <div className="border-white/10 lg:border-l lg:pl-8">
              <p className="max-w-[300px] text-[12px] font-medium leading-6 text-white/72">
                Have a project in mind? Let&apos;s turn your
                <br className="hidden xl:block" />
                idea into a powerful digital solution.
              </p>
            </div>

            {/* Right actions */}
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <button
                type="button"
                onClick={openConsultation}
                className="inline-flex h-[48px] min-w-[200px] cursor-pointer items-center justify-center rounded-[8px] bg-white px-5 text-[11px] font-bold tracking-[0.01em] text-[#17163b] shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.24)]"
              >
                Get Free Consultation
                <span className="ml-4 text-[18px] text-[#ff2f7d]">→</span>
              </button>

              <Link
                href="/portfolio"
                className="inline-flex h-[48px] min-w-[158px] items-center justify-center rounded-[8px] border border-white/30 bg-white/[0.03] px-5 text-[11px] font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                View Our Work
                <span className="ml-4 text-[17px]">→</span>
              </Link>

              {/* Paper plane */}
              <div className="relative hidden h-14 w-16 items-center justify-center xl:flex">
                <svg
                  viewBox="0 0 64 64"
                  className="h-12 w-12 -rotate-[10deg] text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 29.5L55 8L41.5 55L31 34L8 29.5Z"
                    fill="currentColor"
                    opacity="0.96"
                  />
                  <path
                    d="M31 34L55 8L22.5 27.5"
                    stroke="#ff4f9a"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <svg
                  className="pointer-events-none absolute -bottom-1 -left-8 h-10 w-24 text-white/15"
                  viewBox="0 0 96 40"
                  fill="none"
                >
                  <path
                    d="M2 30C22 14 34 36 50 20C64 6 74 8 94 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </main>
  );
}