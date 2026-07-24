import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#030817] text-white antialiased">
      {/* Dark gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#030817_0%,#061127_48%,#030817_100%)]" />

      {/* Top neon light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#00b8ff] via-[#743cff] to-[#ff2f7d] shadow-[0_0_14px_#00b8ff,0_0_28px_#743cff,0_0_46px_#ff2f7d] motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />

      {/* Top blue glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[-170px] h-[300px] w-[300px] rounded-full bg-[#00b8ff]/10 blur-[110px] motion-safe:animate-[pulse_6s_ease-in-out_infinite] sm:left-[-120px] sm:top-[-140px] sm:h-[340px] sm:w-[340px] sm:blur-[120px]" />

      {/* Top pink glow */}
      <div className="pointer-events-none absolute right-[-170px] top-[-160px] h-[290px] w-[290px] rounded-full bg-[#ff2f7d]/12 blur-[110px] motion-safe:animate-[pulse_7s_ease-in-out_infinite] motion-safe:[animation-delay:1.2s] sm:right-[-100px] sm:top-[-130px] sm:h-[320px] sm:w-[320px] sm:blur-[120px]" />

      {/* Bottom center blue glow */}
      <div className="pointer-events-none absolute -bottom-44 left-1/2 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(38,118,255,0.16)_0%,rgba(44,71,194,0.07)_38%,transparent_72%)] blur-[80px] motion-safe:animate-[pulse_8s_ease-in-out_infinite] sm:-bottom-48 sm:h-[430px] sm:w-[950px] sm:blur-[95px]" />

      {/* Bottom left glow */}
      <div className="pointer-events-none absolute bottom-[-120px] left-[-90px] h-[280px] w-[280px] rounded-full bg-[#00b8ff]/10 blur-[105px]" />

      {/* Bottom right pink glow */}
      <div className="pointer-events-none absolute bottom-[-130px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#ff2f7d]/12 blur-[110px]" />

      {/* Bottom star field */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[190px] opacity-55 sm:h-[250px] sm:opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at 8% 78%, rgba(255,255,255,.95) 0 1px, transparent 1.8px),
            radial-gradient(circle at 16% 66%, rgba(90,160,255,.95) 0 1.2px, transparent 2px),
            radial-gradient(circle at 24% 84%, rgba(255,84,190,.9) 0 1px, transparent 1.8px),
            radial-gradient(circle at 33% 69%, rgba(255,255,255,.9) 0 1px, transparent 1.8px),
            radial-gradient(circle at 42% 88%, rgba(105,120,255,.95) 0 1.2px, transparent 2px),
            radial-gradient(circle at 52% 74%, rgba(255,255,255,.92) 0 1px, transparent 1.8px),
            radial-gradient(circle at 61% 86%, rgba(255,75,175,.9) 0 1.2px, transparent 2px),
            radial-gradient(circle at 71% 67%, rgba(118,150,255,.95) 0 1px, transparent 1.8px),
            radial-gradient(circle at 82% 82%, rgba(255,255,255,.95) 0 1.2px, transparent 2px),
            radial-gradient(circle at 92% 70%, rgba(255,63,160,.9) 0 1px, transparent 1.8px)
          `,
        }}
      />

      {/* Larger twinkling stars */}
      <div className="pointer-events-none absolute bottom-[42px] left-[12%] h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#5aa7ff]" />
      <div className="pointer-events-none absolute bottom-[86px] left-[29%] h-1 w-1 motion-safe:animate-[pulse_2.8s_ease-in-out_infinite] rounded-full bg-[#7fb7ff] shadow-[0_0_7px_#7fb7ff,0_0_16px_#4d67ff]" />
      <div className="pointer-events-none absolute bottom-[58px] left-[47%] h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#9a6bff]" />
      <div className="pointer-events-none absolute bottom-[94px] left-[66%] h-1 w-1 motion-safe:animate-[pulse_3.4s_ease-in-out_infinite] rounded-full bg-[#ff72c5] shadow-[0_0_7px_#ff72c5,0_0_16px_#ff2f7d]" />
      <div className="pointer-events-none absolute bottom-[48px] left-[84%] h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#5a8fff]" />

      {/* Star sparkle crosses */}
      <div className="pointer-events-none absolute bottom-[120px] left-[38%] h-3 w-[1px] bg-white/80 shadow-[0_0_8px_#7ca8ff]">
        <span className="absolute left-[-5px] top-[5px] h-[1px] w-3 bg-white/80" />
      </div>
      <div className="pointer-events-none absolute bottom-[108px] right-[18%] h-3 w-[1px] bg-[#ff8ed0]/80 shadow-[0_0_8px_#ff4fa9]">
        <span className="absolute left-[-5px] top-[5px] h-[1px] w-3 bg-[#ff8ed0]/80" />
      </div>

      {/* Dot mesh */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[190px] opacity-[0.18] sm:h-[245px] sm:opacity-[0.24]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(68,104,255,0.9) 1.25px, transparent 1.4px)",
          backgroundSize: "13px 13px",
          maskImage:
            "linear-gradient(to top, black 0%, black 38%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 38%, transparent 100%)",
        }}
      />

      {/* Curved neon lines */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[220px] w-full opacity-80 sm:block"
        viewBox="0 0 1600 260"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="footerPinkBlueLine"
            x1="0"
            y1="0"
            x2="1600"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00B8FF" stopOpacity="0.2" />
            <stop offset="0.28" stopColor="#6B4BFF" stopOpacity="0.65" />
            <stop offset="0.62" stopColor="#FF2F7D" stopOpacity="0.7" />
            <stop offset="1" stopColor="#FF2F7D" stopOpacity="0.35" />
          </linearGradient>

          <filter
            id="footerGlow"
            x="-20%"
            y="-100%"
            width="140%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="footerNode" cx="0" cy="0" r="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.25" stopColor="#7CC8FF" />
            <stop offset="0.65" stopColor="#6B4BFF" />
            <stop offset="1" stopColor="#FF2F7D" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M-50 220C120 120 250 265 410 185C545 118 640 200 760 155C905 100 980 232 1125 175C1275 116 1370 238 1650 105"
          stroke="url(#footerPinkBlueLine)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#footerGlow)"
        />

        <path
          d="M-30 242C135 155 275 290 430 210C565 140 665 224 790 182C930 135 1010 260 1160 202C1310 144 1410 264 1650 145"
          stroke="#5F8FFF"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="4 7"
          strokeLinecap="round"
        />

        <path
          d="M960 252C1015 185 1055 150 1115 208C1170 260 1215 195 1260 154"
          stroke="#FF2F7D"
          strokeWidth="1.6"
          strokeOpacity="0.5"
          strokeLinecap="round"
          filter="url(#footerGlow)"
        />

        <circle cx="410" cy="185" r="18" fill="url(#footerNode)" />
        <circle cx="760" cy="155" r="18" fill="url(#footerNode)" />
        <circle cx="1125" cy="175" r="18" fill="url(#footerNode)" />
        <circle cx="1460" cy="150" r="20" fill="url(#footerNode)" />
      </svg>

      {/* Right top decorative curve */}
      <svg
        className="pointer-events-none absolute right-0 top-4 hidden h-[95px] w-[190px] opacity-50 md:block"
        viewBox="0 0 190 95"
        fill="none"
      >
        <path
          d="M8 74C54 42 101 36 182 7"
          stroke="#FF2F7D"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 92C78 58 120 53 186 28"
          stroke="#6B4BFF"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 pb-8 pt-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[1.25fr_0.78fr_1fr_0.9fr] lg:gap-8 xl:gap-10">
          {/* Brand */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <Link
              prefetch={false}
              href="/"
              aria-label="MITOMS home"
              className="group inline-flex max-w-full items-center gap-3 transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src="/images/home/mitoms-footer-icon.png"
                alt=""
                width={256}
                height={256}
                sizes="(min-width: 640px) 92px, 78px"
                className="h-auto w-[78px] shrink-0 object-contain drop-shadow-[0_10px_24px_rgba(94,55,255,0.28)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:w-[92px]"
              />

              <div className="min-w-0">
                <p className="text-[35px] font-black leading-none tracking-[-0.045em] text-white sm:text-[40px]">
                  mitoms
                </p>

                <p className="mt-1.5 whitespace-nowrap pl-[2px] text-[8.5px] font-bold uppercase tracking-[0.16em] text-white/68 sm:text-[9.5px]">
                  Technologies Pvt Ltd
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-[14px] font-medium leading-6 text-white/82 sm:mt-6 sm:text-[16px] sm:leading-7 sm:text-white/84">
              We build modern digital products, websites, apps and growth
              solutions for ambitious businesses.
            </p>
          </div>

          {/* Company */}
          <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
            <h3 className="mb-4 text-[16px] font-bold text-white sm:mb-5 sm:text-lg">Company</h3>

            <ul className="space-y-3 text-[14px] text-white/78 sm:text-[15px] sm:text-white/82">
              <li>
                <Link
                  prefetch={false}
                  href="/about/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/portfolio/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Services
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/case-studies/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Case Studies
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/insights/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Insights
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/locations/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Locations
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/contact/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
            <h3 className="mb-4 text-[16px] font-bold text-white sm:mb-5 sm:text-lg">Services</h3>

            <ul className="space-y-3 text-[14px] text-white/78 sm:text-[15px] sm:text-white/82">
              <li>
                <Link
                  prefetch={false}
                  href="/services/web-development/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Website Development
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/mobile-app-development/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Mobile App Development
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/ui-ux-design/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  UI/UX Design
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/cloud-solutions/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  Cloud Solutions
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/ai-digital-transformation/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  AI Development
                </Link>
              </li>

              <li>
                <Link
                  prefetch={false}
                  href="/services/it-consulting/"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#743cff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#743cff]" />
                  IT Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 min-w-0 border-t border-white/10 pt-6 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
            <h3 className="mb-4 text-[16px] font-bold text-white sm:mb-5 sm:text-lg">Contact</h3>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px] text-white/78 sm:text-[15px] sm:text-white/82 lg:flex-col lg:items-start">
              <li className="min-w-0">
                <Link
                  prefetch={false}
                  href="/locations/ghaziabad/web-development-company/"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Delhi NCR, Ghaziabad, Uttar Pradesh, India – 201005
                </Link>
              </li>

              <li>
                <a
                  href="mailto:sales@mitoms.com"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#ff2f7d] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#ff2f7d]" />
                  <span className="break-words">sales@mitoms.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919990794979"
                  className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
                >
                  <span className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-[#00b8ff] opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:shadow-[0_0_10px_#00b8ff]" />
                  +91 99907 94979
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2.5 border-t border-white/10 pb-3 pt-5 text-center text-[12px] leading-5 text-white/68 sm:mt-12 sm:gap-4 sm:pb-0 sm:pt-6 sm:text-[14px] sm:leading-6 md:flex-row md:justify-between md:text-left">
          <p className="max-w-[330px] sm:max-w-none">
            © 2026 MITOMS Technologies Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 md:justify-end">
            <Link
              prefetch={false}
              href="/privacy-policy/"
              className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
            >
              Privacy Policy
            </Link>

            <Link
              prefetch={false}
              href="/terms/"
              className="group/link relative inline-flex items-center transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#743cff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}