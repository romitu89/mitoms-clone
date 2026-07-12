"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  Globe2,
  HeartPulse,
  Layers3,
  MonitorSmartphone,
  Network,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const imagePath = "/images/portfolio/";

type Project = {
  number: string;
  name: string;
  client: string;
  category: string;
  industry: string;
  duration: string;
  platform: string;
  description: string;
  impact: string;
  link: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  imageMode: "desktop" | "mobile";
  icon: LucideIcon;
  accent: string;
  glow: string;
  badge: string;
  features: string[];
  technologies: string[];
};

const projects: Project[] = [
  {
    number: "01",
    name: "Artmilap",
    client: "Artmilap / Artmilap Connect LLP",
    category: "Artist Networking, Cultural Learning & Community Platform",
    industry: "Arts, Culture, Creative Learning & Community Networking",
    duration: "Ongoing - Early-Access Phase",
    platform: "Responsive Web Platform + Mobile Application in Development",
    description:
      "Artmilap is a culture-first digital platform created to connect artists, learners, organisations and cultural communities across India. It gives artists a professional space to showcase their talent, build trusted profiles, expand their network and connect with people interested in learning different art forms.",
    impact:
      "The platform creates a central digital ecosystem for artist discovery, cultural learning, community participation and professional opportunities. It helps artists improve visibility while making it easier for learners and organisers to discover talent, book sessions and participate in India's creative community.",
    link: "https://artmilap.com/",
    linkLabel: "Visit Artmilap",
    image: `${imagePath}artmilap.png`,
    imageAlt: "Artmilap culture and artist networking platform homepage",
    imageMode: "desktop",
    icon: Palette,
    accent: "from-[#4F1DBA] via-[#793DDC] to-[#A65CEB]",
    glow: "bg-[#793DDC]/24",
    badge: "Web + Mobile Product",
    features: [
      "Verified artist profiles and talent portfolios",
      "Artist and learner registration journeys",
      "Artist discovery, networking and collaboration",
      "Community sessions and learning bookings",
      "Secure payment and booking support",
      "Cultural opportunities, grants and professional visibility",
      "Responsive early-access web experience",
      "Mobile application currently in development",
    ],
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Web Design",
      "UI/UX Design",
      "Modern Web Development",
    ],
  },
  {
    number: "02",
    name: "Elevate Care",
    client: "Elevate Care Ltd",
    category: "Healthcare, Home Care & Social Care Services Website",
    industry: "Healthcare, Home Care, Social Care & Medical Staffing",
    duration: "Completed",
    platform: "Responsive Website - Mobile, Tablet & Desktop",
    description:
      "Elevate Care is a professional healthcare and social care website designed to present personalised home-care services, healthcare operations support and flexible staffing solutions. The experience helps individuals, families, hospitals and care organisations understand the available services and contact the care team easily.",
    impact:
      "The website gives Elevate Care a clear and professional digital presence, improves access to service information, supports customer enquiries and helps build trust through quality-care information, testimonials and recruitment content.",
    link: "https://elevatecare.mitoms.com/",
    linkLabel: "Visit Elevate Care",
    image: `${imagePath}elevate-care.png`,
    imageAlt: "Elevate Care healthcare services mobile website",
    imageMode: "mobile",
    icon: HeartPulse,
    accent: "from-[#0753C7] via-[#008E9F] to-[#06C56A]",
    glow: "bg-[#00B879]/22",
    badge: "Healthcare Website",
    features: [
      "Home care and live-in care service information",
      "Personal, companionship and domestic support details",
      "Healthcare staffing and recruitment support",
      "Service enquiry and contact journeys",
      "Client testimonials and quality-care information",
      "Staff training and application information",
      "Clear opening hours and contact details",
      "Responsive experience across devices",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "UI/UX Design",
      "CMS-Based Development",
    ],
  },
  {
    number: "03",
    name: "Sohar Dental Laboratory",
    client: "Sohar Dental Laboratory LLC",
    category: "Dental Laboratory & Healthcare Corporate Website",
    industry: "Dental Healthcare, Dental Laboratory & Medical Manufacturing",
    duration: "Completed",
    platform: "Responsive Corporate Website - Mobile, Tablet & Desktop",
    description:
      "Sohar Dental Laboratory is a professional corporate website developed to showcase high-quality dental restoration solutions. The website communicates the laboratory's expertise, precision, innovation and commitment to reliable dental products for dental professionals.",
    impact:
      "The website strengthens the laboratory's credibility, presents its dental-restoration expertise clearly and gives dentists and prospective business clients a convenient way to understand the organisation and submit enquiries.",
    link: "https://sohardental.com/",
    linkLabel: "Visit Sohar Dental",
    image: `${imagePath}sohar-dental.png`,
    imageAlt: "Sohar Dental Laboratory mobile corporate website",
    imageMode: "mobile",
    icon: Stethoscope,
    accent: "from-[#173E9A] via-[#24708E] to-[#E5BD45]",
    glow: "bg-[#E2C05B]/22",
    badge: "Dental Corporate Website",
    features: [
      "Professional healthcare-focused corporate design",
      "Company profile and laboratory introduction",
      "Dental restoration services presentation",
      "Clear mission, values and quality communication",
      "Product information for dental professionals",
      "User-friendly navigation and enquiry support",
      "Modern front-end presentation",
      "Mobile, tablet and desktop compatibility",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "UI/UX Design",
      "Modern Front-End Development",
    ],
  },
];

