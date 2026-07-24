import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export type SeoBreadcrumb = {
  name: string;
  href: string;
};

export type SeoHighlight = {
  value: string;
  label: string;
};

export type SeoSubsection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type SeoSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  subsections?: readonly SeoSubsection[];
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoRelatedLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

type SeoContentPageProps = {
  breadcrumbs: readonly SeoBreadcrumb[];
  eyebrow: string;
  title: string;
  introduction: string;
  highlights?: readonly SeoHighlight[];
  sections: readonly SeoSection[];
  faqs?: readonly SeoFaq[];
  relatedLinks?: readonly SeoRelatedLink[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  finalCta?: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

function CtaLink({
  href,
  label,
  secondary = false,
}: {
  href: string;
  label: string;
  secondary?: boolean;
}) {
  const className = secondary
    ? "group inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[12px] border border-[#ddd8ee] bg-white px-6 text-[14px] font-bold text-[#081232] shadow-[0_8px_22px_rgba(22,17,62,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4b22ff] hover:text-[#4b22ff]"
    : "group inline-flex min-h-[50px] items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#4525ff] to-[#ff315f] px-6 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(255,49,93,0.24)]";

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

export default function SeoContentPage({
  breadcrumbs,
  eyebrow,
  title,
  introduction,
  highlights = [],
  sections,
  faqs = [],
  relatedLinks = [],
  primaryCta = {
    label: "Discuss Your Project",
    href: "/contact/",
  },
  secondaryCta,
  finalCta = {
    eyebrow: "Start a Conversation",
    title: "Ready to Plan Your Next Digital Project?",
    description:
      "Share your goals, current challenges and expected outcomes. MITOMS will help you define a practical next step.",
    label: "Contact MITOMS",
    href: "/contact/",
  },
}: SeoContentPageProps) {
  return (
    <main className="overflow-hidden bg-white font-sans text-[#07112f] antialiased">
      <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-14 pt-8 sm:px-6 sm:pb-18 sm:pt-10 lg:px-10 lg:pb-22">
        <div className="pointer-events-none absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#4b22ff]/10 blur-[145px]" />
        <div className="pointer-events-none absolute -right-40 top-[-120px] h-[500px] w-[500px] rounded-full bg-[#ff2f7d]/10 blur-[145px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:27px_27px]" />

        <div className="relative mx-auto max-w-[1120px]">
          <nav aria-label="Breadcrumb" className="text-[13px] font-semibold text-[#59627b]">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#4b22ff]"
                  >
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href={primaryCta.href} label={primaryCta.label} />
              {secondaryCta ? (
                <CtaLink
                  href={secondaryCta.href}
                  label={secondaryCta.label}
                  secondary
                />
              ) : null}
            </div>
          </div>

          {highlights.length > 0 ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={`${item.value}-${item.label}`}
                  className="rounded-[18px] border border-[#e3def2] bg-white/88 px-5 py-5 shadow-[0_12px_34px_rgba(31,23,82,0.06)] backdrop-blur"
                >
                  <p className="text-[22px] font-bold text-[#4b22ff]">{item.value}</p>
                  <p className="mt-1 text-[13px] font-semibold leading-5 text-[#4d5873]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-22">
        <div className="space-y-12 sm:space-y-16">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.heading}
              className={
                sectionIndex === 0
                  ? ""
                  : "border-t border-[#ebe7f4] pt-12 sm:pt-16"
              }
            >
              <h2 className="max-w-[860px] text-[29px] font-bold leading-[1.16] tracking-[-0.035em] text-[#081232] sm:text-[38px]">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 max-w-[900px] text-[16px] font-medium leading-8 text-[#34405f] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-7 grid gap-4 md:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 rounded-[16px] border border-[#e7e2f3] bg-[#fbfaff] px-4 py-4 text-[15px] font-semibold leading-6 text-[#27314f]"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#4b22ff]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.subsections && section.subsections.length > 0 ? (
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {section.subsections.map((subsection) => (
                    <article
                      key={subsection.heading}
                      className="rounded-[20px] border border-[#e5e0f2] bg-white p-5 shadow-[0_12px_36px_rgba(31,23,82,0.06)] sm:p-6"
                    >
                      <h3 className="text-[20px] font-bold leading-7 text-[#081232]">
                        {subsection.heading}
                      </h3>
                      {subsection.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-3 text-[15px] font-medium leading-7 text-[#47526d]"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {subsection.bullets && subsection.bullets.length > 0 ? (
                        <ul className="mt-4 space-y-3">
                          {subsection.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-[14px] font-semibold leading-6 text-[#34405f]"
                            >
                              <CheckCircle2
                                size={17}
                                className="mt-1 shrink-0 text-[#ff2f7d]"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {faqs.length > 0 ? (
          <section className="mt-16 border-t border-[#ebe7f4] pt-14 sm:mt-20 sm:pt-18">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#ff2f7d]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-[-0.035em] text-[#081232] sm:text-[40px]">
              Questions People Ask Before Starting
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((item, index) => (
                <details
                  key={item.question}
                  className="group rounded-[18px] border border-[#e4dff1] bg-white p-4 shadow-[0_10px_30px_rgba(34,24,85,0.05)] open:border-[#cfc5ff] sm:p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#f0ecff] text-[11px] font-bold text-[#4b22ff]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[15px] font-bold leading-6 text-[#081232] sm:text-[17px]">
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className="shrink-0 text-[#4b22ff] transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-4 border-t border-[#ebe7f4] pt-4 text-[15px] font-medium leading-7 text-[#34405f] sm:ml-[52px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {relatedLinks.length > 0 ? (
          <section className="mt-16 border-t border-[#ebe7f4] pt-14 sm:mt-20 sm:pt-18">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#4b22ff]">
              Continue Exploring
            </p>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-[-0.035em] text-[#081232] sm:text-[40px]">
              Related Services and Resources
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item) => {
                const content = (
                  <>
                    <h3 className="text-[19px] font-bold leading-7 text-[#081232]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#526078]">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#4b22ff]">
                      Explore
                      {item.external ? (
                        <ExternalLink size={15} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </span>
                  </>
                );

                const className =
                  "group rounded-[20px] border border-[#e4def2] bg-[#fbfaff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#cfc5ff] hover:shadow-[0_16px_38px_rgba(75,34,255,0.08)] sm:p-6";

                return item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className={className}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-10">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[24px] bg-[linear-gradient(105deg,#061330_0%,#17104b_42%,#5e155b_75%,#ff2f7d_125%)] px-6 py-11 text-white shadow-[0_24px_60px_rgba(11,10,48,0.24)] sm:px-10 sm:py-13 lg:px-14">
          <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#1685ff]/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 right-[-40px] h-80 w-80 rounded-full bg-[#ff2f7d]/35 blur-[95px]" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff7ca8]">
                {finalCta.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[720px] text-[28px] font-bold leading-[1.15] tracking-[-0.035em] sm:text-[40px]">
                {finalCta.title}
              </h2>
              <p className="mt-4 max-w-[680px] text-[15px] font-medium leading-7 text-white/84">
                {finalCta.description}
              </p>
            </div>
            <Link
              href={finalCta.href}
              className="group inline-flex min-h-[50px] shrink-0 items-center justify-center gap-3 rounded-[12px] bg-white px-7 text-[14px] font-bold text-[#081232] shadow-[0_14px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:text-[#4b22ff]"
            >
              {finalCta.label}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
