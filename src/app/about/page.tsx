"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import localFont from "next/font/local";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import SplitText from "@/components/SplitText";
import Image from "next/image";

const neueMontreal = localFont({
  src: "../../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sojuScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const sojuOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sojuY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <FilmGrain />
      {/* Added dark mode background and text colors to the main wrapper */}
      <main
        ref={containerRef}
        className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip transition-colors duration-500"
      >
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 dark:bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* THE SOJU SIZZLE HEADER */}
          {/* Added dark:bg-zinc-900 and dark:text-zinc-100 */}
          <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center overflow-hidden bg-zinc-200 dark:bg-zinc-900 transition-colors duration-500">
            <motion.div
              style={{ scale: sojuScale, opacity: sojuOpacity, y: sojuY }}
              className={`text-[25vw] leading-[0.75] tracking-tighter uppercase text-zinc-900 dark:text-zinc-100 ${neueMontreal.className}`}
            >
              SOJU
              <span className="text-[10vw] align-top relative top-4">®</span>
            </motion.div>
            <motion.p
              style={{ opacity: sojuOpacity }}
              className="absolute bottom-12 text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400"
            >
              Scroll to discover
            </motion.p>
          </div>

          {/* THE MASKING BIO CONTENT LAYER */}
          <div className="relative z-10 bg-zinc-100 dark:bg-zinc-950 pt-32 md:pt-48 px-8 md:px-16 pb-40 transition-colors duration-500">
            <SplitText
              text="SYSTEMS & SPATIAL DESIGN."
              delay={0.1}
              className={`!text-[8vw] md:!text-[6vw] leading-[0.85] tracking-tight uppercase max-w-5xl ${neueMontreal.className}`}
            />

            {/* Editorial Grid for Bio */}
            {/* Added dark:border-zinc-800 */}
            <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 border-t border-zinc-300 dark:border-zinc-800 pt-16 transition-colors duration-500">
              <div className="md:col-span-4 space-y-12">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                    Focus
                  </p>
                  <ul className="text-lg font-medium space-y-2">
                    <li>Creative Direction</li>
                    <li>React & Next.js</li>
                    <li>WebGL & Three.js</li>
                    <li>Interaction Design</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                    Location
                  </p>
                  <p className="text-lg font-medium">San Francisco, CA</p>
                </div>
              </div>

              <div className="md:col-span-8">
                <p className="text-2xl md:text-4xl leading-snug font-medium text-zinc-900 dark:text-zinc-100 mb-10 transition-colors duration-500">
                  I am a creative developer operating at the intersection of
                  digital environments and human behavior.
                </p>
                <div className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-8 max-w-2xl font-medium transition-colors duration-500">
                  <p>
                    With a Bachelor of Science in Cultural Anthropology, I
                    approach user interface design through an ethnographic lens.
                    This foundational perspective allows me to engineer spatial
                    web experiences that aren't just brutally modern, but deeply
                    intuitive and connected to how people naturally navigate
                    information.
                  </p>
                  <p>
                    My practice leverages high-performance tools like Next.js
                    and WebGL to treat typography and layout as structural
                    artifacts. Currently expanding my understanding of language
                    and human communication, I am preparing to pursue a Master's
                    in TESOL at San Francisco State University in Autumn 2026.
                  </p>
                </div>

                <div className="mt-16">
                  <Image
                    src="/images/parallax-2.jpg"
                    alt="Studio atmosphere"
                    width={800}
                    height={500}
                    className="w-full h-auto aspect-video object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
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
