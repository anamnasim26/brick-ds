"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleHover = () => {
      cursorRef.current?.classList.add("scale-[2.5]", "bg-white/10", "border-white");
    };
    const handleLeave = () => {
      cursorRef.current?.classList.remove("scale-[2.5]", "bg-white/10", "border-white");
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-white/40 backdrop-blur-sm transition-transform duration-200 mix-blend-difference"
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-1.5 w-1.5 rounded-full bg-white"
        style={{
          left: mouseX,
          top: mouseY,
          x: 11,
          y: 11,
        }}
      />
    </>
  );
}
