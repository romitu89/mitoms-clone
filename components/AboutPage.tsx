import Link from "next/link";
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  Globe2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "10+",
    label: "Years of Experience",
  },
  {
    icon: Rocket,
    value: "500+",
    label: "Projects Delivered",
  },
  {
    icon: Users,
    value: "250+",
    label: "Happy Clients",
  },
  {
    icon: Globe2,
    value: "25+",
    label: "Countries Served",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation With Purpose",
    description:
      "We use technology to solve real business problems, not simply to follow trends.",
    gradient: "from-[#4b22ff] to-[#805cff]",
  },
  {
    icon: HeartHandshake,
    title: "Partnership First",
    description:
      "We work closely with our clients and treat every project as a shared responsibility.",
    gradient: "from-[#ff315d] to-[#ff72a2]",
  },
  {
    icon: ShieldCheck,
    title: "Quality and Reliability",
    description:
      "Every solution is designed with performance, security and long-term scalability in mind.",
    gradient: "from-[#00aef0] to-[#4b22ff]",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description:
      "Our focus remains on outcomes that support growth, efficiency and better customer experiences.",
    gradient: "from-[#8b3dff] to-[#ff315d]",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable and conversion-focused websites and web applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Modern mobile experiences developed for iOS and Android platforms.",
  },
  {
    icon: Layers3,
    title: "UI/UX Design",
    description:
      "User-focused digital experiences that are intuitive and visually engaging.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Secure, scalable and reliable infrastructure for modern digital products.",
  },
  {
    icon: Brain,
    title: "AI and Automation",
    description:
      "Intelligent systems that improve processes and business productivity.",
  },
  {
    icon: Workflow,
    title: "IT Consulting",
    description:
      "Practical technology strategy aligned with your long-term business goals.",
  },
];

const journeySteps = [
  {
    number: "01",
    icon: Compass,
    title: "Understand",
    description:
      "We begin by understanding your business, customers, challenges and objectives.",
  },
  {
    number: "02",
    icon: Target,
    title: "Plan",
    description:
      "We create a practical roadmap covering design, technology, delivery and growth.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Our team designs and develops a secure, scalable and user-friendly solution.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Grow",
    description:
      "We support, improve and optimize the product as your business continues to evolve.",
  },
];

