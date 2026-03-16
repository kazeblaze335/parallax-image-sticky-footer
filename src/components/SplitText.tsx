"use client";

import { motion } from "framer-motion";
import localFont from "next/font/local";

// Load the local font file
const circular = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff", // Ensure this path matches your file!
  variable: "--font-circular",
});

export default function SplitText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  // Split by word
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { y: "120%" },
    visible: {
      y: 0,
      transition: { duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] },
    },
  };

  return (
    // Applied Circular Std and massive editorial sizing
    <motion.span
      className={`${circular.className} inline-flex flex-wrap justify-center overflow-hidden pb-4 -mb-4 text-[4rem] md:text-[8rem] lg:text-[11rem] leading-[0.85] tracking-tight`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-flex overflow-hidden">
          <motion.span
            variants={wordVariants}
            className="inline-block mr-[0.25em]" // Space between words
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
