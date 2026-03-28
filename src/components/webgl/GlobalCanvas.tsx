"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { webglTunnel } from "@/providers/TunnelProvider";

export default function GlobalCanvas() {
  return (
    // Fixed to the viewport, z-index -1 keeps it behind your DOM layout
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-transparent isolate transform-gpu">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1} />

        {/* THE EXIT PORTAL: 3D elements injected from other pages render here! */}
        <webglTunnel.Out />

        {/* Preload ensures assets aren't dumped from memory on route change */}
        <Preload all />
      </Canvas>
    </div>
  );
}
