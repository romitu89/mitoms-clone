import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The requested page could not be found on the MITOMS Technologies website.",
  path: "/404/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[68vh] items-center overflow-hidden bg-[#fbfaff] px-4 py-20 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute -left-32 -top-28 h-[420px] w-[420px] rounded-full bg-[#4B22FF]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-100px] h-[420px] w-[420px] rounded-full bg-[#FF2F7D]/12 blur-[120px]" />

      <section className="relative mx-auto w-full max-w-[860px] rounded-[28px] border border-[#e3dcf6] bg-white/88 px-6 py-14 text-center shadow-[0_24px_70px_rgba(44,26,110,0.12)] backdrop-blur sm:px-10 sm:py-18">
        <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#FF2F7D]">
          Error 404
        </p>
        <h1 className="mt-5 text-[40px] font-bold leading-tight tracking-[-0.045em] text-[#081232] sm:text-[58px]">
          This page could not be found
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] text-[16px] font-medium leading-7 text-[#34405f] sm:text-[18px]">
          The link may be outdated or the page may have moved. Return to the
          homepage or explore our digital technology services.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] px-7 text-[14px] font-bold text-white shadow-[0_14px_32px_rgba(75,34,255,0.25)] transition-transform hover:-translate-y-1"
          >
            Go to Homepage
          </Link>
          <Link
            href="/services/"
            className="inline-flex min-h-[50px] items-center justify-center rounded-[12px] border border-[#dcd5ed] bg-white px-7 text-[14px] font-bold text-[#081232] transition-all hover:-translate-y-1 hover:border-[#4B22FF] hover:text-[#4B22FF]"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </main>
  );
}
