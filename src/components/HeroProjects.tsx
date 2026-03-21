"use client";

import { useState } from "react";
import Link from "next/link"; // NEW: Imported Next.js Link for pre-fetching
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import WavyRowCanvas from "./WavyRowCanvas";

const circular = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff",
  variable: "--font-circular",
});

const PROJECTS = [
  {
    name: "Native Instruments",
    services: "Visual Identity, Digital Flow",
    location: "Berlin / 2023",
    src: "/images/project-1.jpg",
    slug: "native-instruments",
    details:
      "A complete overhaul of the digital ecosystem for the premier music production brand, focusing on immersive spatial audio interfaces and seamless e-commerce integration.",
    role: "Lead Agency",
    year: "2023",
  },
  {
    name: "Oura",
    services: "Creative Direction, Product",
    location: "Oulu / 2023",
    src: "/images/project-2.jpg",
    slug: "oura",
    details:
      "Defining the visual language and interaction model for the next generation of wearable health technology, balancing clinical accuracy with premium lifestyle aesthetics.",
    role: "Digital Partner",
    year: "2023",
  },
  {
    name: "Hender Scheme",
    services: "Branding, Interior Design",
    location: "Tokyo / 2023",
    src: "/images/project-3.jpg",
    slug: "hender-scheme",
    details:
      "Translating the artisanal leather craftsmanship of the iconic Tokyo brand into a digital environment, utilizing tactile micro-interactions and organic motion curves.",
    role: "Creative Direction",
    year: "2023",
  },
  {
    name: "B&O Play",
    services: "Art Direction, Visuals",
    location: "Struer / 2022",
    src: "/images/project-4.jpg",
    slug: "bo-play",
    details:
      "An experimental web experience showcasing the acoustic engineering behind the portable audio line, utilizing real-time WebGL audio visualizers.",
    role: "Interactive Design",
    year: "2022",
  },
  {
    name: "Nothing",
    services: "Spatial Depth, Experience",
    location: "London / 2022",
    src: "/images/project-5.jpg",
    slug: "nothing",
    details:
      "A transparent, brutalist approach to product storytelling. We developed a custom rendering pipeline to showcase the internal components of the Ear (1) in real-time 3D.",
    role: "Technical Partner",
    year: "2022",
  },
  {
    name: "Gentle Monster",
    services: "Creative Concept, Experience",
    location: "Seoul / 2022",
    src: "/images/project-6.jpg",
    slug: "gentle-monster",
    details:
      "An avant-garde digital showroom that mirrors the surreal physical retail spaces of the eyewear brand, bending the rules of standard e-commerce navigation.",
    role: "Lead Agency",
    year: "2022",
  },
];

export default function HeroProjects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleRowClick = (slug: string) => {
    // Toggle accordion logic
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div
      className={`relative w-full flex flex-col pt-32 pb-8 px-8 bg-zinc-100 ${circular.className}`}
    >
      {/* 1. Global List Header */}
      <div className="border-b border-zinc-200 pb-2 mb-2 flex justify-between items-end uppercase text-xs font-bold tracking-[0.2em] text-zinc-400">
        <div className="w-[45%]">Project Name</div>
        <div className="w-[30%]">Services</div>
        <div className="w-[25%] text-right">Location</div>
      </div>

      {/* 2. Main Interactive List */}
      <div className="relative z-10 w-full pointer-events-auto">
        {PROJECTS.map((project) => {
          const isOpen = openSlug === project.slug;

          return (
            <ProjectRow
              key={project.slug}
              project={project}
              isOpen={isOpen}
              onToggle={() => handleRowClick(project.slug)}
            />
          );
        })}
      </div>
    </div>
  );
}

// 3. The Re-architected Row Component
function ProjectRow({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof PROJECTS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer group border-b border-zinc-200"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* DOM Row Header (Always Visible) */}
      <div className="relative z-10 flex justify-between items-center py-6">
        {/* Project Title */}
        <div className="w-[45%]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-500 transition-colors duration-300">
            {project.name}
          </h1>
        </div>

        {/* Services */}
        <div className="w-[30%] uppercase text-xs font-bold tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {project.services}
        </div>

        {/* Location */}
        <div className="w-[25%] text-right uppercase text-xs font-bold tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
          {project.location}
        </div>
      </div>

      {/* 4. The Accordion Reveal */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} // Smooth spring-like reveal
            className="overflow-hidden"
          >
            {/* Split layout inside the accordion */}
            <div className="pb-12 pt-4 flex gap-8 h-[400px]">
              {/* Left Column: The WebGL Image Canvas */}
              <div className="relative w-[45%] h-full rounded-lg overflow-hidden bg-zinc-200">
                <WavyRowCanvas
                  activeImage={project.src}
                  isHovered={isHovered || isOpen}
                  isExpanding={false}
                />
              </div>

              {/* Right Column: Project Metadata & Description */}
              <div className="w-[55%] flex flex-col justify-between h-full pl-8 border-l border-zinc-200">
                {/* Top Metadata Grid */}
                <div className="flex gap-16">
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                      Role
                    </div>
                    <div className="text-sm font-medium text-zinc-900">
                      {project.role}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">
                      Year
                    </div>
                    <div className="text-sm font-medium text-zinc-900">
                      {project.year}
                    </div>
                  </div>
                </div>

                {/* Bottom Description & Button */}
                <div>
                  <p className="text-xl md:text-2xl leading-relaxed text-zinc-900 font-medium max-w-xl mb-8">
                    {project.details}
                  </p>

                  {/* NEW: Replaced button with Next.js Link */}
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-block border-b border-zinc-900 pb-1 text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 hover:opacity-50 transition-opacity"
                    // Stop propagation so clicking the link doesn't also close the accordion!
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
