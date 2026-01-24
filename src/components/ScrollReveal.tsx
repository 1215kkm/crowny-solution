"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const fromVars: Record<string, unknown> = {
        opacity: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      };

      if (direction === "up") fromVars.y = distance;
      else if (direction === "left") fromVars.x = distance;
      else if (direction === "right") fromVars.x = -distance;

      gsap.from(el, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => { cleanup?.(); };
  }, [delay, direction, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
