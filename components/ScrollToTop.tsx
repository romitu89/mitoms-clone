"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const moveToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      // Extra fallback for different browsers.
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run immediately after the new route is mounted.
    moveToTop();

    // Run again after the browser and Next.js finish their layout work.
    let secondFrame = 0;

    const firstFrame = window.requestAnimationFrame(() => {
      moveToTop();

      secondFrame = window.requestAnimationFrame(() => {
        moveToTop();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, [pathname]);

  return null;
}