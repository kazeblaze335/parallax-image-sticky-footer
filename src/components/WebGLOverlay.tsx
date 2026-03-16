"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Continuously and smoothly rotate the geometry, independent of frame rate
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    // We brought back a slight rotationIntensity to the Float component
    // to give it a bit more natural drift since the mouse isn't driving it.
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={[1.2, 1.2, 1.2]}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function WebGLOverlay() {
  return (
    // pointer-events-none ensures the canvas never intercepts scroll or clicks
    <div className="absolute inset-0 z-20 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <FloatingGeometry />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
