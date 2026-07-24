import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SeoBreadcrumb } from "./SeoContentPage";

export type SeoCollectionItem = {
  title: string;
  description: string;
  href: string;
  meta?: string;
};

type SeoCollectionPageProps = {
  breadcrumbs: readonly SeoBreadcrumb[];
  eyebrow: string;
  title: string;
  introduction: string;
  items: readonly SeoCollectionItem[];
};

export default function SeoCollectionPage({
  breadcrumbs,
  eyebrow,
  title,
  introduction,
  items,
}: SeoCollectionPageProps) {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#07112f] antialiased">
      <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-8 sm:px-6 sm:pb-18 sm:pt-10 lg:px-10 lg:pb-22">
        <div className="pointer-events-none absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#4b22ff]/10 blur-[145px]" />
        <div className="pointer-events-none absolute -right-40 top-[-120px] h-[500px] w-[500px] rounded-full bg-[#ff2f7d]/10 blur-[145px]" />
        <div className="relative mx-auto max-w-[1120px]">
          <nav aria-label="Breadcrumb" className="text-[13px] font-semibold text-[#59627b]">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link href={item.href} className="transition-colors hover:text-[#4b22ff]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-9 max-w-[900px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#4b22ff] sm:text-[13px]">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-[38px] font-bold leading-[1.08] tracking-[-0.045em] text-[#081232] sm:text-[52px] lg:text-[62px]">
              {title}
            </h1>
            <p className="mt-6 max-w-[820px] text-[17px] font-medium leading-8 text-[#27314f]/90 sm:text-[19px] sm:leading-9">
              {introduction}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-22">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[260px] flex-col rounded-[22px] border border-[#e4def2] bg-white p-6 shadow-[0_14px_40px_rgba(31,23,82,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfc5ff] hover:shadow-[0_20px_48px_rgba(75,34,255,0.10)]"
            >
              {item.meta ? (
                <p className="text-[11px] font-bold uppercase tracking-[0.19em] text-[#ff2f7d]">
                  {item.meta}
                </p>
              ) : null}
              <h2 className="mt-4 text-[23px] font-bold leading-8 tracking-[-0.025em] text-[#081232]">
                {item.title}
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#4c5871]">
                {item.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-bold text-[#4b22ff]">
                Read More
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
