"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  "[data-scroll-reveal]",
  "[data-service-reveal]",
  "[data-bidirectional-reveal]",
].join(",");

const STYLE_ID = "mitoms-bidirectional-scroll-reveal-styles";

function ensureRevealStyles() {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal] {
      --mitoms-reveal-distance: 30px;
      opacity: 0;
      translate: 0 var(--mitoms-reveal-distance);
      scale: 0.985;
      filter: blur(3px);
      transition-property: opacity, translate, scale, filter, background-color, border-color, box-shadow, color;
      transition-duration: 780ms;
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      transition-delay: var(--mitoms-reveal-delay, 0ms);
      will-change: opacity, translate, scale, filter;
    }

    [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal][data-mitoms-reveal-from="top"] {
      --mitoms-reveal-distance: -30px;
    }

    [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal][data-mitoms-visible="true"] {
      opacity: 1;
      translate: 0 0;
      scale: 1;
      filter: blur(0);
      will-change: auto;
    }

    @media (max-width: 767px) {
      [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal] {
        --mitoms-reveal-distance: 22px;
        filter: blur(2px);
        transition-duration: 680ms;
      }

      [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal][data-mitoms-reveal-from="top"] {
        --mitoms-reveal-distance: -22px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-mitoms-scroll-reveal-root="ready"] [data-mitoms-scroll-reveal] {
        opacity: 1;
        translate: none;
        scale: 1;
        filter: none;
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);
}

function elementPosition(element: HTMLElement): "top" | "bottom" {
  const rect = element.getBoundingClientRect();
  return rect.bottom <= 0 ? "top" : "bottom";
}

export function useBidirectionalScrollReveal<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    ensureRevealStyles();

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    if (elements.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const generatedDelayElements = new Set<HTMLElement>();
    const siblingOrder = new Map<Element, number>();
    let scrollDirection: "up" | "down" = "down";
    let lastScrollY = window.scrollY;
    let firstFrame = 0;
    let secondFrame = 0;
    let replayFrame = 0;

    root.setAttribute("data-mitoms-scroll-reveal-root", "ready");

    elements.forEach((element) => {
      element.setAttribute("data-mitoms-scroll-reveal", "");
      element.setAttribute("data-mitoms-visible", reducedMotion ? "true" : "false");
      element.setAttribute(
        "data-mitoms-reveal-from",
        elementPosition(element),
      );

      if (!element.style.getPropertyValue("--mitoms-reveal-delay")) {
        const explicitOrder = Number(element.dataset.revealOrder);
        let order = Number.isFinite(explicitOrder) ? explicitOrder : -1;

        if (order < 0) {
          const parent = element.parentElement ?? root;
          order = siblingOrder.get(parent) ?? 0;
          siblingOrder.set(parent, order + 1);
        }

        const delay = Math.min(Math.max(order, 0), 4) * 70;
        element.style.setProperty("--mitoms-reveal-delay", `${delay}ms`);
        generatedDelayElements.add(element);
      }
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.setAttribute("data-mitoms-visible", "true");
      });

      return () => {
        root.removeAttribute("data-mitoms-scroll-reveal-root");
        elements.forEach((element) => {
          element.removeAttribute("data-mitoms-scroll-reveal");
          element.removeAttribute("data-mitoms-visible");
          element.removeAttribute("data-mitoms-reveal-from");
        });
        generatedDelayElements.forEach((element) => {
          element.style.removeProperty("--mitoms-reveal-delay");
        });
      };
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
        lastScrollY = currentScrollY;
      }
    };

    const showElement = (element: HTMLElement) => {
      if (element.dataset.mitomsVisible === "true") {
        return;
      }

      element.setAttribute(
        "data-mitoms-reveal-from",
        scrollDirection === "down" ? "bottom" : "top",
      );

      window.requestAnimationFrame(() => {
        element.setAttribute("data-mitoms-visible", "true");
      });
    };

    const hideElement = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const nextDirection =
        rect.bottom <= 0
          ? "top"
          : rect.top >= window.innerHeight
            ? "bottom"
            : scrollDirection === "down"
              ? "top"
              : "bottom";

      element.setAttribute("data-mitoms-reveal-from", nextDirection);
      element.setAttribute("data-mitoms-visible", "false");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            showElement(element);
          } else {
            hideElement(element);
          }
        });
      },
      {
        threshold: [0, 0.12],
        rootMargin: "0px 0px -6% 0px",
      },
    );

    const replayVisibleElements = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInViewport =
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.right > 0 &&
          rect.left < window.innerWidth;

        if (isInViewport) {
          element.setAttribute("data-mitoms-visible", "false");
          element.setAttribute(
            "data-mitoms-reveal-from",
            scrollDirection === "down" ? "bottom" : "top",
          );
        }
      });

      replayFrame = window.requestAnimationFrame(() => {
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isInViewport =
            rect.bottom > 0 &&
            rect.top < window.innerHeight &&
            rect.right > 0 &&
            rect.left < window.innerWidth;

          if (isInViewport) {
            showElement(element);
          }
        });
      });
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        replayVisibleElements();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pageshow", handlePageShow);

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        elements.forEach((element) => observer.observe(element));
      });
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageShow);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.cancelAnimationFrame(replayFrame);

      root.removeAttribute("data-mitoms-scroll-reveal-root");
      elements.forEach((element) => {
        element.removeAttribute("data-mitoms-scroll-reveal");
        element.removeAttribute("data-mitoms-visible");
        element.removeAttribute("data-mitoms-reveal-from");
      });
      generatedDelayElements.forEach((element) => {
        element.style.removeProperty("--mitoms-reveal-delay");
      });
    };
  }, [pathname]);

  return rootRef;
}
