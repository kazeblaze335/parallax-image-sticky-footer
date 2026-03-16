"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import ParallaxImage from "@/components/ParallaxImage";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";
import VimeoSection from "@/components/VimeoSection";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    // We are using the buttery smooth lerp configuration now
    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Lock Scroll During Preloader
  useEffect(() => {
    if (isLoading) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoading]);

  // 3. Dynamically Measure Footer for Sticky Reveal
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {/* PRELOADER OVERLAY */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" setLoading={setIsLoading} />}
      </AnimatePresence>

      <main className="relative bg-zinc-950">
        <Navbar />

        {/* MAIN CONTENT WRAPPER */}
        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* Intro Section */}
          <div className="h-screen flex items-center justify-center text-zinc-900">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter flex flex-col items-center">
              {/* Added the 1.2s and 1.4s delays to wait for the Preloader exit animation! */}
              {!isLoading && (
                <>
                  <SplitText text="Scroll" delay={1.2} />
                  <SplitText text="Down" delay={1.4} />
                </>
              )}
            </h1>
          </div>

          {/* First Parallax: Full Screen background with WebGL Overlay */}
          <ParallaxImage
            src="/test-image-1.jpg"
            alt="Full screen background"
            className="h-screen w-full"
            showWebGL={true}
          />

          {/* Spacing Section */}
          <div className="h-[40vh] flex items-center justify-center text-zinc-900">
            <p className="text-2xl font-light">
              {!isLoading && (
                <SplitText text="Seamless spatial depth." delay={0.1} />
              )}
            </p>
          </div>

          {/* Second Parallax: Middle Rectangular Section */}
          <div className="py-20 flex justify-center bg-zinc-200">
            <ParallaxImage
              src="/test-image-2.jpg"
              alt="Rectangular window parallax"
              className="h-[60vh] w-[85%] md:w-[60%] rounded-2xl"
            />
          </div>

          {/* Full Screen Vimeo Section */}
          <VimeoSection videoId="76979871" />

          {/* Final Section before Footer */}
          <div className="h-[50vh] flex flex-col items-center justify-center text-zinc-900">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              {!isLoading && <SplitText text="Keep Scrolling" />}
            </h2>
            <p className="text-xl">The sticky footer is right below.</p>
          </div>
        </div>

        {/* STICKY FOOTER WRAPPER */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
