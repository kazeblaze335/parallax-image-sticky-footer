"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { create } from "zustand";
import { useTransitionRouter } from "next-view-transitions";

// 1. Updated Component Factory Imports
// Note: If you deleted HardwareParallax earlier, you will need to replace it with
// standard <motion.div> or restore it. Assuming you kept it in /components/motion/
import ClunkyReveal from "@/components/motion/ClunkyReveal"; // Replaced SplitText!
import FilmGrain from "@/components/ui/FilmGrain";
import HardwareParallax from "@/components/motion/HardwareParallax";

// (Optional) If you deleted HardwareParallax in the cleanup phase, you can just use
// standard divs here. But I'll assume you moved it to /motion for now!
// import HardwareParallax from "@/components/motion/HardwareParallax";

// =======================================================
// BRAND OPTIMIZATION: Global Animation Culling State
// Pauses all gallery parallax effects during page transitions
// =======================================================
type AnimationState = {
  isPageAnimating: boolean;
  setAnimating: (value: boolean) => void;
};

const useAnimationStore = create<AnimationState>((set) => ({
  isPageAnimating: false,
  setAnimating: (value: boolean) => set({ isPageAnimating: value }),
}));

const pageAnimation = (onFinish: () => void) => {
  const setAnimating = useAnimationStore.getState().setAnimating;

  setAnimating(true);

  const oldNode = document.documentElement.animate(
    [
      { scale: 1, transform: "translateY(0%)", rotate: "0deg", opacity: 1 },
      {
        scale: 1.2,
        transform: "translateY(-10%)",
        rotate: "-5deg",
        opacity: 0,
      },
    ],
    {
      duration: 800,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  document.documentElement.animate(
    [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
    {
      duration: 800,
      easing: "cubic-bezier(0.9, 0, 0.1, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );

  oldNode.onfinish = () => {
    setAnimating(false);
    onFinish();
  };
};

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useTransitionRouter();

  const handleBackNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // FIX: Point the back button to /work instead of /
    router.push("/work", {
      onTransitionReady: () => pageAnimation(() => {}),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // 2. Lenis initialization removed!
    // It's handled perfectly by the Global SmoothScrollProvider.
  }, []);

  const isPageAnimating = useAnimationStore((state) => state.isPageAnimating);

  // Quick helper to format the slug back into a readable title
  const formattedTitle = slug.replace(/-/g, " ");

  return (
    <>
      <FilmGrain />
      <main className="relative bg-zinc-100 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 pb-32 transition-colors duration-500 overflow-clip">
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 mix-blend-overlay geo-layer"
          style={{
            backgroundImage: `repeating-linear-gradient(35deg, rgba(161,161,170,0.1), rgba(161,161,170,0.1) 1px, transparent 1px, transparent 150px)`,
          }}
        />

        {/* Global Navigation */}
        <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-zinc-100">
          <Link
            href="/work"
            onClick={handleBackNavigation}
            className="text-sm font-bold tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
          >
            Back to Work
          </Link>
          <div className="text-sm font-bold tracking-[0.2em] uppercase">
            2023
          </div>
        </div>

        {/* Hero title section */}
        <div className="pt-40 px-8 md:px-16 mb-24 relative z-10">
          <h1 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-zinc-500 mb-8">
            Case Study
          </h1>
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.85] mb-12 max-w-5xl">
            {/* 3. Replaced SplitText with your new ClunkyReveal primitive */}
            <ClunkyReveal text={formattedTitle} delay={0.2} />
          </div>
        </div>

        {/* Hardware Accelerated Parallax Gallery */}
        {/* Note: If you deleted HardwareParallax, just change these to <div className="..."> */}
        <div className="flex flex-col gap-8 md:gap-32 px-4 md:px-16 relative z-10">
          <HardwareParallax
            speed={0.15}
            isPaused={isPageAnimating}
            className="w-full aspect-[4/3] md:aspect-video rounded-lg"
          >
            <Image
              src="/images/project-1.jpg"
              alt="Gallery 1"
              fill
              className="object-cover"
              decoding="async"
              priority
            />
          </HardwareParallax>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <HardwareParallax
              speed={0.25}
              isPaused={isPageAnimating}
              className="w-full aspect-square rounded-lg"
            >
              <Image
                src="/images/project-2.jpg"
                alt="Gallery 2"
                fill
                className="object-cover"
                decoding="async"
              />
            </HardwareParallax>

            <HardwareParallax
              speed={0.1}
              isPaused={isPageAnimating}
              className="w-full aspect-square rounded-lg md:mt-32"
            >
              <Image
                src="/images/project-3.jpg"
                alt="Gallery 3"
                fill
                className="object-cover"
                decoding="async"
              />
            </HardwareParallax>
          </div>

          <HardwareParallax
            speed={0.2}
            isPaused={isPageAnimating}
            className="w-full aspect-[4/3] md:aspect-video rounded-lg"
          >
            <Image
              src="/images/project-4.jpg"
              alt="Gallery 4"
              fill
              className="object-cover"
              decoding="async"
            />
          </HardwareParallax>
        </div>
      </main>
    </>
  );
}
