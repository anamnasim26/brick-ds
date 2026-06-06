"use client";

import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

interface MarqueeTextProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}

export default function MarqueeText({
  children,
  speed = 40,
  className = "",
  reverse = false,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const duration = speed;
  const x = reverse ? ["0%", "50%"] : ["0%", "-50%"];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        className="inline-flex"
        animate={{ x }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Duplicate content to create seamless loop */}
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  );
}
