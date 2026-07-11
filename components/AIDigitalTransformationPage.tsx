"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Database,
  Eye,
  FileText,
  Gauge,
  Layers3,
  Lightbulb,
  LockKeyhole,
  MessageSquareText,
  Network,
  RefreshCcw,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const capabilities = [
  {
    icon: Target,
    title: "AI Strategy",
    description:
      "A practical AI roadmap connected to your business challenges, priorities and expected outcomes.",
    gradient: "from-[#4b22ff] to-[#7b5cff]",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Automate repetitive workflows and help teams complete everyday tasks more efficiently.",
    gradient: "from-[#ff315d] to-[#ff72a3]",
  },
  {
    icon: Bot,
    title: "Generative AI",
    description:
      "Intelligent assistants, content tools and conversational experiences powered by modern AI.",
    gradient: "from-[#8b3dff] to-[#ff315d]",
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description:
      "Turn business data into useful insights, predictions and more informed decisions.",
    gradient: "from-[#00aef0] to-[#4b22ff]",
  },
  {
    icon: Network,
    title: "AI Integration",
    description:
      "Connect AI capabilities with your existing software, APIs, databases and business systems.",
    gradient: "from-[#4b22ff] to-[#00aef0]",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    description:
      "AI solutions designed with security, privacy, reliability and human oversight in mind.",
    gradient: "from-[#ff315d] to-[#8b3dff]",
  },
];

const solutions = [
  {
    icon: MessageSquareText,
    number: "01",
    title: "AI Assistants and Chatbots",
    description:
      "Conversational assistants for customer support, internal knowledge and employee productivity.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Workflow Automation",
    description:
      "Automate repetitive operational processes, approvals, notifications and information handling.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Predictive Analytics",
    description:
      "Use historical business data to identify trends, risks and potential future outcomes.",
  },
  {
    icon: FileText,
    number: "04",
    title: "Document Intelligence",
    description:
      "Extract, categorize, summarize and process information from documents and business records.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Recommendation Systems",
    description:
      "Deliver personalized products, content and experiences based on user behavior and preferences.",
  },
  {
    icon: Eye,
    number: "06",
    title: "Computer Vision",
    description:
      "Analyze images and visual information for recognition, classification and automated inspection.",
  },
];

const process = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description:
      "We understand your processes, challenges, data, users and expected business outcomes.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Define the Use Case",
    description:
      "We identify where AI can create practical and measurable value for the business.",
  },
  {
    icon: Database,
    number: "03",
    title: "Plan Data and Architecture",
    description:
      "We define data requirements, integrations, technology and solution architecture.",
  },
  {
    icon: Code2,
    number: "04",
    title: "Build",
    description:
      "Our team develops the AI workflow, application experience and required integrations.",
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Test and Validate",
    description:
      "We evaluate accuracy, performance, security, usability and real-world business behavior.",
  },
  {
    icon: Rocket,
    number: "06",
    title: "Deploy and Improve",
    description:
      "We launch the solution, monitor results and continue improving its effectiveness.",
  },
];

const transformationAreas = [
  {
    icon: Users,
    title: "Customer Experience",
    description:
      "Provide faster support, personalized communication and more relevant digital experiences.",
  },
  {
    icon: Workflow,
    title: "Business Operations",
    description:
      "Simplify repetitive tasks and improve coordination between people, tools and processes.",
  },
  {
    icon: BarChart3,
    title: "Decision Making",
    description:
      "Use business data and AI insights to support faster and more informed decisions.",
  },
  {
    icon: RefreshCcw,
    title: "Legacy Modernization",
    description:
      "Upgrade existing systems and connect them with modern cloud, automation and AI capabilities.",
  },
  {
    icon: FileText,
    title: "Knowledge Management",
    description:
      "Make company documents and internal knowledge easier to search, understand and use.",
  },
  {
    icon: Sparkles,
    title: "Product Innovation",
    description:
      "Add intelligent features and experiences to websites, applications and digital products.",
  },
];

