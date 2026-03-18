"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt = "Parallax Image",
  className = "",
  lgParallax = false, // NEW: Renamed flag for deep depth
}: {
  src: string;
  alt?: string;
  className?: string;
  lgParallax?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // LG PARALLAX: If flagged, pushes movement to -50% to 50%
  const yOffsetStart = lgParallax ? "-50%" : "-30%";
  const yOffsetEnd = lgParallax ? "50%" : "30%";
  const y = useTransform(scrollYProgress, [0, 1], [yOffsetStart, yOffsetEnd]);

  // Adjust the inner height to ensure edges don't show during extreme travel
  const innerHeightClass = lgParallax
    ? "h-[200%] top-[-50%]"
    : "h-[160%] top-[-30%]";

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className={`absolute inset-x-0 w-full ${innerHeightClass}`}
      >
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </motion.div>
    </div>
  );
}
