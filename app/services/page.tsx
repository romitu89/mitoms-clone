"use client";

// SERVICES PAGE VERSION: HEADING-TYPEWRITER-FINAL-2026-07-15

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  Layers3,
  Lightbulb,
  MonitorSmartphone,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import ConsultationModal from "../../components/ConsultationModal";

const pageDescription =
  "Explore MITOMS services for web development, mobile app development, UI/UX design, cloud solutions, AI transformation and IT consulting in India.";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Software Development Services",
  description: pageDescription,
  url: "https://mitoms.com/services/",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mitoms.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://mitoms.com/services/",
      },
    ],
  },
};

type ServiceItem = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
  softBackground: string;
  image: string;
  highlights: string[];
};

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Web Development",
    shortTitle: "Web",
    description:
      "Fast, secure and scalable websites and web applications designed around your audience, operations and growth goals.",
    href: "/services/web-development/",
    icon: Code2,
    gradient: "from-[#4B22FF] to-[#7B5CFF]",
    softBackground: "bg-[#F0ECFF]",
    image: "/images/home/laptop.webp",
    highlights: ["Responsive development", "Performance optimization", "Custom web platforms"],
  },
  {
    number: "02",
    title: "Mobile App Development",
    shortTitle: "Mobile",
    description:
      "Purpose-built iOS and Android applications that combine intuitive journeys, reliable engineering and long-term scalability.",
    href: "/services/mobile-app-development/",
    icon: MonitorSmartphone,
    gradient: "from-[#FF2F7D] to-[#FF7CA8]",
    softBackground: "bg-[#FFF0F5]",
    image: "/images/home/mobile.webp",
    highlights: ["iOS and Android", "User-focused interfaces", "Scalable architecture"],
  },
  {
    number: "03",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    description:
      "Research-led digital experiences with clear information architecture, polished visual systems and effortless interactions.",
    href: "/services/ui-ux-design/",
    icon: Palette,
    gradient: "from-[#743CFF] to-[#FF2F7D]",
    softBackground: "bg-[#F8EEFF]",
    image: "/images/home/knowledge.webp",
    highlights: ["User research", "Wireframes and prototypes", "Design systems"],
  },
  {
    number: "04",
    title: "Cloud Solutions",
    shortTitle: "Cloud",
    description:
      "Secure cloud architecture, migration and managed infrastructure that improve reliability, flexibility and operational scale.",
    href: "/services/cloud-solutions/",
    icon: Cloud,
    gradient: "from-[#00B8FF] to-[#4B22FF]",
    softBackground: "bg-[#EAF8FF]",
    image: "/images/home/cloud.webp",
    highlights: ["Cloud migration", "Infrastructure design", "Monitoring and support"],
  },
  {
    number: "05",
    title: "AI & Digital Transformation",
    shortTitle: "AI",
    description:
      "Practical AI, automation and modernization solutions that simplify work, improve decisions and prepare businesses for change.",
    href: "/services/ai-digital-transformation/",
    icon: Brain,
    gradient: "from-[#4B22FF] via-[#743CFF] to-[#FF2F7D]",
    softBackground: "bg-[#F4EEFF]",
    image: "/images/home/ai.webp",
    highlights: ["Workflow automation", "AI-enabled products", "Digital modernization"],
  },
  {
    number: "06",
    title: "IT Consulting",
    shortTitle: "Consulting",
    description:
      "Technology strategy, architecture guidance and practical modernization planning aligned with real business priorities.",
    href: "/services/it-consulting/",
    icon: Server,
    gradient: "from-[#081232] to-[#4B22FF]",
    softBackground: "bg-[#EEF1FF]",
    image: "/images/home/machine.webp",
    highlights: ["Technology strategy", "Architecture guidance", "Modernization roadmap"],
  },
];

const deliverySteps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Understand",
    text: "We clarify your business goals, audience, challenges and expected outcomes.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "Plan",
    text: "We define the right experience, architecture, technology and delivery roadmap.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Build",
    text: "Our design and engineering teams create, test and refine the complete solution.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Grow",
    text: "We launch, optimize and support the product as your requirements evolve.",
  },
];

const advantages = [
  "One connected team for strategy, design and engineering",
  "Responsive experiences across mobile, tablet and desktop",
  "Technology decisions aligned with practical business needs",
  "Transparent communication throughout the delivery journey",
  "Secure, maintainable and scalable implementation",
  "Long-term support for improvement and future growth",
];

