"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

export default function VimeoSection({ videoId }: { videoId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (containerRef.current && !playerRef.current) {
      playerRef.current = new Player(containerRef.current, {
        id: parseInt(videoId),
        background: true, // Auto-plays, loops, mutes, and hides controls
        responsive: true,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Vimeo Wrapper */}
      <div
        ref={containerRef}
        className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full min-h-screen -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* Optional Overlay Content */}
      <div className="relative z-10 mix-blend-difference text-white text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
          Cinematic
        </h2>
      </div>
    </div>
  );
}
