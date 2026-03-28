"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function InteractiveVideoBlock({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // NEW: Add video ref
  const [isHovered, setIsHovered] = useState(false);
  const [playing, setPlaying] = useState(false); // NEW: Add playing state (initially paused)

  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  // NEW: Function to toggle play/pause and playing state
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  // NEW: Add a click listener to the entire container to toggle play
  const handleClick = (e: React.MouseEvent) => {
    // Check if the click was on the video element itself (not any overlay)
    // If you have clickable elements on top, adjust this.
    togglePlayPause();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} // NEW: Handle container click to toggle
      className="relative w-full aspect-video rounded-sm overflow-hidden bg-zinc-900 shadow-2xl cursor-none"
    >
      <video
        ref={videoRef} // NEW: Attach video ref
        src={src}
        poster={poster}
        playsInline
        muted
        // autoPlay // Task 4: Explicitly remove autoPlay to ensure it starts paused
        loop
        className={`absolute inset-0 w-full h-full object-cover scale-[1.02] opacity-80 ${playing ? "grayscale-0" : "grayscale"}`} // Subtle grayscale effect when paused
      />

      {/* NEW: Updated Tooltip Text */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-0 flex items-center justify-center w-24 h-24 -ml-12 -mt-12 bg-zinc-100 text-zinc-900 rounded-full z-50 mix-blend-difference"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-center leading-tight">
          {playing ? "Pause\nVideo" : "Play\nVideo"}
        </span>
      </motion.div>
    </div>
  );
}
