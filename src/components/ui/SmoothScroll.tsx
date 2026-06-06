"use client";

import { useEffect, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
