"use client";

import { motion, Variants } from "framer-motion";
import localFont from "next/font/local";

const neueMontreal = localFont({
  src: "../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
  playOnce?: boolean; // NEW: Added a prop to lock the animation
}

// Added playOnce to the destructured props
export default function SplitText({
  text,
  delay = 0,
  className = "",
  playOnce = false,
}: SplitTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "130%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap justify-center gap-[0.25em] text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight uppercase ${neueMontreal.className} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // THE FIX: If playOnce is true, it locks permanently.
      // If false, it uses our infinite-margin reset trick!
      viewport={
        playOnce
          ? { once: true, margin: "-100px" }
          : { once: false, margin: "10000px 0px -100px 0px" }
      }
    >
      {words.map((word, index) => (
        <span key={index} className="inline-flex overflow-hidden pb-2 md:pb-4">
          <motion.span variants={wordVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.div>
  );
}
