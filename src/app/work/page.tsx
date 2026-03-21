"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import SplitText from "@/components/SplitText";

const neueMontreal = localFont({
  src: "../../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

// Reusing your project data
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
  const lenisRef = useRef<Lenis | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

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

  // Sticky footer calculation
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
      <main className="relative bg-zinc-100 min-h-screen text-zinc-900 overflow-clip">
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          {/* Header */}
          <div className="pt-40 px-8 md:px-16 pb-20">
            <SplitText
              text="SELECTED WORKS."
              delay={0.1}
              className={`!text-[12vw] md:!text-[9vw] leading-[0.85] tracking-tight uppercase ${neueMontreal.className}`}
            />
          </div>

          {/* Staggered Grid */}
          <div className="px-8 md:px-16 pb-32 max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
              {PROJECTS.map((project, index) => {
                // Stagger every even item on desktop
                const isEven = index % 2 !== 0;

                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className={`flex flex-col group ${isEven ? "md:mt-32" : ""}`}
                  >
                    <Link href={`/work/${project.slug}`} className="w-full">
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200">
                        <Image
                          src={project.src}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-6 flex justify-between items-start">
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-500">
                            {project.name}
                          </h2>
                          <p className="mt-2 text-sm font-medium text-zinc-500">
                            {project.role}
                          </p>
                        </div>
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 text-right">
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

        {/* Sticky Footer */}
        <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
          <Footer />
        </div>
      </main>
    </>
  );
}
