import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
} from "../../lib/seo";

const title = "Software Development Services";
const description =
  "Explore MITOMS Technologies services for web development, mobile app development, UI/UX design, cloud solutions, AI transformation and IT consulting.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/services/",
});

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Fast, secure and scalable websites and web applications designed to support growth and conversions.",
    href: "/services/web-development/",
  },
  {
    number: "02",
    title: "Mobile App Development",
    description:
      "User-focused iOS and Android applications built for performance, reliability and long-term scale.",
    href: "/services/mobile-app-development/",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Research-led product design, intuitive interfaces and polished digital experiences across devices.",
    href: "/services/ui-ux-design/",
  },
  {
    number: "04",
    title: "Cloud Solutions",
    description:
      "Secure cloud architecture, migration and managed infrastructure for modern business operations.",
    href: "/services/cloud-solutions/",
  },
  {
    number: "05",
    title: "AI & Digital Transformation",
    description:
      "Practical AI, automation and digital modernization solutions that improve efficiency and decision-making.",
    href: "/services/ai-digital-transformation/",
  },
  {
    number: "06",
    title: "IT Consulting",
    description:
      "Technology strategy, architecture guidance and modernization planning aligned with business goals.",
    href: "/services/it-consulting/",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: title,
            description,
            path: "/services/",
            type: "CollectionPage",
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "MITOMS Technologies Services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.title,
              url: `https://mitoms.com${service.href}`,
            })),
          },
        ]}
      />

      <main className="overflow-hidden bg-white font-sans text-[#07112f] antialiased">
        <section className="relative overflow-hidden bg-[#fbfaff] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -left-44 -top-44 h-[560px] w-[560px] rounded-full bg-[#4B22FF]/12 blur-[150px]" />
          <div className="pointer-events-none absolute -right-44 top-[-100px] h-[520px] w-[520px] rounded-full bg-[#FF2F7D]/12 blur-[150px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle_at_1px_1px,rgba(75,34,255,0.13)_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative mx-auto max-w-[1120px] text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#FF2F7D] sm:text-[13px]">
              End-to-End Technology Services
            </p>
            <h1 className="mx-auto mt-5 max-w-[940px] text-[38px] font-bold leading-[1.08] tracking-[-0.05em] text-[#081232] sm:text-[54px] lg:text-[66px]">
              Digital solutions designed to move your business forward
            </h1>
            <p className="mx-auto mt-7 max-w-[760px] text-[16px] font-medium leading-8 text-[#34405f] sm:text-[18px]">
              From strategy and design to engineering, cloud and AI, our team
              helps businesses build reliable digital products and modernize
              technology with a practical, growth-focused approach.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  prefetch={false}
                  className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[24px] border border-[#e7e1f2] bg-white p-7 shadow-[0_16px_45px_rgba(33,22,83,0.07)] transition-all duration-300 hover:-translate-y-2 hover:border-[#bcb0f5] hover:shadow-[0_24px_58px_rgba(75,34,255,0.14)] sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-[190px] w-[190px] rounded-full bg-gradient-to-br from-[#4B22FF]/14 to-[#FF2F7D]/12 blur-[55px] transition-transform duration-500 group-hover:scale-125" />
                  <p className="relative text-[13px] font-black tracking-[0.18em] text-[#7A5CFF]">
                    {service.number}
                  </p>
                  <h2 className="relative mt-7 text-[27px] font-bold leading-tight tracking-[-0.035em] text-[#081232]">
                    {service.title}
                  </h2>
                  <p className="relative mt-5 text-[15px] font-medium leading-7 text-[#4a5571]">
                    {service.description}
                  </p>
                  <span className="relative mt-auto pt-8 text-[14px] font-bold text-[#4B22FF]">
                    Explore service
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-18 sm:px-6 sm:pb-22 lg:px-10 lg:pb-28">
          <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[28px] bg-[#07112f] px-6 py-12 text-center text-white shadow-[0_26px_75px_rgba(7,17,47,0.28)] sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-24 h-[280px] w-[280px] rounded-full bg-[#4B22FF]/28 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-[280px] w-[280px] rounded-full bg-[#FF2F7D]/24 blur-[90px]" />
            <div className="relative">
              <h2 className="text-[31px] font-bold tracking-[-0.04em] sm:text-[42px]">
                Need help choosing the right service?
              </h2>
              <p className="mx-auto mt-5 max-w-[650px] text-[16px] font-medium leading-7 text-white/78">
                Tell us what you are trying to build or improve. We will help
                you define a practical solution and the right delivery approach.
              </p>
              <Link
                href="/contact/"
                className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-[12px] bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] px-8 text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(75,34,255,0.32)] transition-transform hover:-translate-y-1"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
