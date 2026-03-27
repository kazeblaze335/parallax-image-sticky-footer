"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue, // FIX: Import useMotionValue directly from framer-motion
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function VelocityMarquee({ text }: { text: string }) {
  // FIX: Initialize baseX as a MotionValue instead of a React Ref
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(1);
  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // useTransform is now perfectly happy accepting the MotionValue!
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -3 * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // FIX: Update the MotionValue using .set() and .get() instead of .current
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap m-0 flex-nowrap leading-[0.85] tracking-tighter uppercase text-[16vw] font-bold text-zinc-900 dark:text-zinc-100">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
        <span className="block mr-8">{text}</span>
      </motion.div>
    </div>
  );
}