function useStartWhenVisible<T extends HTMLElement>(threshold = 0.16) {
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
        observer.disconnect();
      },
      {
        threshold,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, threshold]);

  return { elementRef, hasStarted };
}

function TypewriterText({
  text,
  speed = 92,
  delay = 120,
  display = "inline",
  className = "",
  wrapperClassName = "",
  cursorClassName = "bg-current",
}: {
  text: string;
  speed?: number;
  delay?: number;
  display?: "inline" | "block";
  className?: string;
  wrapperClassName?: string;
  cursorClassName?: string;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const { elementRef, hasStarted } = useStartWhenVisible<HTMLSpanElement>();

  useEffect(() => {
    if (!hasStarted || visibleCharacters >= text.length) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timer = window.setTimeout(
      () => {
        setVisibleCharacters((current) =>
          reducedMotion ? text.length : Math.min(current + 1, text.length),
        );
      },
      visibleCharacters === 0 ? delay : speed,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, hasStarted, speed, text, visibleCharacters]);

  const isTyping = hasStarted && visibleCharacters < text.length;
  const displayClass = display === "block" ? "grid w-fit max-w-full" : "inline-grid max-w-full";

  return (
    <span
      ref={elementRef}
      aria-label={text}
      className={`${displayClass} ${wrapperClassName}`}
    >
      <span
        aria-hidden="true"
        className={`invisible col-start-1 row-start-1 whitespace-normal ${className}`}
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 whitespace-normal ${className}`}
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
  const { elementRef, hasStarted } = useStartWhenVisible<HTMLDivElement>(0.1);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out ${
        hasStarted ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      prefetch={false}
      className="group relative flex h-full min-h-[545px] min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E4DFF0] bg-white p-5 shadow-[0_14px_40px_rgba(35,25,88,0.055)] transition-all duration-300 hover:-translate-y-2 hover:border-[#CFC4FF] hover:shadow-[0_25px_58px_rgba(75,34,255,0.13)] sm:min-h-[585px] sm:rounded-[27px] sm:p-7"
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.10] blur-[62px] transition-transform duration-500 group-hover:scale-125`}
      />

      <div className="relative flex items-center justify-between gap-4">
        <span
          className={`flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-gradient-to-br ${service.gradient} text-white shadow-[0_12px_28px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-14 sm:w-14`}
        >
          <Icon size={25} />
        </span>

        <span className="text-[12px] font-black tracking-[0.2em] text-[#8B79D8]">
          {service.number}
        </span>
      </div>

      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-[#292A50] bg-[#050821] shadow-[0_14px_34px_rgba(8,10,42,0.15)] sm:rounded-[20px]">
        <Image
          src={service.image}
          alt={`${service.title} service illustration`}
          width={1100}
          height={825}
          unoptimized
          sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1279px) 50vw, 33vw"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_66%,rgba(5,8,33,0.30)_100%)]" />
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${service.gradient} opacity-[0.12]`} />
      </div>

      <h2 className="relative mt-6 text-[23px] font-bold leading-tight tracking-[-0.035em] text-[#081232] sm:text-[25px]">
        {service.title}
      </h2>

      <p className="relative mt-3 text-[15px] font-medium leading-7 text-[#34405F]/94 sm:text-[16px]">
        {service.description}
      </p>

      <div className="relative mt-5 space-y-2.5">
        {service.highlights.map((highlight) => (
          <div key={highlight} className="flex min-w-0 items-start gap-2.5">
            <CheckCircle2
              size={16}
              className="mt-1 shrink-0 text-[#FF2F7D]"
            />
            <span className="min-w-0 text-[13px] font-semibold leading-6 text-[#3A4663]/92">
              {highlight}
            </span>
          </div>
        ))}
      </div>

      <span className="relative mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-bold text-[#4B22FF]">
        Explore Service
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <main className="w-full overflow-x-clip bg-white font-sans text-[#07112F] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#FBFAFF] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-11 xl:px-10">
          <div className="pointer-events-none absolute -left-40 -top-40 h-[540px] w-[540px] rounded-full bg-[#4B22FF]/12 blur-[145px]" />
          <div className="pointer-events-none absolute -right-40 top-[-110px] h-[520px] w-[520px] rounded-full bg-[#FF2F7D]/12 blur-[145px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid w-full max-w-[1320px] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 xl:gap-12">
            <div className="relative z-20 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DDD6FF] bg-white/82 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Sparkles size={15} className="text-[#FF2F7D]" />
                <TypewriterText
                  text="End-to-End Technology Services"
                  speed={72}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2F7D] sm:text-[12px] sm:tracking-[0.22em]"
                  cursorClassName="bg-[#FF2F7D]"
                />
              </div>

              <h1 className="mt-6 max-w-[720px] font-bold tracking-[-0.042em] text-[#081232] sm:mt-7">
                <span className="block whitespace-nowrap text-[clamp(25px,6vw,50px)] leading-[1.08]">
                  One Digital Partner for
                </span>

                <TypewriterText
                  text="Meaningful Business Growth"
                  display="block"
                  speed={88}
                  delay={220}
                  className="mt-2 max-w-full bg-gradient-to-r from-[#4B22FF] via-[#743CFF] to-[#FF2F7D] bg-clip-text pb-[0.09em] text-[clamp(30px,6.25vw,53px)] leading-[1.06] text-transparent"
                  cursorClassName="bg-[#FF2F7D]"
                />
              </h1>

              <p className="mt-6 max-w-[630px] text-[16px] font-medium leading-7 text-[#27314F]/94 sm:mt-7 sm:text-[17px] sm:leading-8">
                From product strategy and user experience to engineering, cloud
                and AI, MITOMS brings the capabilities required to design,
                build and improve modern digital solutions.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] px-6 text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(75,34,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(255,47,125,0.24)] sm:w-auto sm:px-7"
                >
                  Discuss Your Requirement
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio/"
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[13px] border border-[#DDD8EC] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4B22FF] hover:text-[#4B22FF] sm:w-auto sm:px-7"
                >
                  Explore Our Work
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div className="mt-8 grid w-full max-w-[650px] grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3">
                {[
                  { icon: BadgeCheck, value: "6", label: "Core Services" },
                  { icon: ShieldCheck, value: "100%", label: "Responsive Delivery" },
                  { icon: Zap, value: "One", label: "Connected Team" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-w-0 items-center gap-3 rounded-[16px] border border-[#E7E2F5] bg-white/82 px-3 py-3.5 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:px-4 sm:py-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F0ECFF] text-[#4B22FF]">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block text-[17px] leading-none text-[#4B22FF]">
                          {item.value}
                        </strong>
                        <span className="mt-1.5 block text-[10px] font-semibold leading-4 text-[#34405F]/76 sm:text-[11px]">
                          {item.label}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[430px] min-w-0 sm:min-h-[520px] lg:min-h-[570px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#CFC5FF] sm:h-[400px] sm:w-[400px] xl:h-[470px] xl:w-[470px]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[255px] w-[255px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.15),transparent_68%)] sm:h-[350px] sm:w-[350px]" />

              <Image
                src="/images/home/hero-3d-m.webp"
                alt="MITOMS technology services"
                width={700}
                height={620}
                priority
                className="absolute left-1/2 top-1/2 z-20 h-auto w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_28px_44px_rgba(32,23,92,0.18)] sm:w-[76%] lg:w-[84%] xl:w-[76%]"
              />

              <div className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:hidden">
                {services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <Link
                      key={service.shortTitle}
                      href={service.href}
                      style={{ animationDelay: `${index * 0.35}s` }}
                      className="services-float-card flex min-w-0 items-center gap-2 rounded-[14px] border border-[#E5E0F1] bg-white/95 px-3 py-3 shadow-[0_12px_30px_rgba(35,27,84,0.09)] backdrop-blur"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${service.gradient} text-white`}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 text-[11px] font-bold leading-4 text-[#081232]">
                        {service.shortTitle}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {services.map((service, index) => {
                const Icon = service.icon;
                const positions = [
                  "left-[1%] top-[7%]",
                  "right-[0%] top-[16%]",
                  "left-[1%] top-[43%]",
                  "right-[0%] top-[49%]",
                  "left-[8%] bottom-[4%]",
                  "right-[4%] bottom-[2%]",
                ];

                return (
                  <Link
                    key={service.shortTitle}
                    href={service.href}
                    style={{ animationDelay: `${index * 0.35}s` }}
                    className={`services-float-card absolute ${positions[index]} z-30 hidden w-[188px] items-center gap-3 rounded-[20px] border border-[#E5E0F1] bg-white/95 p-3.5 shadow-[0_17px_38px_rgba(35,27,84,0.11)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_23px_48px_rgba(35,27,84,0.16)] xl:flex`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br ${service.gradient} text-white shadow-[0_8px_20px_rgba(75,34,255,0.18)]`}
                    >
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0 text-[12px] font-bold leading-5 text-[#081232]">
                      {service.shortTitle}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10">
          <div className="mx-auto w-full max-w-[1320px]">
            <div className="mx-auto max-w-[820px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF2F7D] sm:text-[12px]">
                <TypewriterText
                  text="What We Do"
                  speed={82}
                  cursorClassName="bg-[#FF2F7D]"
                />
              </p>
              <h2 className="mt-4 font-bold leading-[1.14] tracking-[-0.038em] text-[#081232]">
                <span className="mx-auto block max-w-full text-center text-[clamp(25px,3.15vw,36px)] leading-[1.14]">
                  Complete Digital Capabilities,
                </span>

                <TypewriterText
                  text="Built Around Your Business"
                  display="block"
                  speed={82}
                  delay={360}
                  wrapperClassName="mx-auto mt-1"
                  className="max-w-full bg-gradient-to-r from-[#4B22FF] via-[#743CFF] to-[#FF2F7D] bg-clip-text pb-[0.08em] text-center text-[clamp(27px,3.35vw,38px)] leading-[1.14] text-transparent"
                  cursorClassName="bg-[#FF2F7D]"
                />
              </h2>
              <p className="mx-auto mt-5 max-w-[700px] text-[16px] font-medium leading-7 text-[#34405F]/92">
                Choose a focused service or combine multiple capabilities into
                one connected delivery plan.
              </p>
            </div>

            <div className="mt-12 grid min-w-0 auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))]">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={(index % 3) * 90}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY */}
        <section className="w-full bg-[#FBFAFF] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10">
          <div className="mx-auto grid w-full max-w-[1320px] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14">
            <Reveal>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.27em] text-[#4B22FF] sm:text-[12px]">
                  <TypewriterText
                    text="How We Deliver"
                    speed={78}
                    cursorClassName="bg-[#4B22FF]"
                  />
                </p>
                <h2 className="mt-4 max-w-[560px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                  A Connected Journey From
                  <TypewriterText
                    text="Idea to Impact"
                    display="block"
                    speed={92}
                    delay={220}
                    className="mt-1 text-[#FF2F7D]"
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </h2>
                <p className="mt-6 max-w-[570px] text-[16px] font-medium leading-8 text-[#34405F]/92">
                  Every engagement follows a clear path, while remaining flexible
                  enough for your product, organisation and priorities.
                </p>

                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B22FF] sm:mt-8 sm:w-auto sm:px-7"
                >
                  Plan Your Project
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </Reveal>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal key={step.number} delay={index * 90}>
                    <article className="group min-h-[230px] min-w-0 rounded-[22px] border border-[#E4DFF0] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#CFC4FF] hover:shadow-[0_20px_44px_rgba(75,34,255,0.10)] sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#4B22FF] to-[#FF2F7D] text-white shadow-[0_11px_24px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6">
                          <Icon size={22} />
                        </span>
                        <span className="text-[24px] font-black text-[#EEE9FF]">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[19px] font-bold text-[#081232]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] font-medium leading-7 text-[#34405F]/92">
                        {step.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONNECTED CAPABILITIES */}
        <section className="w-full overflow-x-clip px-3 py-7 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
          <div className="relative mx-auto w-full max-w-[1440px] min-w-0 overflow-hidden rounded-[20px] bg-[#041033] px-4 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[24px] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(75,34,255,0.28),transparent_26%),radial-gradient(circle_at_88%_22%,rgba(255,47,125,0.20),transparent_25%),radial-gradient(circle_at_50%_105%,rgba(0,184,255,0.18),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto w-full max-w-[790px] min-w-0 text-center">
              <p className="mx-auto max-w-full text-[10px] font-bold uppercase tracking-[0.20em] text-[#D75CFF] sm:text-[12px] sm:tracking-[0.28em]">
                <TypewriterText
                  text="One Connected Team"
                  speed={78}
                  wrapperClassName="mx-auto"
                  className="text-center"
                  cursorClassName="bg-[#D75CFF]"
                />
              </p>

              <h2 className="mx-auto mt-5 max-w-[360px] text-[28px] font-bold leading-[1.15] tracking-[-0.035em] sm:mt-4 sm:max-w-[720px] sm:text-[40px] sm:leading-[1.14] sm:tracking-[-0.04em] lg:text-[45px]">
                <TypewriterText
                  text="Strategy, Design and Technology"
                  display="block"
                  speed={78}
                  delay={120}
                  wrapperClassName="mx-auto"
                  className="max-w-full text-center"
                  cursorClassName="bg-white"
                />

                <TypewriterText
                  text="Working Together"
                  display="block"
                  speed={92}
                  delay={320}
                  wrapperClassName="mx-auto mt-2 sm:mt-1"
                  className="max-w-full text-center text-[#FF4B9A]"
                  cursorClassName="bg-[#FF4B9A]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[340px] text-[14px] font-medium leading-6 text-white/80 sm:max-w-[680px] sm:text-[16px] sm:leading-7">
                Instead of disconnected handoffs, our capabilities work together
                to create a clearer product, stronger implementation and smoother
                delivery experience.
              </p>
            </div>

            <div className="relative z-10 mt-11 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: Lightbulb, title: "Strategy", text: "Goals, priorities and practical product direction." },
                { icon: Palette, title: "Experience", text: "Clear journeys, interfaces and visual systems." },
                { icon: Code2, title: "Engineering", text: "Reliable, secure and maintainable development." },
                { icon: Brain, title: "Cloud & AI", text: "Modern infrastructure, automation and intelligence." },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 90}>
                    <article className="min-h-[220px] min-w-0 rounded-[21px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.085] sm:p-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#4B22FF] to-[#FF2F7D] text-white shadow-[0_12px_25px_rgba(75,34,255,0.25)]">
                        <Icon size={22} />
                      </span>
                      <h3 className="mt-5 text-[18px] font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[14px] font-medium leading-7 text-white/75">
                        {item.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY MITOMS */}
        <section className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10">
          <div className="mx-auto grid w-full max-w-[1320px] min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
            <Reveal>
              <div className="relative min-h-[400px] overflow-hidden rounded-[26px] border border-[#E3DDF0] bg-[#FBFAFF] p-5 shadow-[0_18px_52px_rgba(30,20,80,0.08)] sm:min-h-[470px] sm:p-8">
                <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#4B22FF]/12 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#FF2F7D]/12 blur-[90px]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.12)_1px,transparent_1px)] [background-size:25px_25px]" />

                <div className="relative z-10 flex h-full min-h-[350px] flex-col justify-center sm:min-h-[405px]">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DDD6FF] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4B22FF] shadow-[0_8px_22px_rgba(75,34,255,0.06)]">
                    <ShieldCheck size={14} />
                    <TypewriterText
                      text="Practical Delivery"
                      speed={72}
                      cursorClassName="bg-[#4B22FF]"
                    />
                  </span>
                  <p className="mt-7 max-w-[520px] text-[27px] font-bold leading-[1.25] tracking-[-0.035em] text-[#081232] sm:text-[34px]">
                    Technology should make your business clearer, faster and
                    more capable — not more complicated.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      ["Business", "Focused"],
                      ["Design", "Led"],
                      ["Engineering", "Driven"],
                      ["Growth", "Ready"],
                    ].map(([top, bottom]) => (
                      <div
                        key={`${top}-${bottom}`}
                        className="rounded-[17px] border border-[#E6E1F2] bg-white/85 p-4 shadow-[0_10px_26px_rgba(35,25,88,0.05)] backdrop-blur"
                      >
                        <strong className="block text-[16px] text-[#4B22FF] sm:text-[18px]">
                          {top}
                        </strong>
                        <span className="mt-1 block text-[12px] font-semibold text-[#34405F]/88 sm:text-[13px]">
                          {bottom}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.27em] text-[#FF2F7D] sm:text-[12px]">
                <TypewriterText
                  text="Why MITOMS"
                  speed={78}
                  cursorClassName="bg-[#FF2F7D]"
                />
              </p>
              <h2 className="mt-4 max-w-[650px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Built for Real Requirements,
                <TypewriterText
                  text="Not Generic Solutions"
                  display="block"
                  speed={92}
                  delay={220}
                  className="mt-1 text-[#4B22FF]"
                  cursorClassName="bg-[#4B22FF]"
                />
              </h2>
              <p className="mt-6 max-w-[650px] text-[16px] font-medium leading-8 text-[#34405F]/92">
                We connect every design and technology decision to the people who
                will use the product and the outcome your organisation needs.
              </p>

              <div className="mt-7 grid min-w-0 gap-3 sm:grid-cols-2">
                {advantages.map((advantage, index) => (
                  <Reveal key={advantage} delay={(index % 2) * 70}>
                    <div className="flex min-h-[96px] min-w-0 items-start gap-3 rounded-[18px] border border-[#E5E0F1] bg-white p-4 shadow-[0_10px_28px_rgba(35,25,88,0.045)] sm:p-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#F0ECFF] text-[10px] font-black text-[#4B22FF]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex min-w-0 flex-1 items-start gap-2">
                        <CheckCircle2
                          size={16}
                          className="mt-1 shrink-0 text-[#FF2F7D]"
                        />
                        <p className="min-w-0 text-[14px] font-bold leading-6 text-[#27314F]/94">
                          {advantage}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full overflow-x-clip px-3 pb-7 sm:px-6 sm:pb-8 lg:px-8 xl:px-10">
          <div className="relative mx-auto w-full max-w-[1320px] min-w-0 overflow-hidden rounded-[20px] bg-[linear-gradient(105deg,#061330_0%,#17104B_42%,#5E155B_75%,#FF2F7D_125%)] px-4 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[28px] sm:px-8 sm:py-12 lg:px-12">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#00B8FF]/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#FF2F7D]/35 blur-[95px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex min-w-0 flex-col items-center justify-between gap-7 text-center lg:flex-row lg:items-center lg:gap-8 lg:text-left">
              <div className="w-full min-w-0">
                <p className="mx-auto max-w-full text-[10px] font-bold uppercase tracking-[0.20em] text-[#FF7CA8] sm:text-[12px] sm:tracking-[0.26em] lg:mx-0">
                  <TypewriterText
                    text="Have a Project in Mind?"
                    speed={76}
                    wrapperClassName="mx-auto lg:mx-0"
                    className="text-center lg:text-left"
                    cursorClassName="bg-[#FF7CA8]"
                  />
                </p>

                {/* Mobile: balanced three-line heading */}
                <h2 className="mx-auto mt-4 max-w-[350px] text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:hidden">
                  <TypewriterText
                    text="Let's Choose the Right"
                    display="block"
                    speed={76}
                    delay={120}
                    wrapperClassName="mx-auto"
                    className="max-w-full text-center"
                    cursorClassName="bg-white"
                  />

                  <TypewriterText
                    text="Services and Build a"
                    display="block"
                    speed={82}
                    delay={300}
                    wrapperClassName="mx-auto mt-1"
                    className="max-w-full text-center"
                    cursorClassName="bg-white"
                  />

                  <TypewriterText
                    text="Practical Plan"
                    display="block"
                    speed={92}
                    delay={520}
                    wrapperClassName="mx-auto mt-1"
                    className="max-w-full text-center text-[#FF7CA8]"
                    cursorClassName="bg-[#FF7CA8]"
                  />
                </h2>

                {/* Tablet and desktop: original layout */}
                <h2 className="mt-3 hidden max-w-[790px] text-[39px] font-bold leading-[1.15] tracking-[-0.04em] sm:block lg:text-[42px]">
                  Let&apos;s Choose the Right Services and
                  <TypewriterText
                    text="Build a Practical Plan"
                    display="block"
                    speed={92}
                    delay={220}
                    className="mt-1 text-[#FF7CA8]"
                    cursorClassName="bg-[#FF7CA8]"
                  />
                </h2>

                <p className="mx-auto mt-5 max-w-[340px] text-[14px] font-medium leading-6 text-white/82 sm:max-w-[720px] sm:text-[15px] sm:leading-7 lg:mx-0">
                  Share your idea, current challenge or business requirement and
                  start a focused conversation with our team.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group inline-flex min-h-[52px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163B] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Get Free Consultation
                <ArrowRight
                  size={18}
                  className="text-[#FF2F7D] transition-transform duration-300 group-hover:translate-x-1"
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
        .services-float-card {
          animation: servicesFloat 6.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes servicesFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-float-card {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
