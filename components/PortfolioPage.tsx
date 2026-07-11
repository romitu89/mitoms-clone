"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ElementType,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Globe2,
  Layers3,
  MousePointerClick,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const categories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Cloud Solutions",
  "AI Solutions",
] as const;

type Category = (typeof categories)[number];

type ProjectCategory = Exclude<Category, "All">;

type VisualType =
  | "commerce"
  | "mobile"
  | "dashboard"
  | "cloud"
  | "ai"
  | "finance";

type Project = {
  name: string;
  category: ProjectCategory;
  label: string;
  title: string;
  description: string;
  tags: string[];
  outcomes: string[];
  icon: ElementType;
  visual: VisualType;
  visualGradient: string;
  accent: string;
  layout: "wide" | "compact";
};

const projects: Project[] = [
  {
    name: "Nova Commerce",
    category: "Web Development",
    label: "Concept E-Commerce Platform",
    title: "A Faster Shopping Experience Built to Convert",
    description:
      "A modern commerce experience focused on simple product discovery, smooth checkout and scalable catalogue management.",
    tags: ["Next.js", "Node.js", "Payments", "Commerce"],
    outcomes: [
      "Simplified product discovery",
      "Conversion-focused checkout",
      "Responsive shopping experience",
      "Scalable product architecture",
    ],
    icon: ShoppingCart,
    visual: "commerce",
    visualGradient:
      "linear-gradient(145deg, #120a3b 0%, #431c90 52%, #ff315d 130%)",
    accent: "#ff4e8b",
    layout: "wide",
  },
  {
    name: "PulseCare",
    category: "Mobile Apps",
    label: "Concept Healthcare Application",
    title: "Healthcare Access Designed Around Everyday Users",
    description:
      "A patient-focused mobile product for appointments, reports, reminders and secure communication.",
    tags: ["React Native", "Healthcare", "Mobile UX"],
    outcomes: [
      "Clear appointment journey",
      "Secure patient access",
      "Simple medical records",
      "Real-time notifications",
    ],
    icon: Smartphone,
    visual: "mobile",
    visualGradient:
      "linear-gradient(145deg, #041d45 0%, #075da8 52%, #24bce8 125%)",
    accent: "#42d8ff",
    layout: "compact",
  },
  {
    name: "FlowDesk",
    category: "UI/UX Design",
    label: "Concept SaaS Product",
    title: "Complex Workflows Made Clear and Manageable",
    description:
      "A modular SaaS interface designed to help teams organize tasks, projects and business operations.",
    tags: ["Product Design", "Dashboard", "Design System"],
    outcomes: [
      "Clearer navigation",
      "Reusable design system",
      "Faster task completion",
      "Development-ready components",
    ],
    icon: Palette,
    visual: "dashboard",
    visualGradient:
      "linear-gradient(145deg, #211048 0%, #6630a6 55%, #ff5a8e 130%)",
    accent: "#b77cff",
    layout: "compact",
  },
  {
    name: "OrbitOps",
    category: "Cloud Solutions",
    label: "Concept Cloud Operations Platform",
    title: "Infrastructure Visibility Without the Complexity",
    description:
      "A cloud operations dashboard created to simplify monitoring, deployment and infrastructure management.",
    tags: ["Cloud", "DevOps", "Monitoring", "Automation"],
    outcomes: [
      "Centralized monitoring",
      "Deployment visibility",
      "Faster issue identification",
      "Scalable cloud operations",
    ],
    icon: Cloud,
    visual: "cloud",
    visualGradient:
      "linear-gradient(145deg, #03132e 0%, #0a407f 55%, #5532c5 125%)",
    accent: "#5dc8ff",
    layout: "wide",
  },
  {
    name: "InsightIQ",
    category: "AI Solutions",
    label: "Concept AI Intelligence Platform",
    title: "Business Knowledge Turned Into Useful Answers",
    description:
      "An intelligent workspace that helps teams search documents, summarize information and discover insights.",
    tags: ["Generative AI", "Knowledge Search", "Automation"],
    outcomes: [
      "Faster knowledge discovery",
      "Context-aware assistance",
      "Document summarization",
      "Secure information access",
    ],
    icon: Brain,
    visual: "ai",
    visualGradient:
      "linear-gradient(145deg, #130738 0%, #48208d 52%, #d9288c 125%)",
    accent: "#ff6ab5",
    layout: "wide",
  },
  {
    name: "Finora",
    category: "Web Development",
    label: "Concept Fintech Dashboard",
    title: "Financial Information Made Easier to Understand",
    description:
      "A responsive financial dashboard for transactions, reporting, cash-flow visibility and business insights.",
    tags: ["Fintech", "Analytics", "Dashboard"],
    outcomes: [
      "Clear financial reporting",
      "Responsive data views",
      "Simplified transactions",
      "Decision-ready insights",
    ],
    icon: BarChart3,
    visual: "finance",
    visualGradient:
      "linear-gradient(145deg, #071d37 0%, #073f57 55%, #10a59b 125%)",
    accent: "#48e5c2",
    layout: "compact",
  },
];