const capabilities = [
  {
    icon: Workflow,
    title: "Business-First Planning",
    text: "Every experience is structured around the audience, business objective and practical user journey.",
    iconBg: "from-[#4B22FF] to-[#7B5CFF]",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Experiences",
    text: "Layouts are designed to feel clear and usable across desktop, tablet and mobile screens.",
    iconBg: "from-[#FF2F7D] to-[#FF7CA8]",
  },
  {
    icon: Code2,
    title: "Modern Development",
    text: "Clean front-end implementation supports performance, maintainability and future growth.",
    iconBg: "from-[#00B8FF] to-[#4B22FF]",
  },
  {
    icon: Rocket,
    title: "Outcome-Focused Delivery",
    text: "The final product is built to improve visibility, enquiries, engagement or operational access.",
    iconBg: "from-[#FF2F7D] to-[#4B22FF]",
  },
];


function TypewriterText({
  text,
  speed = 100,
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

function DesktopFrame({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-[#090D25] p-2.5 shadow-[0_32px_90px_rgba(8,10,42,0.38)] sm:p-3">
      <div className="flex h-9 items-center gap-2 rounded-t-[15px] border-b border-white/10 bg-white/[0.08] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />

        <div className="ml-3 flex h-5 flex-1 items-center rounded-full bg-white/[0.08] px-3 text-[8px] font-semibold text-white/45">
          artmilap.com
        </div>
      </div>

      <div className="relative aspect-[1901/910] overflow-hidden rounded-b-[15px] bg-[#14052f]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function MobileFrame({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto w-full max-w-[230px] rounded-[30px] border-[5px] border-[#10152F] bg-[#10152F] p-[3px] shadow-[0_24px_60px_rgba(11,14,48,0.28)] sm:max-w-[280px] sm:rounded-[36px] sm:border-[6px] lg:max-w-[310px] xl:max-w-[330px] xl:rounded-[42px] xl:border-[7px] xl:p-[4px] xl:shadow-[0_34px_80px_rgba(11,14,48,0.30)]">
      <div className="absolute left-1/2 top-[6px] z-20 h-[13px] w-[68px] -translate-x-1/2 rounded-full bg-[#10152F] sm:top-[8px] sm:h-[16px] sm:w-[82px] xl:top-[9px] xl:h-[18px] xl:w-[92px]" />

      <div className="relative aspect-[497/743] overflow-hidden rounded-[22px] bg-white sm:rounded-[27px] xl:rounded-[31px]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 479px) 230px, (max-width: 767px) 280px, (max-width: 1279px) 310px, 330px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full ${project.glow} blur-[90px]`}
      />

      <div className="relative z-10">
        {project.imageMode === "desktop" ? (
          <DesktopFrame project={project} />
        ) : (
          <MobileFrame project={project} />
        )}
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#e6e1f2] bg-white/[0.76] p-4 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br ${accent} text-white shadow-[0_6px_16px_rgba(27,22,75,0.12)]`}
        >
          <Icon size={14} />
        </span>

        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#081232]">
          {label}
        </p>
      </div>

      <p className="mt-2 text-[11px] font-semibold leading-5 text-[#27314f]/72">
        {value}
      </p>
    </div>
  );
}

function ProjectSection({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = project.icon;
  const reverse = index % 2 === 1;

  return (
    <article
      id={project.name.toLowerCase().replaceAll(" ", "-")}
      className="relative scroll-mt-24 overflow-hidden rounded-[24px] border sm:scroll-mt-28 sm:rounded-[30px] border-[#e2ddec] bg-white shadow-[0_24px_76px_rgba(30,20,80,0.10)]"
    >
      <div
        className={`absolute inset-x-0 top-0 z-30 h-[5px] bg-gradient-to-r ${project.accent}`}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden bg-[#fbfaff] px-4 py-7 sm:px-7 sm:py-9 lg:px-9 lg:py-11 xl:px-10 xl:py-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.11)_1px,transparent_1px)] [background-size:25px_25px]" />
        <div
          className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${project.accent} opacity-[0.10] blur-[80px]`}
        />

        <div
          className="relative z-10 grid items-center gap-9 sm:gap-11 xl:grid-cols-[1.02fr_0.98fr] xl:gap-14"
        >
          <div className={reverse ? "xl:order-2" : ""}>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${project.accent} px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(75,34,255,0.20)]`}
              >
                <Icon size={14} />
                {project.badge}
              </span>

              <span className="rounded-full border border-[#ded8ec] bg-white px-4 py-2 text-[10px] font-bold text-[#34405f]/62">
                Project {project.number}
              </span>
            </div>

            <h2 className="mt-5 text-[31px] font-bold leading-[1.08] tracking-[-0.04em] text-[#081232] sm:mt-6 sm:text-[40px] lg:text-[46px]">
              {project.name}
            </h2>

            <p
              className={`mt-3 max-w-[640px] bg-gradient-to-r ${project.accent} bg-clip-text text-[12px] font-bold leading-6 text-transparent sm:text-[13px]`}
            >
              {project.category}
            </p>

            <p className="mt-5 max-w-[680px] text-[12px] font-medium leading-6 text-[#34405f]/72 sm:mt-6 sm:text-[13px] sm:leading-7">
              {project.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:mt-7">
              <DetailItem
                icon={BriefcaseBusiness}
                label="Client"
                value={project.client}
                accent={project.accent}
              />
              <DetailItem
                icon={Clock3}
                label="Project Status"
                value={project.duration}
                accent={project.accent}
              />
              <DetailItem
                icon={Globe2}
                label="Industry"
                value={project.industry}
                accent={project.accent}
              />
              <DetailItem
                icon={MonitorSmartphone}
                label="Platform"
                value={project.platform}
                accent={project.accent}
              />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`group inline-flex w-full items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r ${project.accent} px-5 py-3.5 text-[11px] font-bold text-white shadow-[0_12px_30px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1 sm:w-auto sm:px-6`}
              >
                {project.linkLabel}
                <ExternalLink
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-[12px] border border-[#ded8ec] bg-white px-5 py-3.5 text-center text-[11px] font-bold text-[#081232] transition-all duration-300 hover:-translate-y-1 hover:border-[#4B22FF] hover:text-[#4B22FF] sm:w-auto sm:px-6"
              >
                Start a Similar Project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className={reverse ? "xl:order-1" : ""}>
            <ProjectVisual project={project} />
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-t border-[#e6e1f2] xl:grid-cols-2">
        <div className="p-5 sm:p-8 lg:p-9 xl:p-10">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br ${project.accent} text-white shadow-[0_10px_22px_rgba(35,25,88,0.16)]`}
            >
              <Layers3 size={21} />
            </div>

            <div>
              <p
                className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
                  project.number === "01"
                    ? "text-[#CDAE3D]"
                    : "text-[#FF315D]"
                }`}
              >
                <TypewriterText
                  text="Product Experience"
                  speed={76}
                  delay={100}
                  cursorClassName={
                    project.number === "01"
                      ? "bg-[#F4E178]"
                      : "bg-[#FF2F7D]"
                  }
                />
              </p>
              <h3 className="mt-1 text-[20px] font-bold text-[#081232]">
                Main Features
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className={`flex items-start gap-3 rounded-[14px] border px-4 py-3.5 ${
                  project.number === "01"
                    ? "border-[#E2D7F5] bg-[linear-gradient(135deg,#FBF9FF,#F3EEFC)]"
                    : "border-[#ece7fb] bg-[linear-gradient(135deg,#fbfaff,#f5f1ff)]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${project.accent} text-white`}
                >
                  <CheckCircle2 size={13} />
                </span>
                <p className="text-[11px] font-semibold leading-5 text-[#34405f]/72">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative overflow-hidden border-t border-[#e6e1f2] p-5 text-white sm:p-8 lg:p-9 xl:border-l xl:border-t-0 xl:p-10 ${
            project.number === "01"
              ? "bg-[linear-gradient(145deg,#181030_0%,#290D40_55%,#3A164F_120%)]"
              : "bg-[linear-gradient(145deg,#061330_0%,#17104b_52%,#5e155b_115%)]"
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[85px] ${
              project.number === "01"
                ? "bg-[#793DDC]/24"
                : "bg-[#FF315D]/18"
            }`}
          />
          <div
            className={`pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full blur-[85px] ${
              project.number === "01"
                ? "bg-[#F4E178]/12"
                : "bg-[#4B22FF]/20"
            }`}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br ${project.accent} text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]`}
            >
              <Rocket size={21} />
            </div>

            <div>
              <p
                className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
                  project.number === "01"
                    ? "text-[#F4E178]"
                    : "text-[#FF7CA8]"
                }`}
              >
                <TypewriterText
                  text="Result and Impact"
                  speed={76}
                  delay={100}
                  cursorClassName={
                    project.number === "01"
                      ? "bg-[#F4E178]"
                      : "bg-[#FF7CA8]"
                  }
                />
              </p>
              <h3 className="mt-1 text-[20px] font-bold text-white">
                Value Created
              </h3>
            </div>
          </div>

          <p className="relative z-10 mt-6 text-[12px] font-medium leading-7 text-white/68">
            {project.impact}
          </p>

          <div className="relative z-10 mt-7">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/42">
              Technologies and Capabilities
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className={`rounded-full px-3 py-2 text-[9px] font-bold ${
                    project.number === "01"
                      ? "border border-[#A782E8]/28 bg-[#793DDC]/10 text-[#F7EAA0]"
                      : "border border-white/12 bg-white/[0.06] text-white/72"
                  }`}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <>
      <main className="overflow-hidden bg-white text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-12 sm:px-6 sm:pb-18 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -left-40 -top-36 h-[520px] w-[520px] rounded-full bg-[#4B22FF]/12 blur-[140px]" />
          <div className="pointer-events-none absolute -right-40 top-[-110px] h-[520px] w-[520px] rounded-full bg-[#FF315D]/12 blur-[140px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.12)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 xl:grid-cols-[0.88fr_1.12fr] xl:gap-14">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Sparkles size={15} className="text-[#FF2F7D]" />
                <TypewriterText
                  text="Selected Work"
                  speed={88}
                  delay={100}
                  nowrap
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF2F7D]"
                  cursorClassName="bg-[#FF2F7D]"
                />
              </div>

              <h1 className="mt-6 max-w-[860px] font-bold tracking-[-0.045em] text-[#081232] sm:mt-7 sm:tracking-[-0.05em]">
                <span className="block text-[38px] leading-[1.08] min-[430px]:text-[42px] sm:text-[54px] lg:text-[58px] xl:text-[58px] 2xl:text-[62px]">
                  Digital Products
                </span>

                {/* Mobile: keep the complete highlighted phrase on one line */}
                <span className="mt-2 flex max-w-full overflow-visible pb-[0.14em] text-[29px] leading-[1.08] min-[370px]:text-[31px] min-[430px]:text-[34px] sm:hidden">
                  <TypewriterText
                    text="Built for Real Impact"
                    speed={105}
                    delay={220}
                    nowrap
                    className="pb-[0.08em] bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent"
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </span>

                {/* Tablet and laptop: same gradient as Culture and Healthcare */}
                <span className="mt-2 hidden overflow-visible pb-[0.12em] text-[48px] leading-[1.08] sm:flex lg:text-[52px] xl:text-[50px] 2xl:text-[54px]">
                  <TypewriterText
                    text="Built for Real Impact"
                    speed={105}
                    delay={220}
                    nowrap
                    className="pb-[0.06em] bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent"
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </span>
              </h1>

              <p className="mt-7 max-w-[650px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
                Explore real projects delivered across culture, healthcare and
                specialised professional services - each shaped around its
                audience, business goals and user journey.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4B22FF] to-[#FF315D] px-6 py-4 text-[12px] font-bold text-white shadow-[0_14px_34px_rgba(75,34,255,0.25)] transition-all duration-300 hover:-translate-y-1 sm:w-auto sm:px-7"
                >
                  Discuss Your Project
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <a
                  href="#featured-projects"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-[13px] border border-[#ded8ec] bg-white px-6 py-4 text-[12px] font-bold text-[#081232] transition-all duration-300 hover:-translate-y-1 hover:border-[#4B22FF] hover:text-[#4B22FF] sm:w-auto sm:px-7"
                >
                  View Case Studies
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              <div className="mt-9 grid max-w-[680px] grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
                {[
                  {
                    value: "03",
                    label: "Featured Projects",
                    color: "text-[#4B22FF]",
                  },
                  {
                    value: "03",
                    label: "Industry Verticals",
                    color: "text-[#FF315D]",
                  },
                  {
                    value: "100%",
                    label: "Responsive Design",
                    color: "text-[#00C8FF]",
                  },
                  {
                    value: "Web + App",
                    label: "Product Coverage",
                    color:
                      "bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-[17px] border border-[#e5e0f1] bg-white/75 px-2.5 py-4 sm:px-3.5 shadow-[0_10px_28px_rgba(35,25,88,0.05)] backdrop-blur sm:px-4"
                  >
                    <p
                      className={`whitespace-nowrap overflow-visible pb-[0.12em] text-[16px] font-bold leading-[1.08] sm:text-[18px] xl:text-[16px] 2xl:text-[18px] ${item.color}`}
                    >
                      {item.value}
                    </p>
                    <p className="mt-2 text-[9px] font-semibold leading-4 text-[#34405f]/58">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO COLLAGE */}
            <div className="relative mx-auto min-h-[300px] w-full max-w-[820px] sm:min-h-[500px] xl:min-h-[570px]">
              <div className="absolute left-1/2 top-[58px] z-20 w-[96%] -translate-x-1/2 sm:left-[2%] sm:top-[9%] sm:w-[88%] sm:translate-x-0">
                <DesktopFrame project={projects[0]} />
              </div>

              <div className="absolute bottom-[0%] left-[3%] z-30 hidden w-[24%] min-w-[125px] rotate-[-5deg] sm:block lg:min-w-[130px]">
                <MobileFrame project={projects[1]} />
              </div>

              <div className="absolute bottom-[1%] right-[0%] z-30 hidden w-[24%] min-w-[125px] rotate-[5deg] sm:block lg:min-w-[130px]">
                <MobileFrame project={projects[2]} />
              </div>

              <div className="absolute right-0 top-0 z-40 max-w-[210px] rounded-[15px] border border-[#e2ddec] bg-white px-3 py-2.5 shadow-[0_14px_34px_rgba(35,27,84,0.12)] sm:right-[1%] sm:top-[1%] sm:max-w-none sm:rounded-[18px] sm:px-4 sm:py-3 sm:shadow-[0_18px_42px_rgba(35,27,84,0.12)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#4B22FF] to-[#FF2F7D] text-white shadow-[0_10px_22px_rgba(75,34,255,0.20)]">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#FF2F7D]">
                      Real Projects
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-[#081232]">
                      Live Digital Experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF2F7D]">
                <TypewriterText
                  text="How We Create Value"
                  speed={86}
                  delay={100}
                  cursorClassName="bg-[#FF2F7D]"
                />
              </p>
              <h2 className="mt-4 font-bold tracking-[-0.04em] text-[#081232]">
                <span className="block text-[31px] leading-[1.15] sm:text-[40px] lg:text-[44px]">
                  From Business Need to
                </span>

                <span className="mt-1 flex justify-center overflow-visible pb-[0.1em] text-[31px] leading-[1.15] sm:text-[40px] lg:text-[44px]">
                  <TypewriterText
                    text="Purposeful Experience"
                    speed={105}
                    delay={220}
                    nowrap
                    className="pb-[0.06em] bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent"
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </span>
              </h2>
              <p className="mt-5 text-[13px] font-medium leading-7 text-[#34405f]/65">
                The projects combine strategy, design and development to make
                information clearer, interactions easier and digital presence
                more valuable.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
              {capabilities.map((capability) => {
                const Icon = capability.icon;

                return (
                  <article
                    key={capability.title}
                    className="group rounded-[21px] border border-[#e4dff0] bg-white p-5 sm:rounded-[23px] sm:p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#cec4ff] hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
                  >
                    <div
                      className={`flex h-[52px] w-[52px] items-center justify-center rounded-[17px] bg-gradient-to-br ${capability.iconBg} text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-[18px] font-bold text-[#081232]">
                      {capability.title}
                    </h3>
                    <p className="mt-3 text-[12px] font-medium leading-6 text-[#34405f]/64">
                      {capability.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="featured-projects"
          className="bg-[#fbfaff] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF2F7D]">
                  <TypewriterText
                    text="Featured Case Studies"
                    speed={86}
                    delay={100}
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </p>
                <h2 className="mt-4 max-w-[820px] font-bold tracking-[-0.04em] text-[#081232]">
                  <span className="block text-[34px] leading-[1.12] sm:text-[43px] lg:text-[48px]">
                    Real Work Across
                  </span>

                  <span className="mt-1 flex overflow-visible pb-[0.1em] text-[34px] leading-[1.12] sm:text-[43px] lg:text-[48px]">
                    <TypewriterText
                      text="Culture and Healthcare"
                      speed={105}
                      delay={220}
                      nowrap
                      className="pb-[0.06em] bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent"
                      cursorClassName="bg-[#FF2F7D]"
                    />
                  </span>
                </h2>
              </div>

              <p className="max-w-[470px] text-[13px] font-medium leading-7 text-[#34405f]/65 xl:text-right">
                Each project below includes its audience, purpose, core
                features, technology coverage and the value created through the
                final digital experience.
              </p>
            </div>

            <div className="mt-14">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className={index === 0 ? "" : "mt-16 sm:mt-20 lg:mt-24"}
                >
                  {/* Clear case-study marker */}
                  <div className="mb-5 flex items-center gap-2 sm:mb-8 sm:gap-4">
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[#d8d0ea] to-[#d8d0ea] sm:block" />

                    <div className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ded8ec] bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(35,25,88,0.06)] sm:w-auto sm:shrink-0 sm:gap-3 sm:px-5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                        Case Study
                      </span>

                      <span
                        className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-gradient-to-r ${project.accent} px-2 text-[10px] font-black text-white`}
                      >
                        {project.number}
                      </span>

                      <span className="hidden text-[11px] font-bold text-[#081232] sm:inline">
                        {project.name}
                      </span>
                    </div>

                    <div className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-[#d8d0ea] to-[#d8d0ea] sm:block" />
                  </div>

                  <div
                    className={`rounded-[26px] p-px sm:rounded-[34px] lg:rounded-[38px] ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-[#ebe6ff] via-white to-[#ffe5ef]"
                        : "bg-gradient-to-br from-[#e7f2ff] via-white to-[#ffe7f0]"
                    }`}
                  >
                    <div className="rounded-[25px] bg-white/55 p-1.5 sm:rounded-[33px] sm:p-2.5 lg:rounded-[37px] lg:p-3">
                      <ProjectSection project={project} index={index} />
                    </div>
                  </div>

                  {index < projects.length - 1 && (
                    <div className="mt-10 flex items-center gap-2 sm:mt-12 sm:gap-4 lg:mt-14">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d9d2e8] to-[#d9d2e8]" />

                      <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#f1edff,#fff0f5)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7B3CFF]">
                        Next Project
                        <ArrowRight size={13} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d9d2e8] to-[#d9d2e8]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY NOTE */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1320px] gap-8 rounded-[24px] border border-[#e2ddec] bg-white p-5 shadow-[0_22px_70px_rgba(30,20,80,0.07)] sm:rounded-[30px] sm:p-8 lg:p-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-center xl:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#f1edff,#fff0f5)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF315D]">
                <Network size={14} className="text-[#FF2F7D]" />

                <TypewriterText
                  text="One Team, Multiple Capabilities"
                  speed={76}
                  delay={100}
                  cursorClassName="bg-[#FF2F7D]"
                />
              </span>
              <h2 className="mt-5 font-bold tracking-[-0.04em] text-[#081232]">
                <span className="block text-[30px] leading-[1.14] sm:text-[38px] lg:text-[40px]">
                  Strategy, Design and Development
                </span>

                <span className="mt-1 flex overflow-visible pb-[0.1em] text-[30px] leading-[1.14] sm:text-[38px] lg:text-[40px]">
                  <TypewriterText
                    text="Working Together"
                    speed={105}
                    delay={220}
                    nowrap
                    className="pb-[0.06em] bg-gradient-to-r from-[#4B22FF] via-[#7B3CFF] to-[#FF2F7D] bg-clip-text text-transparent"
                    cursorClassName="bg-[#FF2F7D]"
                  />
                </span>
              </h2>
              <p className="mt-5 max-w-[590px] text-[13px] font-medium leading-7 text-[#34405f]/68">
                From early product planning to responsive implementation, the
                work is connected through one practical delivery approach. This
                keeps the experience aligned with the organisation, its users
                and the outcomes the project needs to support.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Users,
                  title: "Audience Understanding",
                  text: "Clear journeys based on who will use the product and what they need to accomplish.",
                  gradient: "from-[#4B22FF] to-[#7B5CFF]",
                },
                {
                  icon: Layers3,
                  title: "Experience Architecture",
                  text: "Content, screens and actions organised into a simple, understandable structure.",
                  gradient: "from-[#FF2F7D] to-[#FF7CA8]",
                },
                {
                  icon: ShieldCheck,
                  title: "Reliable Implementation",
                  text: "Responsive interfaces built with maintainable and suitable front-end technologies.",
                  gradient: "from-[#00B8FF] to-[#4B22FF]",
                },
                {
                  icon: Rocket,
                  title: "Launch and Growth",
                  text: "Products prepared to support visibility, enquiries, engagement and future evolution.",
                  gradient: "from-[#FF2F7D] to-[#4B22FF]",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#e6e1f2] bg-[#fbfaff] p-5"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br ${item.gradient} text-white shadow-[0_8px_20px_rgba(75,34,255,0.16)]`}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 text-[14px] font-bold text-[#081232]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] font-medium leading-5 text-[#34405f]/62">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-10">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[24px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[28px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF7CA8]">
                  <TypewriterText
                    text="Have a Project in Mind?"
                    speed={82}
                    delay={100}
                    cursorClassName="bg-[#FF7CA8]"
                  />
                </p>
                <h2 className="mt-3 max-w-[790px] font-bold tracking-[-0.035em]">
                  <span className="block text-[30px] leading-[1.16] sm:text-[38px] lg:text-[40px]">
                    Let&apos;s Build a Digital Experience
                  </span>

                  <span className="mt-1 block text-[30px] leading-[1.16] sm:text-[38px] lg:text-[40px]">
                    That Supports Your{" "}
                    <TypewriterText
                      text="Next Stage of Growth"
                      speed={100}
                      delay={260}
                      className="text-[#FF7CA8]"
                      cursorClassName="bg-[#FF7CA8]"
                    />
                  </span>
                </h2>
                <p className="mt-3 max-w-[690px] text-[13px] font-medium leading-7 text-white/65">
                  Share your idea, current challenge or business requirement and
                  start a practical conversation with our team.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-6 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto sm:shrink-0 sm:px-7"
                >
                  Get Free Consultation
                  <ArrowRight
                    size={18}
                    className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-[14px] border border-white/20 bg-white/[0.06] px-6 py-4 text-[12px] font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] sm:w-auto sm:shrink-0 sm:px-7"
                >
                  Contact Us
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
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