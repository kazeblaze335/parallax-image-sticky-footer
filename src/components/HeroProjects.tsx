"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import ProjectRevealCanvas from "./ProjectRevealCanvas";

// Using your Circular Std setup
const circular = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff",
  variable: "--font-circular",
});

const PROJECTS = [
  {
    name: "Native Instruments",
    src: "/images/project-1.jpg",
    slug: "native-instruments",
  },
  { name: "Oura", src: "/images/project-2.jpg", slug: "oura" },
  {
    name: "Hender Scheme",
    src: "/images/project-3.jpg",
    slug: "hender-scheme",
  },
  { name: "B&O Play", src: "/images/project-4.jpg", slug: "bo-play" },
  { name: "Nothing", src: "/images/project-5.jpg", slug: "nothing" },
  {
    name: "Gentle Monster",
    src: "/images/project-6.jpg",
    slug: "gentle-monster",
  },
  {
    name: "Officine Panerai",
    src: "/images/project-7.jpg",
    slug: "officine-panerai",
  },
  { name: "Polestar", src: "/images/project-8.jpg", slug: "polestar" },
  {
    name: "Fragment Design",
    src: "/images/project-9.jpg",
    slug: "fragment-design",
  },
  { name: "Superfuture", src: "/images/project-10.jpg", slug: "superfuture" },
  {
    name: "Bang & Olufsen",
    src: "/images/project-11.jpg",
    slug: "bang-olufsen",
  },
  { name: "Sonos", src: "/images/project-12.jpg", slug: "sonos" },
];

export default function HeroProjects() {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleProjectClick = (project: (typeof PROJECTS)[0]) => {
    setIsExpanding(true);
    setActiveProject(project);

    // Wait for the WebGL plane to scale up (800ms) before navigating
    setTimeout(() => {
      router.push(`/work/${project.slug}`);
    }, 800);
  };

  return (
    <div
      className={`relative h-screen w-full flex flex-col p-8 bg-zinc-100 ${circular.className}`}
    >
      {/* 1. The WebGL Canvas sits behind the text */}
      <ProjectRevealCanvas
        activeImage={activeProject ? activeProject.src : null}
        isExpanding={isExpanding}
      />

      {/* 3. The Main Interactive Inline Text Block */}
      {/* Flex-1 takes up all middle space. 
        Justify-center centers it. 
        pb-24/md:pb-32 physically pushes the text up from the center! 
      */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[90%] md:max-w-[85%] mx-auto pointer-events-auto pb-24 md:pb-32">
        {/* <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
          Trusted Us
        </div> */}

        <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.1] tracking-tight font-bold text-zinc-900 mix-blend-difference">
          {PROJECTS.map((project, index) => {
            const isHovered = activeProject?.name === project.name;
            const isDimmed = activeProject && !isHovered;

            return (
              <span
                key={project.name}
                className="inline-block mr-[0.25em] mb-2"
              >
                <span
                  onMouseEnter={() => !isExpanding && setActiveProject(project)}
                  onMouseLeave={() => !isExpanding && setActiveProject(null)}
                  onClick={() => handleProjectClick(project)}
                  className={`
                    cursor-pointer transition-all duration-500
                    ${isHovered ? "border-b-4 border-zinc-900 text-zinc-900" : "border-b-4 border-transparent"}
                    ${isDimmed ? "opacity-20" : "opacity-100"}
                    ${isExpanding && isHovered ? "text-white border-white" : ""}
                  `}
                >
                  {project.name}
                </span>
                <span
                  className={`transition-opacity duration-500 ${isDimmed ? "opacity-20" : "opacity-100"}`}
                >
                  {index === PROJECTS.length - 1 ? "." : ","}
                </span>
              </span>
            );
          })}
        </h1>
      </div>

      {/* 4. Bottom UI Layer (Flex-none keeps it locked to the bottom) */}
      <div className="relative z-10 flex-none flex justify-between items-end uppercase text-xs font-bold tracking-widest text-zinc-900 pointer-events-none">
        {/* <div>Experiment 503</div>
        <div>Developed by Codegrid</div> */}
      </div>
    </div>
  );
}
