"use client";

import { motion } from "framer-motion";

export default function SplitText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  // Split the text into an array of characters, keeping spaces intact
  const characters = text.split(/(?!$)/u);

  return (
    // inline-flex ensures the container tightly wraps the text height without collapsing
    // pb-2 and -mb-2 prevent the overflow from clipping descenders (like 'y' or 'g')
    <span className="inline-flex overflow-hidden pb-2 -mb-2">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "120%" }} // Pushed slightly further down to guarantee it's hidden
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{
            duration: 1.2,
            // Framer Motion heavily prefers bezier arrays over custom math functions for DOM transforms.
            // This array is the exact mathematical equivalent of ExpoOut.
            ease: [0.19, 1.0, 0.22, 1.0],
            delay: delay + index * 0.03, // Slightly slower stagger for a more elegant reveal
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
