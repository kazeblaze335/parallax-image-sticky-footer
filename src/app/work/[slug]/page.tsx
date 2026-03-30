"use client";

import { useEffect, useRef, useState, use } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPaperPushTransition } from "@/utils/animations";

import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import FilmGrain from "@/components/ui/FilmGrain";
import ParallaxImage from "@/components/motion/ParallaxImage";

// MOCK DATABASE
const PROJECT_DB: Record<string, any> = {
  "native-instruments": {
    name: "Native Instruments",
    client: "NI GmbH",
    role: "Lead Agency",
    timeline: "Q3 2023",
    location: "Berlin, DE",
    heroImage: "/images/project-1.jpg",
    challenge:
      "Redefining the digital ecosystem for the world's leading provider of software and hardware for computer-based audio production.",
    images: [
      "/images/project-2.jpg",
      "/images/project-3.jpg",
      "/images/project-4.jpg",
    ],
    nextProject: { name: "Oura", slug: "oura" },
  },
  default: {
    name: "Project Archive",
    client: "Various",
    role: "Creative Direction",
    timeline: "2023",
    location: "Global",
    heroImage: "/images/project-2.jpg",
    challenge:
      "An exploration of interaction, typography, and hardware-accelerated rendering in modern web environments.",
    images: [
      "/images/project-3.jpg",
      "/images/project-4.jpg",
      "/images/project-5.jpg",
    ],
    nextProject: { name: "Native Instruments", slug: "native-instruments" },
  },
};

export default function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const router = useTransitionRouter();
  const { scrollYProgress } = useScroll();

  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const project = PROJECT_DB[slug] || PROJECT_DB["default"];

  // --- FOOTER CUSTOM CURSOR LOGIC ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);

  const cursorXSpring = useSpring(cursorX, {
    damping: 25,
    stiffness: 400,
    mass: 0.5,
  });
  const cursorYSpring = useSpring(cursorY, {
    damping: 25,
    stiffness: 400,
    mass: 0.5,
  });
  const cursorOpacitySpring = useSpring(cursorOpacity, {
    damping: 20,
    stiffness: 300,
  });

  const handleFooterMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };
  // ----------------------------------

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

  const handleNavigation = (e: React.MouseEvent, targetSlug: string) => {
    e.preventDefault();
    if (typeof triggerPaperPushTransition === "function") {
      triggerPaperPushTransition();
    }

    setTimeout(() => {
      router.push(`/work/${targetSlug}`, {
        onTransitionReady: () => triggerPaperPushTransition(),
      });
    }, 400);
  };

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 overflow-clip selection:bg-[#CCFF00] selection:text-zinc-900 transition-colors duration-500">
        <Navbar />

        <div
          className="relative z-10 bg-zinc-100 dark:bg-zinc-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500"
          style={{ marginBottom: `${footerHeight}px` }}
        >
          <section className="pt-40 md:pt-56 px-6 md:px-12 max-w-[1800px] mx-auto relative z-10">
            <div className="overflow-hidden py-10 -my-10">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[15vw] md:text-[11vw] font-black font-neue leading-[0.85] tracking-tighter uppercase pr-[0.05em]"
              >
                {project.name}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-b border-zinc-300 dark:border-zinc-800 py-6 mt-12 md:mt-24"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                  Client
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {project.client}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                  Role
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {project.role}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                  Timeline
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {project.timeline}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-zinc-400">
                  Location
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {project.location}
                </span>
              </div>
            </motion.div>
          </section>

          <section className="w-full h-[70vh] md:h-screen mt-12 md:mt-24 overflow-hidden relative">
            <motion.div
              style={{ y: heroY, scale: heroScale }}
              className="w-full h-full origin-bottom"
            >
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </section>

          <section className="px-6 md:px-12 py-24 md:py-40 max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
            <div className="md:col-span-4 flex flex-col gap-8">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                The Challenge
              </h2>
              <div className="hidden md:block w-[1px] h-24 bg-zinc-300 dark:bg-zinc-800 mt-auto origin-top" />
            </div>
            <div className="md:col-span-8 md:col-start-6">
              <p className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                {project.challenge}
              </p>
            </div>
          </section>

          <section className="px-6 md:px-12 pb-32 max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 relative z-10">
            <ParallaxImage
              src={project.images[0]}
              alt="Detail 1"
              className="md:col-span-7 aspect-[4/3] bg-zinc-200 dark:bg-zinc-900 rounded-sm"
            />
            <ParallaxImage
              src={project.images[1]}
              alt="Detail 2"
              className="md:col-span-4 md:col-start-9 aspect-[3/4] bg-zinc-200 dark:bg-zinc-900 rounded-sm mt-12 md:mt-40"
            />
            <ParallaxImage
              src={project.images[2]}
              alt="Detail 3"
              className="md:col-span-10 md:col-start-2 aspect-[16/9] bg-zinc-200 dark:bg-zinc-900 rounded-sm mt-12 md:mt-32"
            />
          </section>

          {/* Next Project Footer */}
          <a
            href={`/work/${project.nextProject.slug}`}
            onClick={(e) => handleNavigation(e, project.nextProject.slug)}
            onMouseMove={handleFooterMouseMove}
            onMouseEnter={() => cursorOpacity.set(1)}
            onMouseLeave={() => cursorOpacity.set(0)}
            className="relative w-full h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center overflow-hidden z-20 cursor-none block"
          >
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8 transition-colors hover:text-[#CCFF00]">
              Next Project
            </p>

            {/* Isolated Hover Group with Tight Mask */}
            <div className="group flex overflow-hidden pt-4 pb-2 px-8 -mt-4 -mb-2 -mx-8 relative z-10 cursor-none">
              {project.nextProject.name
                .split("")
                .map((char: string, index: number) => (
                  <span
                    key={index}
                    className="relative inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    <span
                      className="block transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                      style={{ transitionDelay: `${index * 0.02}s` }}
                    >
                      <span className="block text-[12vw] font-black font-neue leading-none tracking-tighter uppercase pr-[0.1em]">
                        {char}
                      </span>
                      <span className="absolute left-0 top-full block text-[12vw] font-black font-neue leading-none tracking-tighter uppercase pr-[0.1em]">
                        {char}
                      </span>
                    </span>
                  </span>
                ))}
            </div>

            {/* Custom Hardware-Accelerated Cursor */}
            <motion.div
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: cursorOpacitySpring,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#CCFF00] text-zinc-900 flex items-center justify-center text-xs font-bold tracking-widest uppercase pointer-events-none z-50 mix-blend-difference"
            >
              View
            </motion.div>
          </a>
        </div>

        {/* The Fixed Bottom Reveal Footer */}
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
