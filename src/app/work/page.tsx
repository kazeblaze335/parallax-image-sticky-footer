"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Updated import paths to point to the new subfolders!
import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import FilmGrain from "@/components/ui/FilmGrain";
import StickyHeroReveal from "@/components/sections/StickyHeroReveal";

const neueMontreal = localFont({
  src: "../../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

const PROJECTS = [
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

export default function WorkGallery() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  // We removed Lenis and useScroll here because they are now managed
  // globally by Zustand and the SmoothScrollProvider in layout.tsx!

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip transition-colors duration-500">
        <Navbar />

        <div
          className="relative z-10 transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* 1. THE UNIFIED CLUNKY REVEAL HERO */}
          {/* Note: scrollYProgress is no longer needed as a prop because StickyHeroReveal reads from Zustand natively */}
          <StickyHeroReveal title="PROJECTS" showTrademark={false} />

          {/* 2. THE SLIDING CONTENT LAYER */}
          <div className="relative z-10 bg-zinc-100 dark:bg-zinc-950 pt-24 md:pt-40 pb-32 transition-colors duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] border-t border-zinc-200 dark:border-zinc-800">
            <div className="px-8 md:px-16 max-w-[1800px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                {PROJECTS.map((project, index) => {
                  const isEven = index % 2 !== 0;

                  return (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.6,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.1,
                      }}
                      className={`flex flex-col group ${isEven ? "md:mt-32" : ""}`}
                    >
                      <Link href={`/work/${project.slug}`} className="w-full">
                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-900 transition-colors duration-500">
                          <Image
                            src={project.src}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-6 flex justify-between items-start">
                          <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-zinc-500 dark:group-hover:text-zinc-400 duration-300">
                              {project.name}
                            </h2>
                            <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                              {project.role}
                            </p>
                          </div>
                          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 transition-colors duration-500 text-right">
                            {project.location}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={footerRef}
          className="fixed bottom-0 left-0 w-full z-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
