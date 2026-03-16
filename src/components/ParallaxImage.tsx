"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import WebGLOverlay from "@/components/WebGLOverlay"; // Import new component

interface ParallaxProps {
  src: string;
  alt: string;
  className?: string;
  showWebGL?: boolean; // New optional prop to toggle overlay
}

export default function ParallaxImage({
  src,
  alt,
  className = "h-screen w-full",
  showWebGL = false, // Default to false
}: ParallaxProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Dialed back Parallax range (15% travel) for sections with WebGL overlays,
  // so the two effects don't compete visually.
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={container}
      className={`relative flex items-center justify-center overflow-hidden z-10 ${className}`}
    >
      {/* Background Image Layer (Parallaxing behind everything) */}
      {/* We use h-[130%] and -top-[15%] to match the 15% transformation range. */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
      >
        <Image src={src} fill alt={alt} className="object-cover" priority />
      </motion.div>

      {/* Conditionally render the WebGL overlay.
        It sits at z-20 (above the image) inside the container.
      */}
      {showWebGL && <WebGLOverlay />}
    </div>
  );
}
