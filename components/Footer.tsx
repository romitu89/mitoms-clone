import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#030817] text-white">
      {/* Dark gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#030817_0%,#061127_48%,#030817_100%)]" />

      {/* Top neon light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#22b8ff] via-[#6b46ff] to-[#ff2f7d] shadow-[0_0_14px_#22b8ff,0_0_28px_#6b46ff,0_0_46px_#ff2f7d]" />

      {/* Top blue glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[340px] w-[340px] rounded-full bg-[#087cff]/10 blur-[120px]" />

      {/* Top pink glow */}
      <div className="pointer-events-none absolute right-[-100px] top-[-130px] h-[320px] w-[320px] rounded-full bg-[#ff2f7d]/12 blur-[120px]" />

      {/* Bottom center blue glow */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[430px] w-[950px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(38,118,255,0.16)_0%,rgba(44,71,194,0.07)_38%,transparent_72%)] blur-[95px]" />

      {/* Bottom left glow */}
      <div className="pointer-events-none absolute bottom-[-120px] left-[-90px] h-[280px] w-[280px] rounded-full bg-[#1f9cff]/10 blur-[105px]" />

      {/* Bottom right pink glow */}
      <div className="pointer-events-none absolute bottom-[-130px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#ff2f7d]/12 blur-[110px]" />

      {/* Bottom star field */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[250px] opacity-70"
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
      <div className="pointer-events-none absolute bottom-[42px] left-[12%] h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#5aa7ff]" />
      <div className="pointer-events-none absolute bottom-[86px] left-[29%] h-1 w-1 animate-pulse rounded-full bg-[#7fb7ff] shadow-[0_0_7px_#7fb7ff,0_0_16px_#4d67ff]" />
      <div className="pointer-events-none absolute bottom-[58px] left-[47%] h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#9a6bff]" />
      <div className="pointer-events-none absolute bottom-[94px] left-[66%] h-1 w-1 animate-pulse rounded-full bg-[#ff72c5] shadow-[0_0_7px_#ff72c5,0_0_16px_#ff2f9b]" />
      <div className="pointer-events-none absolute bottom-[48px] left-[84%] h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_#fff,0_0_18px_#5a8fff]" />

      {/* Star sparkle crosses */}
      <div className="pointer-events-none absolute bottom-[120px] left-[38%] h-3 w-[1px] bg-white/80 shadow-[0_0_8px_#7ca8ff]">
        <span className="absolute left-[-5px] top-[5px] h-[1px] w-3 bg-white/80" />
      </div>
      <div className="pointer-events-none absolute bottom-[108px] right-[18%] h-3 w-[1px] bg-[#ff8ed0]/80 shadow-[0_0_8px_#ff4fa9]">
        <span className="absolute left-[-5px] top-[5px] h-[1px] w-3 bg-[#ff8ed0]/80" />
      </div>

      {/* Dot mesh */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[245px] opacity-[0.24]"
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
        className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-full opacity-80"
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
            <stop stopColor="#1FA8FF" stopOpacity="0.2" />
            <stop offset="0.28" stopColor="#6B4BFF" stopOpacity="0.65" />
            <stop offset="0.62" stopColor="#FF2F9B" stopOpacity="0.7" />
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
            <stop offset="1" stopColor="#FF2F9B" stopOpacity="0" />
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
          stroke="#FF2F9B"
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
        className="pointer-events-none absolute right-0 top-4 h-[95px] w-[190px] opacity-50"
        viewBox="0 0 190 95"
        fill="none"
      >
        <path
          d="M8 74C54 42 101 36 182 7"
          stroke="#FF2F9B"
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

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent">
                M
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">MITOMS</h2>

                <p className="text-xs font-semibold text-white/70">
                  Technologies Pvt. Ltd.
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              We build modern digital products, websites, apps and growth
              solutions for ambitious businesses.
            </p>
          </div>

          {/* Company */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="mb-5 text-lg font-bold">Company</h3>

            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/portfolio"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="mb-5 text-lg font-bold">Services</h3>

            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Website Development
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Mobile App Development
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-white"
                >
                  UI/UX Design
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition-colors duration-300 hover:text-white"
                >
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="mb-5 text-lg font-bold">Contact</h3>

            <ul className="space-y-3 text-sm text-white/65">
              <li>India</li>

              <li>
                <a
                  href="mailto:info@mitoms.com"
                  className="transition-colors duration-300 hover:text-white"
                >
                  info@mitoms.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+910000000000"
                  className="transition-colors duration-300 hover:text-white"
                >
                  +91 00000 00000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MITOMS Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}