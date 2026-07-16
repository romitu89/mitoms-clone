"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "interactive" | "text" | "hidden";

type FireParticle = {
  kind: "fire";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
};

type WaterParticle = {
  kind: "water";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  targetY: number;
  splashed: boolean;
};

type SplashParticle = {
  kind: "splash";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
};

type Particle = FireParticle | WaterParticle | SplashParticle;

type Ripple = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  radius: number;
};

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  "summary",
  "label[for]",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "[data-cursor-interactive]",
].join(",");

const TEXT_SELECTOR = [
  "input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio'])",
  "textarea",
  "select",
  "[contenteditable='true']",
].join(",");

const randomBetween = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const damp = (
  current: number,
  target: number,
  smoothing: number,
  deltaSeconds: number,
) => current + (target - current) * (1 - Math.exp(-smoothing * deltaSeconds));

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  const animationFrameRef = useRef<number | null>(null);
  const targetPositionRef = useRef({ x: -100, y: -100 });
  const cursorPositionRef = useRef({ x: -100, y: -100 });
  const previousCursorPositionRef = useRef({ x: -100, y: -100 });
  const ringPositionRef = useRef({ x: -100, y: -100 });

  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  const lastMoveTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const fireDistanceAccumulatorRef = useRef(0);
  const stoppedEffectPlayedRef = useRef(false);
  const modeRef = useRef<CursorMode>("default");
  const visibleRef = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(pointer: fine) and (hover: hover)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateAvailability = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateAvailability();

    finePointerQuery.addEventListener("change", updateAvailability);
    reducedMotionQuery.addEventListener("change", updateAvailability);

    return () => {
      finePointerQuery.removeEventListener("change", updateAvailability);
      reducedMotionQuery.removeEventListener("change", updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(
        "mitoms-fire-water-cursor-enabled",
      );
      return;
    }

    document.documentElement.classList.add(
      "mitoms-fire-water-cursor-enabled",
    );

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const setCursorMode = (nextMode: CursorMode) => {
      if (modeRef.current === nextMode) {
        return;
      }

      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const updateModeFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setCursorMode("default");
        return;
      }

      if (target.closest("[data-cursor-hide]")) {
        setCursorMode("hidden");
        return;
      }

      if (target.closest(TEXT_SELECTOR)) {
        setCursorMode("text");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        setCursorMode("interactive");
        return;
      }

      setCursorMode("default");
    };

    const initialisePositions = (x: number, y: number) => {
      targetPositionRef.current = { x, y };
      cursorPositionRef.current = { x, y };
      previousCursorPositionRef.current = { x, y };
      ringPositionRef.current = { x, y };

      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${x}px, ${y}px, 0)`,
      );
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${x}px, ${y}px, 0)`,
      );
    };

    const spawnFireParticle = (
      x: number,
      y: number,
      directionX: number,
      directionY: number,
    ) => {
      const life = randomBetween(300, 540);

      particlesRef.current.push({
        kind: "fire",
        x: x + randomBetween(-1.4, 1.4),
        y: y + randomBetween(-1.4, 1.4),
        vx: -directionX * randomBetween(0.12, 0.23) + randomBetween(-0.35, 0.35),
        vy: -directionY * randomBetween(0.12, 0.23) - randomBetween(0.45, 1.05),
        size: randomBetween(2.3, 4.7),
        life,
        maxLife: life,
        hue: randomBetween(10, 42),
      });
    };

    const emitFireAlongSegment = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 0.25) {
        return;
      }

      const directionX = deltaX / distance;
      const directionY = deltaY / distance;
      const spacing = 4.5;
      let travelled = spacing - fireDistanceAccumulatorRef.current;

      while (travelled <= distance) {
        const progress = travelled / distance;

        spawnFireParticle(
          startX + deltaX * progress,
          startY + deltaY * progress,
          directionX,
          directionY,
        );

        travelled += spacing;
      }

      fireDistanceAccumulatorRef.current =
        (fireDistanceAccumulatorRef.current + distance) % spacing;

      if (particlesRef.current.length > 180) {
        particlesRef.current.splice(
          0,
          particlesRef.current.length - 180,
        );
      }
    };

    const createSplash = (x: number, y: number) => {
      for (let index = 0; index < 14; index += 1) {
        const angle = randomBetween(Math.PI * 1.05, Math.PI * 1.95);
        const speed = randomBetween(1, 2.7);
        const life = randomBetween(340, 560);

        particlesRef.current.push({
          kind: "splash",
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - randomBetween(0.25, 0.9),
          size: randomBetween(1.4, 2.9),
          life,
          maxLife: life,
        });
      }

      ripplesRef.current.push({
        x,
        y,
        life: 560,
        maxLife: 560,
        radius: 6,
      });
    };

    const spawnWaterExtinguish = (x: number, y: number) => {
      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.kind !== "fire",
      );

      for (let index = 0; index < 9; index += 1) {
        const life = randomBetween(420, 650);

        particlesRef.current.push({
          kind: "water",
          x: x + randomBetween(-6, 6),
          y: y - randomBetween(24, 38),
          vx: randomBetween(-0.22, 0.22),
          vy: randomBetween(1.25, 1.9),
          size: randomBetween(2.1, 3.7),
          life,
          maxLife: life,
          targetY: y + randomBetween(-1, 3),
          splashed: false,
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const nextPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      targetPositionRef.current = nextPosition;
      lastMoveTimeRef.current = performance.now();
      stoppedEffectPlayedRef.current = false;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
        initialisePositions(nextPosition.x, nextPosition.y);
      }

      updateModeFromTarget(event.target);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      const nextPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      visibleRef.current = true;
      setVisible(true);
      initialisePositions(nextPosition.x, nextPosition.y);
      lastMoveTimeRef.current = performance.now();
      stoppedEffectPlayedRef.current = false;
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const handlePointerDown = () => {
      const point = cursorPositionRef.current;

      ripplesRef.current.push({
        x: point.x,
        y: point.y,
        life: 380,
        maxLife: 380,
        radius: 5,
      });
    };

    const updateAndDrawParticles = (deltaMilliseconds: number) => {
      const nextParticles: Particle[] = [];

      context.save();
      context.globalCompositeOperation = "lighter";

      particlesRef.current.forEach((particle) => {
        particle.life -= deltaMilliseconds;

        if (particle.life <= 0) {
          return;
        }

        const progress = 1 - particle.life / particle.maxLife;
        const opacity = Math.max(0, 1 - progress);

        if (particle.kind === "fire") {
          particle.x += particle.vx * deltaMilliseconds * 0.06;
          particle.y += particle.vy * deltaMilliseconds * 0.06;
          particle.vx *= 0.986;
          particle.vy -= 0.007 * deltaMilliseconds;
          particle.size *= 0.993;

          const radius = Math.max(particle.size, 0.7);
          const gradient = context.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            radius * 2,
          );

          gradient.addColorStop(
            0,
            `hsla(${particle.hue + 18}, 100%, 80%, ${opacity})`,
          );
          gradient.addColorStop(
            0.42,
            `hsla(${particle.hue}, 100%, 58%, ${opacity * 0.9})`,
          );
          gradient.addColorStop(1, "hsla(355, 100%, 48%, 0)");

          context.fillStyle = gradient;
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            radius * 2,
            0,
            Math.PI * 2,
          );
          context.fill();
        }

        if (particle.kind === "water") {
          particle.x += particle.vx * deltaMilliseconds * 0.06;
          particle.y += particle.vy * deltaMilliseconds * 0.06;
          particle.vy += 0.01 * deltaMilliseconds;

          if (!particle.splashed && particle.y >= particle.targetY) {
            particle.splashed = true;
            createSplash(particle.x, particle.targetY);
            return;
          }

          const gradient = context.createRadialGradient(
            particle.x - 1,
            particle.y - 1,
            0,
            particle.x,
            particle.y,
            particle.size * 1.7,
          );

          gradient.addColorStop(
            0,
            `rgba(230, 253, 255, ${opacity})`,
          );
          gradient.addColorStop(
            0.46,
            `rgba(37, 214, 255, ${opacity * 0.92})`,
          );
          gradient.addColorStop(1, "rgba(75, 34, 255, 0)");

          context.fillStyle = gradient;
          context.beginPath();
          context.ellipse(
            particle.x,
            particle.y,
            particle.size * 0.7,
            particle.size * 1.22,
            0,
            0,
            Math.PI * 2,
          );
          context.fill();
        }

        if (particle.kind === "splash") {
          particle.x += particle.vx * deltaMilliseconds * 0.06;
          particle.y += particle.vy * deltaMilliseconds * 0.06;
          particle.vy += 0.011 * deltaMilliseconds;
          particle.vx *= 0.99;

          context.fillStyle = `rgba(37, 214, 255, ${opacity * 0.82})`;
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2,
          );
          context.fill();
        }

        nextParticles.push(particle);
      });

      context.restore();
      particlesRef.current = nextParticles;
    };

    const updateAndDrawRipples = (deltaMilliseconds: number) => {
      const nextRipples: Ripple[] = [];

      ripplesRef.current.forEach((ripple) => {
        ripple.life -= deltaMilliseconds;

        if (ripple.life <= 0) {
          return;
        }

        const progress = 1 - ripple.life / ripple.maxLife;
        ripple.radius += deltaMilliseconds * 0.05;

        context.strokeStyle = `rgba(37, 214, 255, ${
          (1 - progress) * 0.68
        })`;
        context.lineWidth = Math.max(1.4 - progress, 0.5);
        context.beginPath();
        context.arc(
          ripple.x,
          ripple.y,
          ripple.radius,
          0,
          Math.PI * 2,
        );
        context.stroke();

        nextRipples.push(ripple);
      });

      ripplesRef.current = nextRipples;
    };

    const animate = (time: number) => {
      const deltaMilliseconds = Math.min(
        lastFrameTimeRef.current
          ? time - lastFrameTimeRef.current
          : 16.67,
        32,
      );
      const deltaSeconds = deltaMilliseconds / 1000;

      lastFrameTimeRef.current = time;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const target = targetPositionRef.current;
      const cursor = cursorPositionRef.current;
      const previousCursor = previousCursorPositionRef.current;
      const ring = ringPositionRef.current;

      previousCursor.x = cursor.x;
      previousCursor.y = cursor.y;

      cursor.x = damp(cursor.x, target.x, 26, deltaSeconds);
      cursor.y = damp(cursor.y, target.y, 26, deltaSeconds);

      ring.x = damp(ring.x, target.x, 16, deltaSeconds);
      ring.y = damp(ring.y, target.y, 16, deltaSeconds);

      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
      );
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ring.x}px, ${ring.y}px, 0)`,
      );

      const smoothedMovement = Math.hypot(
        cursor.x - previousCursor.x,
        cursor.y - previousCursor.y,
      );

      if (
        visibleRef.current &&
        smoothedMovement > 0.35 &&
        modeRef.current !== "text" &&
        modeRef.current !== "hidden"
      ) {
        emitFireAlongSegment(
          previousCursor.x,
          previousCursor.y,
          cursor.x,
          cursor.y,
        );
      }

      const stoppedFor = time - lastMoveTimeRef.current;

      if (
        visibleRef.current &&
        stoppedFor > 340 &&
        !stoppedEffectPlayedRef.current &&
        modeRef.current !== "text" &&
        modeRef.current !== "hidden"
      ) {
        stoppedEffectPlayedRef.current = true;
        spawnWaterExtinguish(cursor.x, cursor.y);
      }

      updateAndDrawParticles(deltaMilliseconds);
      updateAndDrawRipples(deltaMilliseconds);

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove(
        "mitoms-fire-water-cursor-enabled",
      );

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const cursorClassName = [
    "mitoms-fire-water-cursor",
    visible ? "is-visible" : "",
    mode === "interactive" ? "is-interactive" : "",
    mode === "text" ? "is-text" : "",
    mode === "hidden" ? "is-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={cursorClassName} aria-hidden="true">
        <canvas ref={canvasRef} className="mitoms-fire-water-canvas" />

        <span ref={ringRef} className="mitoms-fire-water-ring-wrap">
          <span className="mitoms-fire-water-ring" />
        </span>

        <span ref={dotRef} className="mitoms-fire-water-dot-wrap">
          <span className="mitoms-fire-water-dot" />
        </span>
      </div>

      <style>{`
        @media (pointer: fine) and (hover: hover) {
          html.mitoms-fire-water-cursor-enabled,
          html.mitoms-fire-water-cursor-enabled body,
          html.mitoms-fire-water-cursor-enabled a,
          html.mitoms-fire-water-cursor-enabled button,
          html.mitoms-fire-water-cursor-enabled [role="button"],
          html.mitoms-fire-water-cursor-enabled summary,
          html.mitoms-fire-water-cursor-enabled [data-cursor-interactive] {
            cursor: none !important;
          }

          html.mitoms-fire-water-cursor-enabled input,
          html.mitoms-fire-water-cursor-enabled textarea,
          html.mitoms-fire-water-cursor-enabled select,
          html.mitoms-fire-water-cursor-enabled [contenteditable="true"] {
            cursor: text !important;
          }
        }

        .mitoms-fire-water-cursor {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 110ms ease,
            visibility 110ms ease;
        }

        .mitoms-fire-water-cursor.is-visible {
          opacity: 1;
          visibility: visible;
        }

        .mitoms-fire-water-cursor.is-hidden,
        .mitoms-fire-water-cursor.is-text {
          opacity: 0;
          visibility: hidden;
        }

        .mitoms-fire-water-canvas {
          pointer-events: none;
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
        }

        .mitoms-fire-water-dot-wrap,
        .mitoms-fire-water-ring-wrap {
          pointer-events: none;
          position: fixed;
          left: 0;
          top: 0;
          will-change: transform;
        }

        .mitoms-fire-water-dot,
        .mitoms-fire-water-ring {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 999px;
          transform: translate(-50%, -50%);
        }

        .mitoms-fire-water-dot {
          width: 7px;
          height: 7px;
          background: radial-gradient(
            circle at 35% 30%,
            #fff7c7 0%,
            #ffbb38 30%,
            #ff5b22 64%,
            #ff2f7d 100%
          );
          box-shadow:
            0 0 8px rgba(255, 187, 56, 0.65),
            0 0 16px rgba(255, 47, 125, 0.34);
          transition:
            width 180ms ease,
            height 180ms ease,
            box-shadow 180ms ease;
        }

        .mitoms-fire-water-ring {
          width: 18px;
          height: 18px;
          border: 1px solid rgba(255, 112, 34, 0.58);
          background: rgba(255, 255, 255, 0.015);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 8px rgba(255, 91, 34, 0.1);
          transition:
            width 220ms cubic-bezier(0.16, 1, 0.3, 1),
            height 220ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .mitoms-fire-water-cursor.is-interactive
          .mitoms-fire-water-dot {
          width: 5px;
          height: 5px;
        }

        .mitoms-fire-water-cursor.is-interactive
          .mitoms-fire-water-ring {
          width: 29px;
          height: 29px;
          border-color: rgba(75, 34, 255, 0.62);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            0 0 12px rgba(75, 34, 255, 0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .mitoms-fire-water-cursor {
            display: none !important;
          }
        }

        @media (pointer: coarse), (hover: none) {
          .mitoms-fire-water-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}