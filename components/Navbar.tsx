"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Code2,
  Smartphone,
  PenTool,
  Cloud,
  Brain,
  Server,
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const services = [
  {
    title: "Web Development",
    description: "Fast, scalable and conversion-focused websites.",
    href: "/services/web-development",
    icon: Code2,
    iconBg: "from-[#4B22FF] to-[#7B5CFF]",
  },
  {
    title: "Mobile App Development",
    description: "Modern iOS and Android applications.",
    href: "/services/mobile-app-development",
    icon: Smartphone,
    iconBg: "from-[#FF2F7D] to-[#FF7CA8]",
  },
  {
    title: "UI/UX Design",
    description: "Clean and user-focused digital experiences.",
    href: "/services/ui-ux-design",
    icon: PenTool,
    iconBg: "from-[#743CFF] to-[#FF2F7D]",
  },
  {
    title: "Cloud Solutions",
    description: "Secure and scalable cloud infrastructure.",
    href: "/services/cloud-solutions",
    icon: Cloud,
    iconBg: "from-[#00B8FF] to-[#4B22FF]",
  },
  {
    title: "AI & Digital Transformation",
    description: "Automation and intelligent business solutions.",
    href: "/services/ai-digital-transformation",
    icon: Brain,
    iconBg: "from-[#FF2F7D] to-[#743CFF]",
  },
  {
    title: "IT Consulting",
    description: "Technology strategy for sustainable growth.",
    href: "/services/it-consulting",
    icon: Server,
    iconBg: "from-[#172554] to-[#4B22FF]",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const servicesActive = isActive("/services");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      setMobileServicesOpen(false);
      setDesktopServicesOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openConsultation = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
    setShowConsultation(true);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#ebe8f5]/70 bg-white/95 shadow-[0_8px_30px_rgba(21,17,65,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-[88px] sm:px-6 xl:h-24 xl:px-10">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="MITOMS home"
          >
            <Image
              src="/images/home/logo.png"
              alt="MITOMS"
              width={360}
              height={100}
              priority
              className="h-[58px] w-auto max-w-[210px] object-contain sm:h-[66px] sm:max-w-[245px] xl:h-[80px] xl:max-w-none"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-9">
            {/* Home */}
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={`group relative text-[15px] font-semibold transition-colors duration-300 ${
                isActive("/")
                  ? "text-[#4B22FF]"
                  : "text-[#07112F] hover:text-[#4B22FF]"
              }`}
            >
              Home

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setDesktopServicesOpen(false)}
            >
              <Link
                href="/services"
                aria-current={servicesActive ? "page" : undefined}
                aria-haspopup="menu"
                aria-expanded={desktopServicesOpen}
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onFocus={() => setDesktopServicesOpen(true)}
                onClick={() => setDesktopServicesOpen(false)}
                className={`group/services-link relative flex items-center gap-1.5 text-[15px] font-semibold transition-colors duration-300 ${
                  desktopServicesOpen || servicesActive
                    ? "text-[#4B22FF]"
                    : "text-[#07112F] hover:text-[#4B22FF]"
                }`}
              >
                Services

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    desktopServicesOpen ? "rotate-180" : ""
                  }`}
                />

                <span
                  className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] transition-all duration-300 ${
                    desktopServicesOpen || servicesActive
                      ? "w-full"
                      : "w-0 group-hover/services-link:w-full"
                  }`}
                />
              </Link>

              {/* Desktop Dropdown */}
              <div
                role="menu"
                onMouseEnter={() => setDesktopServicesOpen(true)}
                className={`absolute left-1/2 top-full w-[min(680px,calc(100vw-3rem))] -translate-x-1/2 pt-4 transition-all duration-300 ${
                  desktopServicesOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible translate-y-3 opacity-0"
                }`}
              >
                <div className="relative overflow-hidden rounded-[26px] border border-[#e7e2f5] bg-white p-5 shadow-[0_28px_80px_rgba(20,15,60,0.18)]">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF2F7D]/10 blur-3xl" />

                  <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#4B22FF]/10 blur-3xl" />

                  <div className="relative grid grid-cols-2 gap-3">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const serviceIsActive = isActive(service.href);

                      return (
                        <Link
                          key={service.title}
                          href={service.href}
                          aria-current={
                            serviceIsActive ? "page" : undefined
                          }
                          onClick={() =>
                            setDesktopServicesOpen(false)
                          }
                          className={`group/service flex items-start gap-4 rounded-[18px] border p-4 transition-all duration-300 ${
                            serviceIsActive
                              ? "border-[#cec4ff] bg-[#f5f2ff] shadow-[0_12px_28px_rgba(75,34,255,0.10)]"
                              : "border-transparent hover:border-[#e7e2f5] hover:bg-[#faf9ff] hover:shadow-[0_12px_28px_rgba(38,27,104,0.07)]"
                          }`}
                        >
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br ${service.iconBg} text-white shadow-[0_10px_24px_rgba(75,34,255,0.18)] transition-transform duration-300 group-hover/service:-rotate-6 group-hover/service:scale-105`}
                          >
                            <Icon size={23} strokeWidth={2} />
                          </div>

                          <div className="min-w-0">
                            <h3
                              className={`text-[14px] font-bold transition-colors duration-300 ${
                                serviceIsActive
                                  ? "text-[#4B22FF]"
                                  : "text-[#081232] group-hover/service:text-[#4B22FF]"
                              }`}
                            >
                              {service.title}
                            </h3>

                            <p className="mt-1 text-[12px] font-medium leading-5 text-[#27314F]/82">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="relative mt-4 flex items-center justify-between rounded-[18px] bg-[linear-gradient(100deg,#07183f,#321167,#ff315d)] px-5 py-4 text-white">
                    <div>
                      <p className="text-[13px] font-bold">
                        Need help choosing the right service?
                      </p>

                      <p className="mt-1 text-[12px] font-medium leading-5 text-white/82">
                        Talk to our team and get a practical
                        recommendation.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={openConsultation}
                      className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[12px] font-bold text-[#17163B] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Talk to an Expert
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <Link
              href="/portfolio"
              aria-current={
                isActive("/portfolio") ? "page" : undefined
              }
              className={`group relative text-[15px] font-semibold transition-colors duration-300 ${
                isActive("/portfolio")
                  ? "text-[#4B22FF]"
                  : "text-[#07112F] hover:text-[#4B22FF]"
              }`}
            >
              Portfolio

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] transition-all duration-300 ${
                  isActive("/portfolio")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* About */}
            <Link
              href="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              className={`group relative text-[15px] font-semibold transition-colors duration-300 ${
                isActive("/about")
                  ? "text-[#4B22FF]"
                  : "text-[#07112F] hover:text-[#4B22FF]"
              }`}
            >
              About Us

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] transition-all duration-300 ${
                  isActive("/about")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              aria-current={
                isActive("/contact") ? "page" : undefined
              }
              className={`group relative text-[15px] font-semibold transition-colors duration-300 ${
                isActive("/contact")
                  ? "text-[#4B22FF]"
                  : "text-[#07112F] hover:text-[#4B22FF]"
              }`}
            >
              Contact Us

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] transition-all duration-300 ${
                  isActive("/contact")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </nav>

          {/* Desktop CTA */}
          <button
            type="button"
            onClick={openConsultation}
            className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(75,34,255,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(255,49,93,0.25)] xl:flex 2xl:px-7 2xl:text-sm"
          >
            Get Free Consultation
            <ArrowRight size={18} />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            className="cursor-pointer rounded-lg border border-[#ded9ed] p-2 text-[#07112F] transition-colors hover:border-[#4B22FF] hover:text-[#4B22FF] xl:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-navigation"
            className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[#ebe8f5] bg-white shadow-[0_20px_45px_rgba(23,18,67,0.08)] sm:max-h-[calc(100dvh-5.5rem)] xl:hidden"
          >
            <div className="flex flex-col px-4 py-4 sm:px-6 sm:py-5">
              {/* Mobile Home */}
              <Link
                href="/"
                aria-current={isActive("/") ? "page" : undefined}
                onClick={closeMobileMenu}
                className={`border-b border-[#ece8f5] py-4 text-[15px] font-semibold transition-colors ${
                  isActive("/")
                    ? "text-[#4B22FF]"
                    : "text-[#07112F]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Home</span>

                  {isActive("/") && (
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                  )}
                </div>
              </Link>

              {/* Mobile Services Dropdown */}
              <div className="border-b border-[#ece8f5]">
                <button
                  type="button"
                  onClick={() =>
                    setMobileServicesOpen((current) => !current)
                  }
                  aria-expanded={mobileServicesOpen}
                  className={`flex w-full cursor-pointer items-center justify-between py-4 text-left text-[15px] font-semibold transition-colors ${
                    servicesActive
                      ? "text-[#4B22FF]"
                      : "text-[#07112F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>Services</span>

                    {servicesActive && (
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                    )}
                  </div>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="space-y-2 pb-4">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const serviceIsActive = isActive(service.href);

                      return (
                        <Link
                          key={service.title}
                          href={service.href}
                          aria-current={
                            serviceIsActive ? "page" : undefined
                          }
                          onClick={closeMobileMenu}
                          className={`flex items-center gap-3 rounded-[14px] border px-3 py-3 transition-all duration-300 ${
                            serviceIsActive
                              ? "border-[#cec4ff] bg-[#f3efff] shadow-[0_8px_20px_rgba(75,34,255,0.08)]"
                              : "border-transparent bg-[#faf9ff]"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br ${service.iconBg} text-white`}
                          >
                            <Icon size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-[13px] font-semibold ${
                                serviceIsActive
                                  ? "text-[#4B22FF]"
                                  : "text-[#081232]"
                              }`}
                            >
                              {service.title}
                            </p>

                            <p className="mt-0.5 break-words text-[11px] font-medium leading-5 text-[#27314F]/80">
                              {service.description}
                            </p>
                          </div>

                          {serviceIsActive && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                          )}
                        </Link>
                      );
                    })}

                    <Link
                      href="/services"
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-center gap-2 rounded-[12px] border py-3 text-[12px] font-bold transition-colors ${
                        pathname === "/services"
                          ? "border-[#4B22FF] bg-[#f3efff] text-[#4B22FF]"
                          : "border-[#ded8f4] text-[#4B22FF]"
                      }`}
                    >
                      View All Services
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Portfolio */}
              <Link
                href="/portfolio"
                aria-current={
                  isActive("/portfolio") ? "page" : undefined
                }
                onClick={closeMobileMenu}
                className={`border-b border-[#ece8f5] py-4 text-[15px] font-semibold transition-colors ${
                  isActive("/portfolio")
                    ? "text-[#4B22FF]"
                    : "text-[#07112F]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Portfolio</span>

                  {isActive("/portfolio") && (
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                  )}
                </div>
              </Link>

              {/* Mobile About */}
              <Link
                href="/about"
                aria-current={
                  isActive("/about") ? "page" : undefined
                }
                onClick={closeMobileMenu}
                className={`border-b border-[#ece8f5] py-4 text-[15px] font-semibold transition-colors ${
                  isActive("/about")
                    ? "text-[#4B22FF]"
                    : "text-[#07112F]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>About Us</span>

                  {isActive("/about") && (
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                  )}
                </div>
              </Link>

              {/* Mobile Contact */}
              <Link
                href="/contact"
                aria-current={
                  isActive("/contact") ? "page" : undefined
                }
                onClick={closeMobileMenu}
                className={`border-b border-[#ece8f5] py-4 text-[15px] font-semibold transition-colors ${
                  isActive("/contact")
                    ? "text-[#4B22FF]"
                    : "text-[#07112F]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Contact Us</span>

                  {isActive("/contact") && (
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D]" />
                  )}
                </div>
              </Link>

              {/* Mobile CTA */}
              <button
                type="button"
                onClick={openConsultation}
                className="mt-5 flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4B22FF] to-[#FF2F7D] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(75,34,255,0.20)]"
              >
                Get Free Consultation
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      <ConsultationModal
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </>
  );
}