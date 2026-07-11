"use client";

import { useState } from "react";
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
  Sparkles,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

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
    gradient: "from-[#00aef0] to-[#4b22ff]",
  },
  {
    icon: ShieldCheck,
    title: "Secure Architecture",
    description:
      "Reliable development practices focused on security, privacy and stability.",
    gradient: "from-[#ff315d] to-[#8b3dff]",
  },
  {
    icon: Search,
    title: "SEO-Friendly Structure",
    description:
      "Clean, accessible and search-engine-friendly website architecture.",
    gradient: "from-[#8b3dff] to-[#ff315d]",
  },
  {
    icon: Blocks,
    title: "Scalable Solutions",
    description:
      "Flexible architecture that can grow with your users, services and business.",
    gradient: "from-[#4b22ff] to-[#00aef0]",
  },
  {
    icon: Wrench,
    title: "Maintenance and Support",
    description:
      "Continuous monitoring, updates, improvements and technical assistance.",
    gradient: "from-[#ff315d] to-[#ff72a3]",
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

function TechnologyGroup({
  icon: Icon,
  title,
  technologies,
}: {
  icon: React.ElementType;
  title: string;
  technologies: string[];
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_25px_rgba(75,34,255,0.24)]">
          <Icon size={22} />
        </div>

        <h3 className="text-[17px] font-bold text-white">{title}</h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-[11px] font-semibold text-white/68"
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

  return (
    <>
      <main className="overflow-hidden bg-white text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff315d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#673aff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            {/* Hero content */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Code2 size={15} className="text-[#4b22ff]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]">
                  Web Development Services
                </span>
              </div>

              <h1 className="mt-7 max-w-[650px] text-[44px] font-bold leading-[1.07] tracking-[-0.05em] text-[#081232] sm:text-[56px] lg:text-[66px]">
                Websites Built to
                <span className="mt-2 block">
                  Perform, Scale and{" "}
                  <span className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent">
                    Convert
                  </span>
                </span>
              </h1>

              <p className="mt-7 max-w-[600px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
                We design and develop fast, responsive and scalable websites
                that communicate your brand, support your operations and create
                better digital experiences for your customers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setShowConsultation(true)}
                  className="group inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]"
                >
                  Start Your Web Project

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/portfolio"
                  className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                >
                  View Our Work

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-10 grid max-w-[620px] grid-cols-2 gap-3 sm:grid-cols-4">
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
                      className="flex items-center gap-3 rounded-[16px] border border-[#e7e2f5] bg-white/85 px-4 py-4 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff]">
                        <Icon size={17} />
                      </div>

                      <span className="text-[11px] font-bold text-[#24304f]">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative min-h-[530px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.13),transparent_67%)]" />

              <Image
                src="/images/home/laptop.png"
                alt="Web development services"
                width={700}
                height={600}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[620px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)]"
              />

              <div className="absolute left-[1%] top-[9%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
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

              <div className="absolute right-[0%] top-[18%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff315d] to-[#ff72a3] text-white">
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

              <div className="absolute bottom-[8%] left-[4%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00aef0] to-[#4b22ff] text-white">
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

              <div className="absolute bottom-[2%] right-[2%] z-30 hidden w-[215px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#8b3dff] to-[#ff315d] text-white">
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
        <section className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Web Development Partner
              </p>

              <h2 className="mt-4 max-w-[580px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                More Than a Website.
                <span className="block text-[#ff315d]">
                  A Digital Growth Platform.
                </span>
              </h2>

              <p className="mt-6 max-w-[600px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                Your website is often the first interaction a customer has with
                your business. We combine design, development and strategy to
                create websites that look professional, load quickly and make it
                easier for visitors to take action.
              </p>

              <p className="mt-5 max-w-[600px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                From corporate websites to complex web platforms, every project
                is planned around your audience, business processes and future
                growth.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Discuss Your Requirements

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

        {/* SOLUTIONS */}
        <section className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                What We Build
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Web Solutions Designed Around{" "}
                <span className="text-[#4b22ff]">Your Business</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[670px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                We develop websites and web platforms for different business
                models, audiences and operational requirements.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative overflow-hidden rounded-[24px] border border-[#e4dff1] bg-white p-7 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)]"
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
                );
              })}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY STACK */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#041033] px-6 py-16 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[780px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                Technology Stack
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] sm:text-[44px]">
                Modern Technologies for
                <span className="block text-[#ff43a1]">
                  Reliable Web Development
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[670px] text-[14px] font-medium leading-7 text-white/62">
                We choose technologies according to the product requirements,
                business goals, performance needs and expected scale.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <TechnologyGroup
                icon={Code2}
                title="Frontend"
                technologies={frontendTechnologies}
              />

              <TechnologyGroup
                icon={Server}
                title="Backend"
                technologies={backendTechnologies}
              />

              <TechnologyGroup
                icon={Database}
                title="Database"
                technologies={databaseTechnologies}
              />

              <TechnologyGroup
                icon={Cloud}
                title="Cloud and DevOps"
                technologies={cloudTechnologies}
              />
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[760px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Our Process
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                From Initial Idea to{" "}
                <span className="text-[#ff315d]">Successful Launch</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[660px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                A structured and transparent development process keeps your
                project aligned with its goals at every stage.
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

        {/* BENEFITS */}
        <section className="relative bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-[#ff315d]/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                Why MITOMS
              </p>

              <h2 className="mt-4 max-w-[570px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Web Development Focused on{" "}
                <span className="text-[#4b22ff]">Business Results</span>
              </h2>

              <p className="mt-6 max-w-[590px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                We do not approach web development as only a coding exercise.
                Every decision is connected to user experience, performance,
                maintainability and the goals of your business.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[12px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)] transition-all duration-300 hover:-translate-y-1"
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
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-4 text-[34px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[42px]">
                Questions About
                <span className="block text-[#ff315d]">
                  Web Development
                </span>
              </h2>

              <p className="mt-5 max-w-[400px] text-[13px] font-medium leading-7 text-[#34405f]/65">
                Some common questions businesses ask before beginning a website
                or web application project.
              </p>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
                className="group mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-3 rounded-[13px] border border-[#dcd6ef] bg-white px-6 text-[12px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
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
                  className="group rounded-[20px] border border-[#e4dff1] bg-white p-5 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] open:shadow-[0_16px_38px_rgba(75,34,255,0.08)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-[14px] font-bold text-[#081232] sm:text-[15px]">
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
        <section className="px-5 pb-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[26px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-7 py-12 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:px-10 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff84b8]">
                  Build Your Next Website
                </p>

                <h2 className="mt-3 max-w-[700px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                  Ready to Create a Website That Supports Your Business Growth?
                </h2>

                <p className="mt-3 max-w-[640px] text-[13px] font-medium leading-7 text-white/65">
                  Share your requirements with our team and receive a practical
                  development plan for your website or web application.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConsultation(true)}
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

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </>
  );
}