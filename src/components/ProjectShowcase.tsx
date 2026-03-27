"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { Link } from "next-view-transitions";

// Using the images found in your public/images folder
const projects = [
  {
    title: "TWICE",
    service: "Interaction & Development",
    year: "2024",
    image: "/images/project-1.jpg",
    href: "/work/twice",
  },
  {
    title: "The Damai",
    service: "Design & Development",
    year: "2024",
    image: "/images/project-2.jpg",
    href: "/work/the-damai",
  },
  {
    title: "FABRIC™",
    service: "Design & Development",
    year: "2023",
    image: "/images/project-3.jpg",
    href: "/work/fabric",
  },
  {
    title: "Aanstekelijk",
    service: "Design & Development",
    year: "2023",
    image: "/images/project-4.jpg",
    href: "/work/aanstekelijk",
  },
  {
    title: "Base Create",
    service: "Design & Development",
    year: "2023",
    image: "/images/project-5.jpg",
    href: "/work/base-create",
  },
];

export default function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Spring physics for the floating image cursor
  const springConfig = { stiffness: 300, damping: 25, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Track mouse coordinates across the entire window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (150px) to perfectly center the image on the cursor
      cursorX.set(e.clientX - 150);
      cursorY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="relative w-full pb-32">
      {/* 1. THE TYPOGRAPHIC LIST */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="w-1/2">Client</div>
          <div className="w-1/4 hidden md:block">Services</div>
          <div className="w-1/4 text-right">Year</div>
        </div>

        <ul className="flex flex-col w-full">
          {projects.map((project, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group border-b border-zinc-200 dark:border-zinc-800 relative z-10"
            >
              <Link
                href={project.href}
                className="flex items-center py-10 md:py-16 w-full mix-blend-difference cursor-pointer"
              >
                {/* Title */}
                <div className="w-1/2 overflow-hidden">
                  <h4 className="text-4xl md:text-6xl font-bold tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                    {project.title}
                  </h4>
                </div>

                {/* Services */}
                <div className="w-1/4 hidden md:block text-zinc-500 transition-colors duration-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                  {project.service}
                </div>

                {/* Year */}
                <div className="w-1/2 md:w-1/4 text-right text-zinc-500 transition-colors duration-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                  {project.year}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. THE FLOATING IMAGE CURSOR */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] overflow-hidden pointer-events-none z-50 rounded-md"
        style={{ x: cursorX, y: cursorY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{
                backgroundImage: `url(${project.image})`,
                opacity: hoveredIndex === index ? 1 : 0,
                zIndex: hoveredIndex === index ? 10 : 0,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
