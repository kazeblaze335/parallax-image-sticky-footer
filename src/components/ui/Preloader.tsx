"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useProgress } from "@react-three/drei";

export default function Preloader() {
  const { isLoading, setIsLoading } = useStore();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isCompletelyHidden, setIsCompletelyHidden] = useState(false);

  const { progress: r3fProgress, active: r3fActive } = useProgress();

  useEffect(() => {
    let currentProgress = 0;
    let animationFrameId: number;

    const updateProgress = () => {
      const targetProgress = r3fActive ? r3fProgress : 100;
      currentProgress += (targetProgress - currentProgress) * 0.1;
      currentProgress += Math.random() * 0.5;

      if (currentProgress >= 99.5) {
        setDisplayProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      } else {
        setDisplayProgress(Math.min(Math.round(currentProgress), 99));
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [r3fProgress, r3fActive, setIsLoading]);

  if (isCompletelyHidden) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isLoading ? 0 : "-100vh" }}
      transition={{
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      }}
      onAnimationComplete={() => {
        if (!isLoading) setIsCompletelyHidden(true);
      }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 touch-none"
    >
      <div className="overflow-hidden pt-4 pb-12 px-4 -mt-4 -mb-12 -mx-4">
        <motion.span
          // FIX: Changed exit target from 100% to 150% so it clears the huge bottom padding!
          animate={{ y: isLoading ? 0 : "150%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="block text-[12vw] leading-none font-bold tracking-tighter"
        >
          {displayProgress}%
        </motion.span>
      </div>

      <div className="absolute bottom-12 overflow-hidden">
        <motion.p
          // FIX: Updated to 150% here as well for safety
          animate={{ y: isLoading ? 0 : "150%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-500"
        >
          unitPLUS Initializing
        </motion.p>
      </div>
    </motion.div>
  );
}