const strengths = [
  {
    icon: MousePointerClick,
    title: "Conversion-Focused",
    description:
      "Every interaction is planned to move users toward a clear and valuable action.",
  },
  {
    icon: Code2,
    title: "Designed to Be Built",
    description:
      "Design decisions remain practical, scalable and connected to real engineering.",
  },
  {
    icon: ShieldCheck,
    title: "Quality at Every Stage",
    description:
      "Performance, responsiveness, usability and maintainability are considered from day one.",
  },
];

const process = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We understand the business, audience, product requirements and desired outcomes.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Shape",
    description:
      "We create the product structure, user journey and practical delivery roadmap.",
  },
  {
    icon: Palette,
    number: "03",
    title: "Design",
    description:
      "We transform ideas into responsive, intuitive and visually memorable experiences.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Build and Grow",
    description:
      "We develop, launch and continuously improve the product as the business evolves.",
  },
];

function ProjectVisual({ project }: { project: Project }) {
  const Icon = project.icon;

  return (
    <div
      className="relative h-[315px] overflow-hidden rounded-[22px]"
      style={{ background: project.visualGradient }}
    >
      <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-[65px]" />

      <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#ff4c9c]/20 blur-[75px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:19px_19px]" />

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-white/15 bg-white/10 text-white backdrop-blur">
          <Icon size={18} />
        </div>
      </div>

      {project.visual === "commerce" && (
        <div className="absolute bottom-5 left-5 right-5 top-[70px] rounded-[18px] border border-white/15 bg-white/[0.09] p-4 backdrop-blur-md">
          <div className="flex h-full gap-3">
            <div className="hidden w-[24%] rounded-[13px] border border-white/10 bg-white/[0.07] p-3 sm:block">
              <div className="h-3 w-16 rounded-full bg-white/35" />

              <div className="mt-5 space-y-3">
                {[74, 55, 82, 63].map((width) => (
                  <div
                    key={width}
                    className="h-2 rounded-full bg-white/15"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-3 w-24 rounded-full bg-white/50" />
                  <div className="mt-2 h-2 w-16 rounded-full bg-white/20" />
                </div>

                <div
                  className="h-8 w-20 rounded-[10px]"
                  style={{ backgroundColor: project.accent }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-[13px] border border-white/10 bg-white/[0.08] p-2"
                  >
                    <div className="h-[72px] rounded-[9px] bg-white/15" />

                    <div className="mt-3 h-2.5 w-4/5 rounded-full bg-white/40" />
                    <div className="mt-2 h-2 w-1/2 rounded-full bg-white/18" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {project.visual === "mobile" && (
        <>
          <div className="absolute left-1/2 top-[62px] h-[230px] w-[122px] -translate-x-1/2 rounded-[27px] border-[5px] border-white/25 bg-[#071735]/80 p-2 shadow-2xl backdrop-blur">
            <div className="mx-auto h-2 w-10 rounded-full bg-white/20" />

            <div className="mt-3 rounded-[12px] bg-white/10 p-3">
              <div className="h-8 w-8 rounded-[10px] bg-white/20" />

              <div className="mt-3 h-2.5 w-full rounded-full bg-white/45" />
              <div className="mt-2 h-2 w-3/5 rounded-full bg-white/20" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-11 rounded-[10px] bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="absolute left-[8%] top-[112px] rounded-[14px] border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white backdrop-blur">
            Appointments
          </div>

          <div className="absolute bottom-[55px] right-[7%] rounded-[14px] border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-bold text-white backdrop-blur">
            Secure Records
          </div>
        </>
      )}

      {project.visual === "dashboard" && (
        <div className="absolute bottom-5 left-5 right-5 top-[70px] flex overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.08] backdrop-blur">
          <div className="w-[68px] border-r border-white/10 bg-white/[0.04] p-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[11px]"
              style={{ backgroundColor: project.accent }}
            >
              <Layers3 size={17} className="text-white" />
            </div>

            <div className="mt-5 space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="mx-auto h-7 w-7 rounded-[9px] bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <div className="h-3 w-28 rounded-full bg-white/45" />
                <div className="mt-2 h-2 w-16 rounded-full bg-white/18" />
              </div>

              <div className="h-8 w-8 rounded-[10px] bg-white/10" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[62, 78, 48].map((value) => (
                <div
                  key={value}
                  className="rounded-[12px] border border-white/10 bg-white/[0.07] p-3"
                >
                  <div className="h-2 w-10 rounded-full bg-white/20" />
                  <div className="mt-3 text-[16px] font-bold text-white">
                    {value}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex h-[75px] items-end gap-2 rounded-[12px] bg-white/[0.06] px-3 pb-3">
              {[34, 62, 44, 78, 58, 90, 70].map((height) => (
                <div
                  key={height}
                  className="flex-1 rounded-t-[4px] bg-white/25"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {project.visual === "cloud" && (
        <div className="absolute inset-x-5 bottom-5 top-[72px]">
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur">
            <Cloud size={40} />
          </div>

          {[
            "left-[4%] top-[15%]",
            "right-[4%] top-[15%]",
            "left-[8%] bottom-[10%]",
            "right-[8%] bottom-[10%]",
          ].map((position, index) => (
            <div
              key={position}
              className={`absolute ${position} flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/15 bg-white/10 text-white backdrop-blur`}
            >
              {index === 0 && <Code2 size={22} />}
              {index === 1 && <ShieldCheck size={22} />}
              {index === 2 && <Workflow size={22} />}
              {index === 3 && <Zap size={22} />}
            </div>
          ))}

          <div className="absolute left-[21%] top-[35%] h-px w-[22%] rotate-[18deg] bg-white/20" />
          <div className="absolute right-[21%] top-[35%] h-px w-[22%] -rotate-[18deg] bg-white/20" />
          <div className="absolute bottom-[30%] left-[21%] h-px w-[22%] -rotate-[18deg] bg-white/20" />
          <div className="absolute bottom-[30%] right-[21%] h-px w-[22%] rotate-[18deg] bg-white/20" />
        </div>
      )}

      {project.visual === "ai" && (
        <div className="absolute bottom-5 left-5 right-5 top-[70px] rounded-[18px] border border-white/15 bg-white/[0.08] p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[14px]"
              style={{ backgroundColor: project.accent }}
            >
              <Brain size={22} className="text-white" />
            </div>

            <div>
              <div className="h-3 w-28 rounded-full bg-white/45" />
              <div className="mt-2 h-2 w-20 rounded-full bg-white/18" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="ml-auto max-w-[78%] rounded-[14px_14px_4px_14px] bg-white/15 p-3">
              <div className="h-2 w-full rounded-full bg-white/35" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-white/18" />
            </div>

            <div className="max-w-[86%] rounded-[14px_14px_14px_4px] border border-white/10 bg-white/[0.08] p-3">
              <div className="h-2 w-full rounded-full bg-white/30" />
              <div className="mt-2 h-2 w-4/5 rounded-full bg-white/18" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-white/18" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center rounded-[12px] border border-white/10 bg-white/[0.08] px-3 py-3">
            <div className="h-2 flex-1 rounded-full bg-white/20" />
            <div
              className="ml-3 flex h-7 w-7 items-center justify-center rounded-[9px]"
              style={{ backgroundColor: project.accent }}
            >
              <ArrowRight size={14} className="text-white" />
            </div>
          </div>
        </div>
      )}

      {project.visual === "finance" && (
        <div className="absolute bottom-5 left-5 right-5 top-[70px] rounded-[18px] border border-white/15 bg-white/[0.08] p-4 backdrop-blur">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[13px] bg-white/[0.08] p-3">
              <div className="h-2 w-14 rounded-full bg-white/20" />
              <div className="mt-3 text-[18px] font-bold text-white">
                $84.2K
              </div>
              <div className="mt-2 h-2 w-20 rounded-full bg-white/15" />
            </div>

            <div className="rounded-[13px] bg-white/[0.08] p-3">
              <div className="h-2 w-14 rounded-full bg-white/20" />
              <div className="mt-3 text-[18px] font-bold text-white">
                +24.8%
              </div>
              <div className="mt-2 h-2 w-20 rounded-full bg-white/15" />
            </div>
          </div>

          <div className="mt-3 flex h-[105px] items-end gap-2 rounded-[13px] bg-white/[0.06] px-4 pb-4">
            {[32, 55, 43, 68, 59, 84, 75, 95].map((height) => (
              <div
                key={height}
                className="flex-1 rounded-t-[5px]"
                style={{
                  height: `${height}%`,
                  backgroundColor: project.accent,
                  opacity: 0.55 + height / 250,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [showConsultation, setShowConsultation] =
    useState(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    if (selectedProject) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const openConsultation = () => {
    setSelectedProject(null);
    setShowConsultation(true);
  };

  return (
    <>
      <main className="overflow-hidden bg-white text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#4b22ff]/10 blur-[135px]" />

          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full bg-[#ff315d]/10 blur-[135px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Sparkles size={15} className="text-[#4b22ff]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]">
                  Selected Digital Work
                </span>
              </div>

              <h1 className="mt-7 max-w-[720px] text-[42px] font-bold leading-[1.06] tracking-[-0.05em] text-[#081232] sm:text-[54px] lg:text-[62px]">
  <span className="block">Turning Ideas Into</span>

  <span className="mt-2 block bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent">
    Memorable Products
  </span>
</h1>

              <p className="mt-7 max-w-[630px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
                Explore product concepts demonstrating how strategy, design
                and engineering can work together to create useful,
                scalable and business-focused digital experiences.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#featured-work"
                  className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Our Work

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                >
                  Start Your Project

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              <div className="mt-10 grid max-w-[650px] grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    icon: MousePointerClick,
                    label: "Product Strategy",
                  },
                  {
                    icon: Palette,
                    label: "UI/UX Design",
                  },
                  {
                    icon: Code2,
                    label: "Development",
                  },
                  {
                    icon: Rocket,
                    label: "Launch & Growth",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[16px] border border-[#e6e1f2] bg-white/85 px-4 py-4 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur"
                    >
                      <Icon size={18} className="text-[#4b22ff]" />

                      <p className="mt-3 text-[10px] font-bold text-[#24304f]">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative min-h-[570px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[490px] w-[490px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cec4ff]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.15),transparent_68%)]" />

              <div className="absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-[28px] border border-white/70 bg-white p-3 shadow-[0_35px_80px_rgba(38,25,104,0.22)] transition-transform duration-500 hover:rotate-0">
                <ProjectVisual project={projects[0]} />
              </div>

              <div className="absolute left-[-1%] top-[8%] z-30 rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                  Strategy
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Business First
                </p>
              </div>

              <div className="absolute bottom-[4%] right-[-1%] z-30 rounded-[18px] border border-[#e3def1] bg-white px-4 py-3 shadow-[0_18px_42px_rgba(35,27,84,0.11)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#4b22ff]">
                  Experience
                </p>

                <p className="mt-1 text-[13px] font-bold text-[#081232]">
                  Designed to Convert
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section
          id="featured-work"
          className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                  Featured Work
                </p>

                <h2 className="mt-4 max-w-[760px] text-[35px] font-bold leading-[1.15] tracking-[-0.045em] text-[#081232] sm:text-[46px]">
                  Digital Products Created to{" "}
                  <span className="text-[#4b22ff]">
                    Solve Real Problems
                  </span>
                </h2>

                <p className="mt-5 max-w-[700px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                  These concept case studies will later be replaced with
                  your real projects, screenshots, technologies and business
                  results.
                </p>
              </div>

              <p className="text-[12px] font-bold text-[#34405f]/50">
                {filteredProjects.length} projects displayed
              </p>
            </div>

            {/* FILTERS */}
            <div className="mt-10 flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`cursor-pointer rounded-full border px-5 py-3 text-[11px] font-bold transition-all duration-300 ${
                      isActive
                        ? "border-[#4b22ff] bg-[#4b22ff] text-white shadow-[0_10px_24px_rgba(75,34,255,0.22)]"
                        : "border-[#e1dced] bg-white text-[#34405f]/65 hover:-translate-y-0.5 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* PROJECT GRID */}
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              {filteredProjects.map((project) => {
                const Icon = project.icon;

                return (
                  <article
                    key={project.name}
                    className={`group overflow-hidden rounded-[28px] border border-[#e2ddec] bg-white shadow-[0_14px_40px_rgba(35,25,88,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(75,34,255,0.13)] ${
                      project.layout === "wide"
                        ? "lg:col-span-7"
                        : "lg:col-span-5"
                    }`}
                  >
                    <div
                      className={
                        project.layout === "wide"
                          ? "grid h-full md:grid-cols-[1.05fr_0.95fr]"
                          : "flex h-full flex-col"
                      }
                    >
                      <div className="p-3">
                        <ProjectVisual project={project} />
                      </div>

                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#f0ecff] text-[#4b22ff]">
                            <Icon size={21} />
                          </div>

                          <span className="rounded-full border border-[#e6e1f1] bg-[#fbfaff] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#6e7590]">
                            Concept Case Study
                          </span>
                        </div>

                        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff315d]">
                          {project.label}
                        </p>

                        <h3 className="mt-3 text-[23px] font-bold leading-[1.2] tracking-[-0.03em] text-[#081232]">
                          {project.title}
                        </h3>

                        <p className="mt-4 text-[12px] font-medium leading-6 text-[#34405f]/62">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#f3f0ff] px-3 py-2 text-[9px] font-bold text-[#4b22ff]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="group/button mt-7 inline-flex cursor-pointer items-center gap-2 self-start text-[12px] font-bold text-[#081232] transition-colors hover:text-[#4b22ff]"
                        >
                          Explore Case Study

                          <ChevronRight
                            size={17}
                            className="transition-transform duration-300 group-hover/button:translate-x-1.5"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUE SECTION */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#041033] px-6 py-16 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.28),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.20),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.18),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                  What Makes the Work Different
                </p>

                <h2 className="mt-4 max-w-[560px] text-[35px] font-bold leading-[1.15] tracking-[-0.04em] sm:text-[46px]">
                  Not Just Attractive.
                  <span className="block text-[#ff43a1]">
                    Designed for Business.
                  </span>
                </h2>

                <p className="mt-6 max-w-[540px] text-[14px] font-medium leading-7 text-white/60">
                  A successful digital product should create a strong first
                  impression while remaining useful, scalable and easy to
                  maintain.
                </p>

                <button
                  type="button"
                  onClick={openConsultation}
                  className="group mt-8 inline-flex cursor-pointer items-center gap-3 rounded-[13px] bg-white px-6 py-4 text-[12px] font-bold text-[#081232] transition-all duration-300 hover:-translate-y-1"
                >
                  Discuss Your Product

                  <ArrowRight
                    size={17}
                    className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {strengths.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[23px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.085]"
                    >
                      <div className="flex h-13 w-13 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_28px_rgba(75,34,255,0.25)]">
                        <Icon size={23} />
                      </div>

                      <h3 className="mt-6 text-[18px] font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[12px] font-medium leading-6 text-white/55">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[790px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Our Product Approach
              </p>

              <h2 className="mt-4 text-[35px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[46px]">
                From the First Conversation to{" "}
                <span className="text-[#ff315d]">
                  a Market-Ready Product
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[680px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                Every project follows a collaborative process that connects
                business strategy, user experience and reliable engineering.
              </p>
            </div>

            <div className="relative mt-14">
              <div className="pointer-events-none absolute left-[11%] right-[11%] top-[34px] hidden h-px bg-gradient-to-r from-[#4b22ff] via-[#ff315d] to-[#4b22ff] opacity-25 lg:block" />

              <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {process.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
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
                    </div>
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
                  Your Project Could Be Next
                </p>

                <h2 className="mt-3 max-w-[760px] text-[31px] font-bold tracking-[-0.035em] sm:text-[40px]">
                  Have an Idea That Deserves an Exceptional Digital Experience?
                </h2>

                <p className="mt-3 max-w-[670px] text-[13px] font-medium leading-7 text-white/65">
                  Tell us about your business challenge and let us create a
                  practical roadmap for design, development and launch.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Project

                <ArrowRight
                  size={18}
                  className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.name} case study`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030817]/75 px-4 py-8 backdrop-blur-md"
        >
          <div className="relative w-full max-w-[980px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#081232]/75 text-white backdrop-blur transition-transform duration-300 hover:rotate-90"
            >
              <X size={20} />
            </button>

            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="bg-[#f8f6ff] p-4 sm:p-6">
                <ProjectVisual project={selectedProject} />
              </div>

              <div className="p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ff315d]">
                  {selectedProject.label}
                </p>

                <h2 className="mt-3 text-[30px] font-bold leading-[1.12] tracking-[-0.04em] text-[#081232]">
                  {selectedProject.title}
                </h2>

                <p className="mt-5 text-[13px] font-medium leading-7 text-[#34405f]/65">
                  {selectedProject.description}
                </p>

                <div className="mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4b22ff]">
                    Product Focus
                  </p>

                  <div className="mt-4 grid gap-3">
                    {selectedProject.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="flex items-center gap-3 rounded-[13px] bg-[#f7f5ff] px-4 py-3"
                      >
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-[#4b22ff]"
                        />

                        <span className="text-[11px] font-bold text-[#34405f]/75">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#eeeaff] px-3 py-2 text-[9px] font-bold text-[#4b22ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={openConsultation}
                  className="group mt-7 inline-flex cursor-pointer items-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-6 py-4 text-[12px] font-bold text-white shadow-[0_14px_28px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1"
                >
                  Build a Similar Product

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </>
  );
}