"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Home,
  Mail,
  SearchX,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  {
    label: "Services",
    href: "/services",
    icon: Code2,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Mail,
  },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden bg-[#fbfaff] px-4 py-12 font-sans text-[#07112f] sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-36 top-10 h-[430px] w-[430px] rounded-full bg-[#4b22ff]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-28 bottom-[-80px] h-[420px] w-[420px] rounded-full bg-[#ff2f7d]/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/5 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.16)_1px,transparent_1px)] [background-size:27px_27px]" />

      <div className="relative mx-auto w-full max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 xl:gap-20">
          {/* 404 visual */}
          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -left-4 top-16 h-20 w-20 rounded-full border border-[#4b22ff]/15 bg-white/70 shadow-[0_18px_45px_rgba(75,34,255,0.12)] backdrop-blur sm:-left-9">
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4b22ff] shadow-[0_0_18px_rgba(75,34,255,0.8)]" />
            </div>

            <div className="absolute -right-2 bottom-16 h-16 w-16 rounded-[22px] border border-[#ff2f7d]/15 bg-white/75 shadow-[0_16px_40px_rgba(255,47,125,0.12)] backdrop-blur sm:-right-7">
              <span className="absolute left-1/2 top-1/2 h-7 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-gradient-to-b from-[#4b22ff] to-[#ff2f7d]" />
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-[#e2dcf4] bg-white/86 p-5 shadow-[0_35px_100px_rgba(24,16,78,0.14)] backdrop-blur-xl sm:rounded-[36px] sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(75,34,255,0.055),transparent_42%,rgba(255,47,125,0.06))]" />
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#ff2f7d]/8 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-[#4b22ff]/10 blur-[70px]" />

              <div className="relative flex min-h-[365px] items-center justify-center sm:min-h-[455px]">
                <div className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-[#cfc5f1] sm:h-[330px] sm:w-[330px]" />
                <div className="absolute h-[205px] w-[205px] rounded-full border border-[#e6e0f5] sm:h-[255px] sm:w-[255px]" />
                <div className="absolute h-[142px] w-[142px] rounded-full bg-[radial-gradient(circle,rgba(75,34,255,0.11),transparent_68%)] sm:h-[185px] sm:w-[185px]" />

                <div className="absolute left-[9%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#00b8ff] shadow-[0_0_18px_rgba(0,184,255,0.75)]" />
                <div className="absolute right-[12%] top-[24%] h-3 w-3 rounded-full bg-[#ff2f7d] shadow-[0_0_20px_rgba(255,47,125,0.65)]" />
                <div className="absolute bottom-[16%] left-[18%] h-2 w-2 rounded-full bg-[#743cff] shadow-[0_0_17px_rgba(116,60,255,0.7)]" />

                <div className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#4b22ff] via-[#743cff] to-[#ff2f7d] text-white shadow-[0_20px_45px_rgba(75,34,255,0.3)] sm:h-24 sm:w-24 sm:rounded-[28px]">
                    <SearchX size={44} strokeWidth={1.8} />
                  </div>

                  <div className="relative mt-6">
                    <p className="bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text text-[78px] font-black leading-none tracking-[-0.09em] text-transparent sm:text-[112px]">
                      404
                    </p>
                    <div className="mx-auto mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-[#4b22ff] to-[#ff2f7d]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mx-auto max-w-[590px] text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd5fb] bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4b22ff] shadow-[0_10px_28px_rgba(75,34,255,0.07)] backdrop-blur">
              <Sparkles size={14} />
              Page Not Found
            </div>

            <h1 className="mt-6 text-[38px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:text-[50px] lg:text-[58px]">
              This Page Seems to Have
              <span className="mt-2 block bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] bg-clip-text pb-1 text-transparent">
                Disappeared
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[560px] text-[15px] font-medium leading-7 text-[#34405f]/82 sm:text-[16px] sm:leading-8 lg:mx-0">
              The link may be incorrect, the page may have moved, or it may no
              longer exist. Use one of the options below to continue exploring
              MITOMS.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Link
                href="/"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[15px] bg-gradient-to-r from-[#4b22ff] via-[#743cff] to-[#ff2f7d] px-6 text-[14px] font-bold text-white shadow-[0_15px_34px_rgba(75,34,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(255,47,125,0.23)]"
              >
                <Home size={18} />
                Back to Home
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                onClick={() => router.back()}
                className="group inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-3 rounded-[15px] border border-[#dcd5ef] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_10px_26px_rgba(25,18,71,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Previous Page
              </button>
            </div>

            <div className="mt-8 border-t border-[#e6e0f2] pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a7096]">
                Popular Pages
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {quickLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex min-h-[70px] items-center gap-3 rounded-[16px] border border-[#e5dff2] bg-white/85 px-4 py-3 text-left shadow-[0_10px_28px_rgba(30,23,81,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfc4ff] hover:shadow-[0_16px_34px_rgba(75,34,255,0.09)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#f1edff] text-[#4b22ff] transition-colors duration-300 group-hover:bg-[#4b22ff] group-hover:text-white">
                        <Icon size={18} />
                      </span>

                      <span className="text-[13px] font-bold text-[#081232]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-[13px] font-medium leading-6 text-[#63708a]">
              Error code: <span className="font-bold text-[#4b22ff]">404</span> —
              the requested page could not be found.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}