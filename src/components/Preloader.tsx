"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Easing } from "@/utils/math";

// 64 chunks for an 8x8 grid, feeling very "computer science"
const TOTAL_CHUNKS = 64;

export default function Preloader({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) {
  const [chunksLoaded, setChunksLoaded] = useState(0);

  useEffect(() => {
    // Simulate data chunk resolution
    const interval = setInterval(() => {
      setChunksLoaded((prev) => {
        if (prev >= TOTAL_CHUNKS) {
          clearInterval(interval);
          return TOTAL_CHUNKS;
        }
        // Load 1 to 3 chunks at a time for an authentic, staggered loading feel
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 60); // Faster interval for an aggressive, technical feel

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chunksLoaded >= TOTAL_CHUNKS) {
      // Small pause at full resolution before sliding away
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [chunksLoaded, setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-end bg-zinc-950 p-8 md:p-16 text-zinc-100 pointer-events-auto font-mono"
      exit={{
        y: "-100vh",
        transition: { duration: 1.2, ease: Easing.ExpoInOut },
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 md:gap-0">
        {/* Left Side: Terminal Readout */}
        <div className="flex flex-col gap-2 uppercase tracking-widest text-xs md:text-sm">
          <div className="text-zinc-500 mb-2">System Initializing...</div>
          <div className="flex justify-between w-48">
            <span>SYS.MEM</span>
            <span className="text-green-400">OK</span>
          </div>
          <div className="flex justify-between w-48">
            <span>WEBGL.CTX</span>
            <span
              className={chunksLoaded > 20 ? "text-green-400" : "text-zinc-600"}
            >
              {chunksLoaded > 20 ? "MOUNTED" : "AWAITING"}
            </span>
          </div>
          <div className="flex justify-between w-48 mt-4 border-t border-zinc-800 pt-4">
            <span>CHUNKS</span>
            <span className="text-white font-bold text-base">
              {Math.min(chunksLoaded, TOTAL_CHUNKS)} / {TOTAL_CHUNKS}
            </span>
          </div>
        </div>

        {/* Right Side: The Visual Data Grid */}
        <div className="grid grid-cols-8 gap-1 md:gap-2">
          {Array.from({ length: TOTAL_CHUNKS }).map((_, i) => (
            <div
              key={i}
              // The chunk lights up (bg-zinc-200) once the loaded count passes its index
              className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-75 ${
                i < chunksLoaded
                  ? "bg-zinc-200"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