const reasons = [
  "Business-focused technology solutions",
  "Transparent and collaborative communication",
  "Flexible project and engagement models",
  "Modern and scalable development practices",
  "Strong attention to design and user experience",
  "Ongoing technical support and optimization",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#07112f] antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#fbfaff] px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute -left-32 top-[-80px] h-[420px] w-[420px] rounded-full bg-[#4b22ff]/10 blur-[125px]" />

        <div className="pointer-events-none absolute -right-32 top-[-100px] h-[430px] w-[430px] rounded-full bg-[#ff315d]/10 blur-[125px]" />

        <div className="pointer-events-none absolute bottom-[-230px] left-1/2 h-[420px] w-[950px] -translate-x-1/2 rounded-full bg-[#673aff]/7 blur-[110px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
          {/* Hero content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd6ff] bg-white/80 px-4 py-2 shadow-[0_8px_24px_rgba(75,34,255,0.06)] backdrop-blur">
              <Sparkles size={15} className="text-[#4b22ff]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#4b22ff]">
                About MITOMS
              </span>
            </div>

            <h1 className="mt-7 max-w-[650px] text-[43px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:text-[55px] lg:text-[64px]">
              We Build Technology
              <span className="mt-2 block">
                That Creates{" "}
                <span className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff315d] bg-clip-text text-transparent">
                  Real Impact
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-[610px] text-[15px] font-medium leading-8 text-[#34405f]/72 sm:text-[16px]">
              MITOMS Technologies helps businesses transform ideas into secure,
              scalable and user-friendly digital products. We combine strategy,
              design and engineering to deliver solutions that support
              meaningful business growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4b22ff] to-[#ff315d] px-7 text-[13px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]"
              >
                Start a Conversation

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/services"
                className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-7 text-[13px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
              >
                Explore Our Services

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative min-h-[500px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#cfc5ff]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ded7ff]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.12),transparent_68%)]" />

            {/* Center shape */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[55px] bg-[linear-gradient(145deg,#07153c_0%,#24105f_55%,#ff315d_135%)] shadow-[0_30px_70px_rgba(52,28,130,0.30)]">
              <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#1685ff]/30 blur-[55px]" />

              <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#ff315d]/40 blur-[55px]" />

              <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />

              <div className="relative text-center text-white">
                <p className="text-[62px] font-black leading-none">M</p>

                <p className="mt-3 text-[14px] font-bold tracking-[0.18em]">
                  MITOMS
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Ideas Into Impact
                </p>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute left-[0%] top-[7%] z-30 w-[210px] rounded-[22px] border border-[#e6e1f2] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:left-[4%]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4b22ff] to-[#805cff] text-white">
                  <Lightbulb size={21} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-[#081232]">
                    Smart Ideas
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                    Purpose-driven innovation
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-[0%] top-[18%] z-30 w-[215px] rounded-[22px] border border-[#e6e1f2] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff315d] to-[#ff78a6] text-white">
                  <Users size={21} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-[#081232]">
                    Strong Partnerships
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                    Built on collaboration
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[12%] left-[1%] z-30 w-[215px] rounded-[22px] border border-[#e6e1f2] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur sm:left-[7%]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#00aef0] to-[#4b22ff] text-white">
                  <Code2 size={21} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-[#081232]">
                    Quality Engineering
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                    Secure and scalable
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[2%] right-[2%] z-30 w-[215px] rounded-[22px] border border-[#e6e1f2] bg-white/95 p-4 shadow-[0_18px_42px_rgba(35,27,84,0.11)] backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#8b3dff] to-[#ff315d] text-white">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <p className="text-[13px] font-bold text-[#081232]">
                    Business Growth
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-[#52607a]/55">
                    Results that matter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mx-auto mt-10 grid max-w-[1320px] grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group flex items-center gap-4 rounded-[20px] border border-[#e7e2f5] bg-white/85 px-4 py-5 shadow-[0_12px_32px_rgba(34,24,88,0.06)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_42px_rgba(75,34,255,0.10)] sm:px-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#f0ecff] text-[#4b22ff] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon size={23} />
                </div>

                <div>
                  <p className="text-[24px] font-bold leading-none text-[#4b22ff] sm:text-[28px]">
                    {item.value}
                  </p>

                  <p className="mt-2 text-[10px] font-semibold leading-4 text-[#34405f]/60 sm:text-[11px]">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute -left-28 top-1/3 h-80 w-80 rounded-full bg-[#4b22ff]/5 blur-[110px]" />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative min-h-[480px]">
            <div className="absolute left-0 top-0 h-[400px] w-[88%] overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#07112f_0%,#20105c_55%,#7d1d72_100%)] shadow-[0_30px_70px_rgba(15,12,57,0.20)]">
              <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#1685ff]/25 blur-[90px]" />

              <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

              <svg
                className="pointer-events-none absolute bottom-0 left-0 h-[190px] w-full opacity-60"
                viewBox="0 0 650 200"
                fill="none"
                preserveAspectRatio="none"
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

              <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white sm:p-10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff83b7]">
                    Our Foundation
                  </p>

                  <h3 className="mt-5 max-w-[410px] text-[32px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[38px]">
                    Technology Should Make Business Better
                  </h3>
                </div>

                <p className="max-w-[420px] text-[13px] font-medium leading-7 text-white/65">
                  We believe technology becomes valuable when it simplifies
                  work, creates better experiences and helps people achieve more.
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 z-20 w-[74%] rounded-[25px] border border-[#e4dff2] bg-white p-6 shadow-[0_25px_60px_rgba(32,22,92,0.15)] sm:p-7">
              <MessageSquareText size={30} className="text-[#4b22ff]" />

              <p className="mt-4 text-[17px] font-bold leading-7 text-[#081232] sm:text-[19px]">
                “We treat every client&apos;s vision with the same care,
                responsibility and commitment as our own.”
              </p>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff315d]">
                The MITOMS Approach
              </p>
            </div>
          </div>

          {/* Story content */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
              Our Story
            </p>

            <h2 className="mt-4 max-w-[600px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
              A Technology Partner Focused on{" "}
              <span className="text-[#ff315d]">Long-Term Success</span>
            </h2>

            <p className="mt-6 text-[14px] font-medium leading-8 text-[#34405f]/68">
              MITOMS was built with a simple objective: to help businesses
              access reliable technology expertise without unnecessary
              complexity. We work with startups, growing businesses and
              established organizations to turn ideas into practical digital
              solutions.
            </p>

            <p className="mt-5 text-[14px] font-medium leading-8 text-[#34405f]/68">
              Our team supports clients across product strategy, user
              experience, web and mobile development, cloud infrastructure,
              artificial intelligence and long-term product improvement.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Strategy-led development",
                "User-focused product design",
                "Scalable technology architecture",
                "Transparent project delivery",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[14px] border border-[#e6e1f1] bg-[#fbfaff] px-4 py-3"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#4b22ff]"
                  />

                  <span className="text-[12px] font-bold text-[#24304f]/78">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 text-[13px] font-bold text-[#4b22ff]"
            >
              Learn How We Can Help

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
              What Guides Us
            </p>

            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
              Values Behind Every{" "}
              <span className="text-[#4b22ff]">Solution We Build</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[14px] font-medium leading-7 text-[#34405f]/65">
              Our values influence how we communicate, make decisions and
              deliver technology solutions for our clients.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[24px] border border-[#e5e0f1] bg-white p-7 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(75,34,255,0.12)]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4b22ff]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#ff315d]/8" />

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${item.gradient} text-white shadow-[0_12px_26px_rgba(75,34,255,0.20)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                  >
                    <Icon size={25} />
                  </div>

                  <h3 className="relative mt-6 text-[18px] font-bold leading-6 text-[#081232]">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 text-[13px] font-medium leading-7 text-[#34405f]/62">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-4 py-8 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-[#041033] px-6 py-16 text-white shadow-[0_28px_75px_rgba(4,10,35,0.24)] sm:px-10 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(62,31,255,0.25),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(255,49,93,0.18),transparent_25%),radial-gradient(circle_at_48%_90%,rgba(0,119,255,0.17),transparent_28%)]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 mx-auto max-w-[760px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d96bff]">
              Our Expertise
            </p>

            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] sm:text-[44px]">
              Complete Digital Capabilities,
              <span className="block text-[#ff43a1]">
                One Technology Partner
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[14px] font-medium leading-7 text-white/62">
              From initial strategy to development and long-term optimization,
              our team supports the complete digital-product journey.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[22px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.085]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_12px_28px_rgba(90,45,255,0.25)]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-[17px] font-bold">{item.title}</h3>

                  <p className="mt-3 text-[12px] font-medium leading-6 text-white/58">
                    {item.description}
                  </p>

                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-[#ff78b9]"
                  >
                    Learn More

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4b22ff]">
              How We Work
            </p>

            <h2 className="mt-4 text-[34px] font-bold tracking-[-0.04em] text-[#081232] sm:text-[44px]">
              From Business Challenge to{" "}
              <span className="text-[#ff315d]">Digital Success</span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[14px] font-medium leading-7 text-[#34405f]/65">
              Our structured and collaborative approach keeps every project
              focused, transparent and aligned with business goals.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[35px] hidden h-[2px] bg-gradient-to-r from-[#4b22ff] via-[#ff315d] to-[#4b22ff] opacity-20 lg:block" />

            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {journeySteps.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="group relative rounded-[23px] border border-[#e4dff0] bg-white p-6 shadow-[0_12px_34px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(75,34,255,0.11)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-br from-[#4b22ff] to-[#ff315d] text-white shadow-[0_14px_30px_rgba(75,34,255,0.22)]">
                        <Icon size={29} />
                      </div>

                      <span className="text-[26px] font-black text-[#eeeaff]">
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
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative bg-[#fbfaff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute right-[-150px] top-1/4 h-96 w-96 rounded-full bg-[#ff315d]/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff315d]">
              Why MITOMS
            </p>

            <h2 className="mt-4 max-w-[560px] text-[34px] font-bold leading-[1.16] tracking-[-0.04em] text-[#081232] sm:text-[44px]">
              More Than Developers.
              <span className="block text-[#4b22ff]">
                Your Technology Partner.
              </span>
            </h2>

            <p className="mt-6 max-w-[570px] text-[14px] font-medium leading-8 text-[#34405f]/67">
              We combine technical expertise with a practical understanding of
              business. This allows us to create solutions that are not only
              functional, but also useful, scalable and aligned with long-term
              objectives.
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex h-[50px] items-center justify-center gap-3 rounded-[13px] bg-[#081232] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4b22ff]"
            >
              Work With Our Team

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                className="group flex min-h-[105px] items-start gap-4 rounded-[20px] border border-[#e3deef] bg-white p-5 shadow-[0_10px_30px_rgba(35,25,88,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cec4ff] hover:shadow-[0_18px_40px_rgba(75,34,255,0.09)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f0ecff] text-[12px] font-bold text-[#4b22ff]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <CheckCircle2 size={18} className="text-[#ff315d]" />

                  <p className="mt-2 text-[13px] font-bold leading-6 text-[#24304f]/82">
                    {reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-8 pt-20 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[26px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff315d_125%)] px-7 py-12 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff315d]/35 blur-[95px]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#ff84b8]">
                Let&apos;s Build Together
              </p>

              <h2 className="mt-3 max-w-[700px] text-[30px] font-bold tracking-[-0.035em] sm:text-[38px]">
                Have an Idea That Could Create Real Business Impact?
              </h2>

              <p className="mt-3 max-w-[630px] text-[13px] font-medium leading-7 text-white/65">
                Share your idea with our team and discover the right strategy,
                technology and development approach.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-[14px] bg-white px-7 py-4 text-[12px] font-bold text-[#17163b] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1"
            >
              Contact Our Team

              <ArrowRight
                size={18}
                className="text-[#ff315d] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}