const technologyGroups = [
  {
    icon: Brain,
    title: "AI and Machine Learning",
    items: [
      "Large Language Models",
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Engines",
    ],
  },
  {
    icon: Bot,
    title: "Generative AI",
    items: [
      "AI Assistants",
      "Chatbots",
      "Content Generation",
      "Knowledge Search",
      "Prompt Engineering",
    ],
  },
  {
    icon: Database,
    title: "Data and Integration",
    items: [
      "Python",
      "Vector Databases",
      "PostgreSQL",
      "REST APIs",
      "Data Pipelines",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud and Delivery",
    items: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Monitoring",
      "Secure Deployment",
    ],
  },
];

const benefits = [
  "AI strategy aligned with business priorities",
  "Reduction in repetitive manual work",
  "Faster access to business information",
  "Better customer and employee experiences",
  "Integration with existing digital systems",
  "Secure and scalable AI architecture",
  "Human review and responsible AI practices",
  "Continuous monitoring and improvement",
];

const faqs = [
  {
    question: "How can AI help my business?",
    answer:
      "AI can help automate repetitive work, improve customer support, analyze business data, organize documents, provide recommendations and add intelligent features to digital products. The right use case depends on your current processes and objectives.",
  },
  {
    question: "Does my business need a large amount of data?",
    answer:
      "Not every AI project requires a large proprietary dataset. Some solutions can use existing AI models, business documents, structured databases or carefully designed workflows. Data requirements are evaluated during discovery.",
  },
  {
    question: "Can AI integrate with our existing software?",
    answer:
      "Yes. AI solutions can be connected with websites, mobile applications, CRMs, internal portals, databases and third-party systems through suitable APIs and integrations.",
  },
  {
    question: "How do you protect confidential business data?",
    answer:
      "The solution can include access controls, secure infrastructure, controlled data processing, monitoring and suitable model or hosting choices based on the sensitivity of your information.",
  },
  {
    question: "Can you begin with a small AI proof of concept?",
    answer:
      "Yes. A focused proof of concept is often a practical way to validate the use case, evaluate results and understand the potential value before developing a larger solution.",
  },
];

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
    <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]">
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

