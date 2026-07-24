"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
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
  Database,
  Eye,
  FileText,
  Gauge,
  Lightbulb,
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
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { useBidirectionalScrollReveal } from "./useBidirectionalScrollReveal";

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
    gradient: "from-[#ff2f7d] to-[#ff7ca8]",
  },
  {
    icon: Bot,
    title: "Generative AI",
    description:
      "Intelligent assistants, content tools and conversational experiences powered by modern AI.",
    gradient: "from-[#743cff] to-[#ff2f7d]",
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description:
      "Turn business data into useful insights, predictions and more informed decisions.",
    gradient: "from-[#00b8ff] to-[#4b22ff]",
  },
  {
    icon: Network,
    title: "AI Integration",
    description:
      "Connect AI capabilities with your existing software, APIs, databases and business systems.",
    gradient: "from-[#4b22ff] to-[#00b8ff]",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    description:
      "AI solutions designed with security, privacy, reliability and human oversight in mind.",
    gradient: "from-[#ff2f7d] to-[#743cff]",
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
    <div data-service-reveal className="rounded-[19px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] sm:rounded-[22px] sm:p-6">
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

export default function AIDigitalTransformationPage() {
  const [showConsultation, setShowConsultation] = useState(false);

  const openConsultation = () => {
    setShowConsultation(true);
  };

  const pageRef = useBidirectionalScrollReveal<HTMLElement>();

  return (
    <>
      <main ref={pageRef} className="w-full overflow-x-clip bg-white font-sans text-[#07112f] antialiased">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-11">
          <div className="pointer-events-none absolute -left-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

          <div className="pointer-events-none absolute -right-32 top-[-80px] h-[430px] w-[430px] rounded-full bg-[#ff2f7d]/10 blur-[125px]" />

          <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#743cff]/6 blur-[110px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.27] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-9 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            {/* LEFT */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
                <Brain size={15} className="text-[#4b22ff]" />

                <TypewriterText
                  text="AI Development Company in India"
                  speed={82}
                  delay={100}
                  className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </div>

              <h1 className="mt-6 max-w-[780px] overflow-visible font-bold tracking-[-0.05em] text-[#081232] sm:mt-7">
                {/* Mobile */}
                <span className="block text-[34px] leading-[1.08] sm:hidden">
                  Smarter Technology
                </span>

                <span className="mt-1 block overflow-visible pb-[0.08em] pr-[0.12em] text-[34px] leading-[1.08] sm:hidden">
                  for a More{" "}
                  <TypewriterText
                    text="Intelligent"
                    speed={115}
                    delay={280}
                    nowrap
                    className="pb-[0.08em] pr-[0.08em] leading-[1.1] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                <span className="-mt-1 block overflow-visible pb-[0.12em] pr-[0.12em] text-[34px] leading-[1.08] sm:hidden">
                  <TypewriterText
                    text="Business"
                    speed={120}
                    delay={1250}
                    nowrap
                    className="pb-[0.08em] pr-[0.08em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet, laptop and desktop */}
                <span className="hidden whitespace-nowrap text-[42px] leading-[1.08] sm:block lg:text-[46px] xl:text-[50px]">
                  Smarter Technology for
                </span>

                <span className="mt-2 hidden overflow-visible whitespace-nowrap pb-[0.14em] pr-[0.12em] text-[42px] leading-[1.08] sm:block lg:text-[46px] xl:text-[50px]">
                  a More{" "}
                  <TypewriterText
                    text="Intelligent Business"
                    speed={110}
                    delay={280}
                    nowrap
                    className="pb-[0.1em] pr-[0.08em] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-transparent"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-[620px] text-[16px] font-medium leading-7 text-[#27314f]/90 sm:mt-7 sm:text-[17px] sm:leading-[1.8]">
                MITOMS is an AI development company in India helping businesses
                use artificial intelligence, automation and data to simplify
                operations and improve digital experiences.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  onClick={openConsultation}
                  className="group inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)] sm:w-auto sm:px-7"
                >
                  Discuss Your AI Idea

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <Link
                  href="/contact/"
                  className="group inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff] sm:w-auto sm:px-7"
                >
                  Talk to Our Team

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8 grid w-full max-w-[640px] auto-rows-fr grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))] xl:gap-2 2xl:gap-3">
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
                  data-service-reveal
                      className="flex min-h-[76px] h-full w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-[14px] border border-[#e7e2f5] bg-white/85 px-3 py-3 shadow-[0_10px_28px_rgba(34,24,88,0.05)] backdrop-blur sm:min-h-[82px] sm:gap-3 sm:rounded-[16px] sm:px-4 sm:py-4 xl:min-h-0 xl:gap-1.5 xl:px-2 xl:py-3 2xl:gap-2.5 2xl:px-3 2xl:py-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[#4b22ff] xl:h-7 xl:w-7 xl:rounded-[10px] 2xl:h-9 2xl:w-9 2xl:rounded-[12px]">
                        <Icon size={17} className="xl:h-[14px] xl:w-[14px] 2xl:h-[17px] 2xl:w-[17px]" />
                      </div>

                      <span className="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere] text-[12px] font-bold leading-4 text-[#24304f] sm:leading-5 xl:text-[10px] xl:leading-[1.25] 2xl:text-[12px] 2xl:leading-5">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative mt-1 min-h-[300px] min-w-0 sm:mt-0 sm:min-h-[480px] lg:min-h-[550px]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff] sm:block sm:h-[405px] sm:w-[405px] lg:h-[475px] lg:w-[475px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.15),transparent_67%)] sm:block sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]" />

              <Image
                src="/images/home/ai.webp"
                alt="AI and digital transformation"
                width={720}
                height={650}
                priority
                unoptimized
                className="absolute left-1/2 top-1/2 z-20 w-full max-w-[640px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_45px_rgba(32,23,92,0.18)] sm:w-[94%] lg:w-[96%] xl:w-[92%]"
              />

              <div style={{ animationDelay: "0s" }}
                className="ai-float-card absolute left-[0%] top-[8%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
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

              <div style={{ animationDelay: "0.7s" }}
                className="ai-float-card absolute right-[0%] top-[18%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff2f7d] to-[#ff7ca8] text-white">
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

              <div style={{ animationDelay: "1.4s" }}
                className="ai-float-card absolute bottom-[8%] left-[3%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00b8ff] to-[#4b22ff] text-white">
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

              <div style={{ animationDelay: "2.1s" }}
                className="ai-float-card absolute bottom-[2%] right-[1%] z-30 hidden w-[220px] rounded-[22px] border border-[#e5e0f1] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#743cff] to-[#ff2f7d] text-white">
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
        <section className="relative px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Practical Artificial Intelligence"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 max-w-[620px] text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                AI Solutions Created for
                <TypewriterText
                  text="Real Business Challenges"
                  display="block"
                  speed={105}
                  delay={220}
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-6 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Successful AI adoption begins with the right use case. We focus
                on areas where intelligent technology can improve customer
                experience, reduce repetitive work and provide useful business
                insights.
              </p>

              <p className="mt-5 max-w-[610px] text-[16px] font-medium leading-8 text-[#27314f]/88">
                Our team helps with strategy, design, development, integration,
                deployment and continuous improvement of AI-powered solutions.
              </p>

              <button
                type="button"
                onClick={openConsultation}
                className="group mt-7 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff] sm:mt-8 sm:w-auto sm:px-7"
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
                  data-service-reveal
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

                    <p className="mt-2 text-[14px] font-medium leading-6 text-[#27314f]/84">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI SOLUTIONS */}
        <section className="bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff2f7d]">
                <TypewriterText
                  text="AI Solutions"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#ff2f7d]"
                />
              </p>

              <h2 className="mt-4 text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Intelligent Solutions That Create{" "}
                <TypewriterText
                  text="Practical Value"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#4b22ff]"
                  cursorClassName="bg-[#4b22ff]"
                />
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[16px] font-medium leading-7 text-[#27314f]/86">
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
                  data-service-reveal
                    className="group relative overflow-hidden rounded-[21px] border border-[#e4dff1] bg-white p-5 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)] sm:rounded-[24px] sm:p-7"
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
        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid items-end gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                  <TypewriterText
                    text="Digital Transformation"
                    speed={85}
                    delay={100}
                    cursorClassName="bg-[#4b22ff]"
                  />
                </p>

                <h2 className="mt-4 max-w-[620px] text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px] lg:text-[42px]">
                  Transform Important Areas of{" "}
                  <TypewriterText
                    text="Your Business"
                    speed={110}
                    delay={220}
                    nowrap
                    className="text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </h2>
              </div>

              <p className="max-w-[570px] text-[16px] font-medium leading-8 text-[#27314f]/88 lg:justify-self-end">
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
                  data-service-reveal
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

                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#27314f]/84">
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
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[21px] bg-[#041033] px-5 py-12 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:rounded-[24px] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,49,93,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(0,119,255,0.17),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10 mx-auto max-w-[820px] text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#d75cff]">
                <TypewriterText
                  text="AI Technology"
                  speed={90}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#d75cff]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em]">
                {/* Mobile: controlled wrapping */}
                <span className="block text-[28px] leading-[1.16] sm:hidden">
                  Modern Technology
                </span>

                <span className="mt-1 block text-[28px] leading-[1.16] sm:hidden">
                  for{" "}
                  <TypewriterText
                    text="Intelligent Digital"
                    speed={105}
                    delay={220}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                <span className="mt-1 flex justify-center text-[28px] leading-[1.16] sm:hidden">
                  <TypewriterText
                    text="Solutions"
                    speed={105}
                    delay={1050}
                    nowrap
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[38px] leading-[1.16] sm:block lg:text-[44px]">
                  Modern Technology for
                </span>

                <span className="mt-2 hidden justify-center text-[38px] leading-[1.16] sm:flex lg:text-[44px]">
                  <TypewriterText
                    text="Intelligent Digital Solutions"
                    speed={105}
                    delay={220}
                    className="text-[#ff43a1]"
                    cursorClassName="bg-[#ff43a1]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[700px] text-[16px] font-medium leading-7 text-white/82">
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
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Our AI Process"
                  speed={88}
                  delay={100}
                  nowrap
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 font-bold tracking-[-0.04em] text-[#081232]">
                {/* Mobile: exactly two balanced lines */}
                <span className="block text-[27px] leading-[1.16] sm:hidden">
                  From Business Challenge to
                </span>

                <span className="mt-2 flex justify-center overflow-visible pb-[0.12em] text-[27px] leading-[1.16] sm:hidden">
                  <TypewriterText
                    text="Intelligent Implementation"
                    speed={105}
                    delay={220}
                    nowrap
                    className="pb-[0.08em] text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>

                {/* Tablet and desktop */}
                <span className="hidden text-[38px] leading-[1.16] sm:inline lg:text-[44px]">
                  From Business Challenge to{" "}
                </span>

                <span className="hidden text-[38px] leading-[1.16] sm:inline lg:text-[44px]">
                  <TypewriterText
                    text="Intelligent Implementation"
                    speed={105}
                    delay={220}
                    className="text-[#ff2f7d]"
                    cursorClassName="bg-[#ff2f7d]"
                  />
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[690px] text-[16px] font-medium leading-7 text-[#27314f]/86">
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
                  data-service-reveal
                    className="group relative rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
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

        {/* BENEFITS */}
        <section className="relative bg-[#fbfaff] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-[-140px] top-1/4 h-96 w-96 rounded-full bg-[#ff2f7d]/5 blur-[120px]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
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

              <h2 className="mt-4 max-w-[740px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232]">
                {/* Mobile */}
                <span className="block text-[31px] leading-[1.15] sm:hidden">
                  AI Transformation Focused
                </span>

                <span className="mt-1 flex text-[31px] leading-[1.15] sm:hidden">
                  on{" "}
                  <TypewriterText
                    text="Measurable Outcomes"
                    speed={108}
                    delay={220}
                    nowrap
                    className="ml-2 text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>

                {/* Tablet, laptop and desktop */}
                <span className="hidden whitespace-nowrap text-[40px] leading-[1.15] sm:block lg:text-[42px] xl:text-[44px]">
                  AI Transformation Focused
                </span>

                <span className="mt-2 hidden items-baseline whitespace-nowrap text-[40px] leading-[1.15] sm:flex lg:text-[42px] xl:text-[44px]">
                  on{" "}
                  <TypewriterText
                    text="Measurable Outcomes"
                    speed={108}
                    delay={220}
                    nowrap
                    className="ml-2 text-[#4b22ff]"
                    cursorClassName="bg-[#4b22ff]"
                  />
                </span>
              </h2>

              <p className="mt-6 max-w-[600px] text-[16px] font-medium leading-8 text-[#27314f]/88">
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
                  data-service-reveal
                  className="group flex min-h-[96px] items-center gap-4 rounded-[19px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
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
          <div className="mx-auto grid max-w-[1180px] gap-9 sm:gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.26em] text-[#4b22ff]">
                <TypewriterText
                  text="Frequently Asked Questions"
                  speed={80}
                  delay={100}
                  cursorClassName="bg-[#4b22ff]"
                />
              </p>

              <h2 className="mt-4 text-[31px] font-bold leading-[1.15] tracking-[-0.04em] text-[#081232] sm:text-[40px] lg:text-[44px]">
                Questions About
                <TypewriterText
                  text="AI Transformation"
                  display="block"
                  speed={110}
                  delay={220}
                  nowrap
                  className="text-[#ff2f7d]"
                  cursorClassName="bg-[#ff2f7d]"
                />
              </h2>

              <p className="mt-5 max-w-[410px] text-[15px] font-medium leading-7 text-[#27314f]/86">
                Common questions businesses ask when evaluating artificial
                intelligence and automation opportunities.
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
                  data-service-reveal
                  className="group rounded-[18px] border border-[#e4dff1] bg-white p-4 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] open:shadow-[0_16px_38px_rgba(75,34,255,0.08)] sm:rounded-[20px] sm:p-5"
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
          <div data-service-reveal className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[22px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-5 py-10 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:rounded-[26px] sm:px-8 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff7ca8]">
                  <TypewriterText
                    text="Start Your AI Journey"
                    speed={86}
                    delay={100}
                    cursorClassName="bg-[#ff7ca8]"
                  />
                </p>

                <h2 className="mt-3 max-w-[740px] text-[27px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[39px] lg:text-[42px]">
                  Ready to Discover Where AI Can Create Value for Your Business?
                </h2>

                <p className="mt-3 max-w-[670px] text-[15px] font-medium leading-7 text-white/84">
                  Share your business challenge with our team and receive a
                  practical recommendation for AI, automation or digital
                  transformation.
                </p>
              </div>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex min-h-[50px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[13px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
              >
                Start an AI Project

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

      <style>{`

        .ai-float-card {
          animation: aiFloat 6.8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes aiFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .ai-float-card {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}