"use client";

import { motion, Variants } from "framer-motion";
import { useStore } from "@/store/useStore";

interface ClunkyRevealProps {
  text: string;
  delay?: number;
}

export default function ClunkyReveal({ text, delay = 0 }: ClunkyRevealProps) {
  const { isLoading } = useStore();
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay + 0.8,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      y: "150%",
      rotate: 10,
    },
    visible: {
      y: "0%",
      rotate: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoading ? "hidden" : "visible"}
      className="flex whitespace-nowrap"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="flex mr-[0.25em] last:mr-0">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              // FIX: Added -mr-[0.08em] to the wrapper!
              // This pulls the next letter backwards to perfectly negate the internal padding.
              className="inline-block overflow-hidden pt-8 pb-12 px-4 -mt-8 -mb-12 -mx-4 -mr-[0.08em]"
            >
              <motion.span
                variants={characterVariants}
                // The padding that saves the "R" from clipping
                className="inline-block pr-[0.08em] origin-bottom-left"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
