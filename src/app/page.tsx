"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/ui/NavBar";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Footer from "@/components/ui/Footer";
import FilmGrain from "@/components/ui/FilmGrain";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import StickyHeroReveal from "@/components/sections/StickyHeroReveal";
import SwissVideoBlock from "@/components/sections/SwissVideoBlock";

// This data structure perfectly matches the strict TypeScript interface
// we built into the ProjectShowcase component.
const HOME_PROJECTS = [
  {
    name: "Native Instruments",
    location: "Berlin / 2023",
    src: "/images/project-1.jpg",
    slug: "native-instruments",
    role: "Lead Agency",
  },
  {
    name: "Oura",
    location: "Oulu / 2023",
    src: "/images/project-2.jpg",
    slug: "oura",
    role: "Digital Partner",
  },
  {
    name: "Hender Scheme",
    location: "Tokyo / 2023",
    src: "/images/project-3.jpg",
    slug: "hender-scheme",
    role: "Creative Direction",
  },
  {
    name: "B&O Play",
    location: "Struer / 2022",
    src: "/images/project-4.jpg",
    slug: "bo-play",
    role: "Interactive Design",
  },
  {
    name: "Nothing",
    location: "London / 2022",
    src: "/images/project-5.jpg",
    slug: "nothing",
    role: "Technical Partner",
  },
  {
    name: "Gentle Monster",
    location: "Seoul / 2022",
    src: "/images/project-6.jpg",
    slug: "gentle-monster",
    role: "Lead Agency",
  },
];

export default function Home() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position on route load
    window.scrollTo(0, 0);
  }, []);

  // Dynamically measure the footer height so the main content layer
  // leaves the exact right amount of space to reveal the sticky footer.
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });
    if (footerRef.current) resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip transition-colors duration-500">
        <Navbar />

        <div
          className="relative z-10 transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* 1. THE HERO REVEAL */}
          <StickyHeroReveal
            title="NØRD OBJECTS"
            subtitle="Explore our universe"
            showTrademark={true}
          />

          {/* 2. THE SLIDING CONTENT LAYER */}
          <div className="relative z-10 bg-zinc-100 dark:bg-zinc-950 pt-24 transition-colors duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
            {/* Featured Works & Video Block */}
            <div className="w-full px-8 md:px-16 pb-16">
              <p className="mb-4 text-sm font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                Featured Works
              </p>
              <FeaturedWorks />
              <SwissVideoBlock />
            </div>

            {/* The Interactive Project Showcase */}
            <div className="w-full pt-16 pb-24 border-t border-zinc-200 dark:border-zinc-800">
              <div className="w-full flex justify-center mb-8 px-8 md:px-16">
                <p className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500 transition-colors duration-500">
                  Selected Projects
                </p>
              </div>

              {/* Injecting the exact data payload */}
              <ProjectShowcase projects={HOME_PROJECTS} />
            </div>

            {/* The Velocity Marquee */}
            <div className="flex flex-col items-center justify-center py-32 text-center border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-500 overflow-hidden">
              <VelocityMarquee text="KEEP SCROLLING • " />

              <p className="mt-12 text-xl font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                The sticky footer awaits.
              </p>
            </div>
          </div>
        </div>

        {/* 3. THE STICKY FOOTER */}
        <div
          ref={footerRef}
          className="fixed bottom-0 left-0 w-full z-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Footer />
          </div>

          <button
            onClick={scrollToTop}
            className="pointer-events-auto absolute bottom-8 right-8 md:bottom-12 md:right-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-500 z-50 group"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-y-1 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 19V5M5 12l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}
