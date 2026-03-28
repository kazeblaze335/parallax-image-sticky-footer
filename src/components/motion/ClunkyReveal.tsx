"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClunkyReveal({
  text,
  delay = 1500, // Milliseconds
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const chars = text.split("");
  const totalChars = chars.length;

  const pathname = usePathname();

  // Framer Motion's delay property requires seconds, not milliseconds.
  // We do the exact same math, then divide by 1000.
  const transitionBuffer = 900;
  const baseDelayInSeconds = (delay + transitionBuffer) / 1000;

  return (
    <div
      // THE FIX: This key forces a hard unmount/remount on route change,
      // ensuring Framer Motion's animation clock resets perfectly every time.
      key={pathname}
      style={{ perspective: "1200px" }}
      className={`flex overflow-visible ${className}`}
    >
      {chars.map((char, index) => {
        const reverseIndex = totalChars - 1 - index;
        return (
          <motion.span
            key={index}
            // We return to the declarative initial/animate props
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { y: "100%", rotateX: 130, opacity: 0 },
              visible: {
                y: "0%",
                rotateX: 0,
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  // Framer Motion handles the clock natively
                  delay: baseDelayInSeconds + reverseIndex * 0.08,
                },
              },
            }}
            style={{
              display: "inline-block",
              transformOrigin: "50% 100%",
              willChange: "transform, opacity, rotateX",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
