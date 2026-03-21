"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useTransform, useMotionValue } from "framer-motion";
import localFont from "next/font/local";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/NavBar";
import FilmGrain from "@/components/FilmGrain";
import SplitText from "@/components/SplitText";
import Image from "next/image";

const neueMontreal = localFont({
  src: "../../../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
});

const projectData: Record<string, any> = {
  default: {
    title: "Project Archive",
    client: "Internal Research",
    role: "Creative Direction & WebGL",
    stack: "Next.js, React Three Fiber, GSAP",
    description:
      "This project explores the intersection of digital environments and human behavior. By applying ethnographic principles to user interface design, we engineered a spatial web experience that feels brutally modern yet deeply intuitive. The typography acts as a structural artifact, guiding the user through an endless vertical space.",
    images: [
      "/images/parallax-1.jpg",
      "/images/parallax-2.jpg",
      "/images/project-12.jpg",
      "/images/project-1.jpg",
      "/images/project-2.jpg",
    ],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "default";

  const formattedTitle = slug.replace(/-/g, " ").toUpperCase();
  const data = projectData[slug] || {
    ...projectData["default"],
    title: formattedTitle,
  };

  const lenisRef = useRef<Lenis | null>(null);

  const scrollY = useMotionValue(0);

  // =======================================================
  // HEAVY PARALLAX MATH
  // =======================================================
  const col1Y = useTransform(scrollY, [0, 3000], [0, -2000]);
  const col2Y = useTransform(scrollY, [0, 3000], [0, -800]);
  const interiorY = useTransform(scrollY, [0, 3000], [-250, 250]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: any) => {
      scrollY.set(e.scroll);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [scrollY]);

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 min-h-screen text-zinc-900 overflow-clip">
        <Navbar />

        {/* =======================================================
            THE Z-INDEX MASKING WALL
            Added relative, z-10, and bg-zinc-100 here so the 
            columns slide flawlessly underneath this section!
            ======================================================= */}
        <div className="relative z-10 bg-zinc-100 pt-40 px-8 md:px-16 pb-20">
          <SplitText
            text={data.title}
            delay={0.2}
            className={`!text-[12vw] md:!text-[9vw] leading-[0.85] tracking-tight uppercase ${neueMontreal.className}`}
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-zinc-300 pt-10">
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Client
              </p>
              <p className="text-lg font-medium">{data.client}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Role & Stack
              </p>
              <p className="text-lg font-medium">{data.role}</p>
              <p className="text-sm text-zinc-500">{data.stack}</p>
            </div>
            <div className="space-y-2 md:pl-10">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                The Brief
              </p>
              <p className="text-md leading-relaxed font-medium">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            THE PARALLAX GALLERY
            Removed overflow-hidden so the math doesn't break!
            ======================================================= */}
        <div className="relative w-full bg-zinc-200 flex justify-center gap-4 md:gap-10 py-32 md:py-64 border-t border-zinc-300">
          {/* Column 1 */}
          <motion.div
            style={{ y: col1Y }}
            className="flex flex-col gap-10 w-[90%] md:w-[40%]"
          >
            {data.images.map((src: string, index: number) => (
              <div
                key={`col1-${index}`}
                className="relative w-full h-[50vh] md:h-[80vh] shrink-0 overflow-hidden rounded-xl shadow-lg"
              >
                <motion.div
                  style={{ y: interiorY }}
                  className="absolute inset-0 w-full h-full scale-[1.2]"
                >
                  <Image
                    src={src}
                    alt={`Project visual A ${index}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div
            style={{ y: col2Y }}
            className="hidden md:flex flex-col gap-10 w-[40%]"
          >
            {[...data.images].reverse().map((src: string, index: number) => (
              <div
                key={`col2-${index}`}
                className="relative w-full h-[60vh] md:h-[90vh] shrink-0 overflow-hidden rounded-xl shadow-lg"
              >
                <motion.div
                  style={{ y: interiorY }}
                  className="absolute inset-0 w-full h-full scale-[1.2]"
                >
                  <Image
                    src={src}
                    alt={`Project visual reverse B ${index}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
