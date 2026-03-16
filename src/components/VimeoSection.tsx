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
        autoplay: false,
        controls: false,
        byline: false,
        portrait: false,
        title: false,
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  const togglePlay = async () => {
    if (!playerRef.current) return;
    const isPaused = await playerRef.current.getPaused();
    if (isPaused) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-zinc-950 flex items-center justify-center cursor-pointer group"
      onClick={togglePlay}
    >
      {/* THE CSS HACK: Forces the iframe to act like object-fit: cover */}
      <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
        <div
          ref={containerRef}
          className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
        />
      </div>

      <div className="relative z-10 mix-blend-difference text-white text-center pointer-events-none">
        <h2 className="text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase opacity-70 group-hover:opacity-0 transition-opacity duration-500">
          [ Click to Play ]
        </h2>
      </div>
    </div>
  );
}