export default function AIDigitalTransformationPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

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
            {/* LEFT */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Brain size={15} className="text-[#4b22ff]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#4b22ff]">
                  AI &amp; Digital Transformation
                </span>
              </div>

              <h1 className="mt-7 max-w-[700px] text-[43px] font-bold leading-[1.07] tracking-[-0.05em] text-[#081232] sm:text-[55px] lg:text-[64px]">
                Smarter Technology
                <span className="mt-2 block">
                  for a More{" "}
                  <span className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent">
                    Intelligent Business
                  </span>
                </span>
              </h1>

              <p className="mt-7 max-w-[620px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
                We help businesses use artificial intelligence, automation and
                data to simplify operations, improve experiences and create new
                opportunities for sustainable growth.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]"
                >
                  Discuss Your AI Idea

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/contact"
                  className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
                >
                  Talk to Our Team

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-10 grid max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    icon: Brain,
                    title: "Intelligent",
                  },
                  {
                    icon: Workflow,
                    title: "Automated",
                  },
                  {
                    icon: BarChart3,
                    title: "Data Driven",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Responsible",
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

            {/* RIGHT VISUAL */}
            <div className="relative min-h-[550px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[475px] w-[475px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.15),transparent_67%)]" />

              <Image
                src="/images/home/ai.png"
                alt="AI and digital transformation"
                width={720}
                height={650}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 w-[86%] max-w-[590px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)]"
              />

              <div className="absolute left-[0%] top-[8%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#7b5cff] text-white">
                    <Bot size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      AI Assistants
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Intelligent conversations
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute right-[0%] top-[18%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff315d] to-[#ff72a3] text-white">
                    <Workflow size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Smart Automation
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Faster business workflows
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-[3%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00aef0] to-[#4b22ff] text-white">
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Data Insights
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Better informed decisions
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[2%] right-[1%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#8b3dff] to-[#ff315d] text-white">
                    <Rocket size={21} />
                  </div>

                  <div>
                    <p className="text-[13px] font-bold text-[#081232]">
                      Future Ready
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                      Designed for growth
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
                Practical Artificial Intelligence
              </p>

              <h2 className="mt-4 max-w-[620px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                AI Solutions Created for
                <span className="block text-[#ff315d]">
                  Real Business Challenges
                </span>
              </h2>

              <p className="mt-6 max-w-[610px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                Successful AI adoption begins with the right use case. We focus
                on areas where intelligent technology can improve customer
                experience, reduce repetitive work and provide useful business
                insights.
              </p>

              <p className="mt-5 max-w-[610px] text-[14px] font-medium leading-8 text-[#34405f]/68">
                Our team helps with strategy, design, development, integration,
                deployment and continuous improvement of AI-powered solutions.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Explore an AI Use Case

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

        {/* AI SOLUTIONS */}
        <section className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
                AI Solutions
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                Intelligent Solutions That Create{" "}
                <span className="text-[#4b22ff]">Practical Value</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                We build focused AI capabilities according to your users,
                processes, data and business requirements.
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
                      onClick={openConsultation}
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

        {/* TRANSFORMATION AREAS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                  Digital Transformation
                </p>

                <h2 className="mt-4 max-w-[620px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                  Transform Important Areas of{" "}
                  <span className="text-[#ff315d]">Your Business</span>
                </h2>
              </div>

              <p className="max-w-[570px] text-[14px] font-medium leading-8 text-[#34405f]/67 lg:justify-self-end">
                Digital transformation connects people, processes, technology
                and information. We help modernize important experiences while
                keeping the solution practical and manageable.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {transformationAreas.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="px-4 py-8 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#041033] px-6 py-16 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[820px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
                AI Technology
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] sm:text-[44px]">
                Modern Technology for
                <span className="block text-[#ff43a1]">
                  Intelligent Digital Solutions
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[700px] text-[14px] font-medium leading-7 text-white/62">
                The final technology stack is selected according to the use
                case, data requirements, integrations, security and expected
                scale.
              </p>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {technologyGroups.map((group) => (
                <TechnologyCard key={group.title} {...group} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
                Our AI Process
              </p>

              <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                From Business Challenge to{" "}
                <span className="text-[#ff315d]">
                  Intelligent Implementation
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[14px] font-medium leading-7 text-[#34405f]/65">
                Our structured approach helps validate the opportunity before
                developing and deploying the complete solution.
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
                Why Choose MITOMS
              </p>

              <h2 className="mt-4 max-w-[610px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
                AI Transformation Focused on{" "}
                <span className="text-[#4b22ff]">Measurable Outcomes</span>
              </h2>

              <p className="mt-6 max-w-[600px] text-[14px] font-medium leading-8 text-[#34405f]/67">
                We focus on solving business problems rather than adding AI only
                because it is popular. Every solution is planned around
                usefulness, adoption, integration and long-term maintainability.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-8 inline-flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
              >
                Work With Our AI Team

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
                  AI Transformation
                </span>
              </h2>

              <p className="mt-5 max-w-[410px] text-[13px] font-medium leading-7 text-[#34405f]/65">
                Common questions businesses ask when evaluating artificial
                intelligence and automation opportunities.
              </p>

              <button
                type="button"
                onClick={openConsultation}
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
                  Start Your AI Journey
                </p>

                <h2 className="mt-3 max-w-[740px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                  Ready to Discover Where AI Can Create Value for Your Business?
                </h2>

                <p className="mt-3 max-w-[670px] text-[13px] font-medium leading-7 text-white/65">
                  Share your business challenge with our team and receive a
                  practical recommendation for AI, automation or digital
                  transformation.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1"
              >
                Start an AI Project

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