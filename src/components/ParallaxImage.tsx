"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt = "Parallax Image",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of this specific container as it enters and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // AUGMENTED PARALLAX: Deep -30% to 30% movement.
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        // We set the inner div to 160% height and offset it by -30% so the edges never show
        // despite the extreme parallax movement.
        className="absolute inset-x-0 top-[-30%] h-[160%] w-full"
      >
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </motion.div>
    </div>
  );
}
