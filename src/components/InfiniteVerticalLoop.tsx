"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

// Register the Observer plugin
gsap.registerPlugin(Observer);

export default function InfiniteVerticalLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    let scrollY = 0;
    let targetY = 0;
    const ease = 0.08; // Adjust this for more or less "friction" on the scroll

    // Calculate the height of ONE single content block
    let contentHeight = content.offsetHeight;

    // Recalculate if the user resizes their window
    const onResize = () => {
      contentHeight = content.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Hijack native scrolling using GSAP Observer
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1, // Inverts the wheel so scrolling down moves the track up
      onChangeY: (self) => {
        // Add the scroll delta (how much the user scrolled) to our target
        targetY += self.deltaY;
      },
    });

    // The continuous animation loop
    const ticker = gsap.ticker.add(() => {
      // Lerp the scrollY towards the targetY for smooth coasting
      scrollY += (targetY - scrollY) * ease;

      // The Modulo Math for the infinite wrap
      // If we scroll past the top, snap to the bottom clone
      if (scrollY > 0) {
        scrollY -= contentHeight;
        targetY -= contentHeight;
      }
      // If we scroll past the bottom, snap back to the top clone
      else if (scrollY < -contentHeight) {
        scrollY += contentHeight;
        targetY += contentHeight;
      }

      // Apply the transformation via GSAP for GPU acceleration
      gsap.set(track, { y: scrollY });
    });

    // Cleanup on unmount
    return () => {
      observer.kill();
      gsap.ticker.remove(ticker);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden w-full h-screen bg-[#252526] text-[#f1efeb]"
    >
      {/* The Track that actually moves */}
      <div ref={trackRef} className="will-change-transform w-full">
        {/* === FIRST CONTENT BLOCK === */}
        <div
          ref={contentRef}
          className="w-full flex flex-col items-center justify-center py-32"
        >
          <h1
            className="text-[12vw] font-bold uppercase tracking-tighter leading-none mb-12"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            About Me
          </h1>
          <p
            className="text-3xl max-w-3xl text-center mb-32 leading-relaxed"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            I am a developer pursuing a Bachelor of Arts in Graphic Design. I
            build digital experiences that are visually compelling, deeply
            human, and technically sophisticated.
          </p>
          <div className="w-[40vw] h-[50vh] bg-[#066bbd] rounded-2xl mb-32 object-cover overflow-hidden">
            {/* Add an image or video asset here */}
          </div>
        </div>

        {/* === SECOND CONTENT BLOCK (EXACT CLONE) === */}
        <div
          className="w-full flex flex-col items-center justify-center py-32"
          aria-hidden="true"
        >
          <h1
            className="text-[12vw] font-bold uppercase tracking-tighter leading-none mb-12"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            About Me
          </h1>
          <p
            className="text-3xl max-w-3xl text-center mb-32 leading-relaxed"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            I am a developer pursuing a Bachelor of Arts in Graphic Design. I
            build digital experiences that are visually compelling, deeply
            human, and technically sophisticated.
          </p>
          <div className="w-[40vw] h-[50vh] bg-[#066bbd] rounded-2xl mb-32 object-cover overflow-hidden">
            {/* Same asset as above */}
          </div>
        </div>
      </div>
    </div>
  );
}
