"use client";

import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";

// 1. The Circular font set up correctly within the file
const circular = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff",
  variable: "--font-circular",
});

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function SplitText({
  text,
  delay = 0,
  className = "",
}: SplitTextProps) {
  const words = text.split(" ");

  // 2. Explicitly typed as Variants to fix the TS inference error
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.div
      // 3. Oversize typography applied alongside the Circular font class
      className={`flex flex-wrap justify-center gap-[0.25em] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${circular.className} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-flex overflow-hidden pb-1">
          <motion.span variants={wordVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.div>
  );
}
