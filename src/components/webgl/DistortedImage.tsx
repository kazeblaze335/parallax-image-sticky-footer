"use client";

import { useRef } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. The Custom Liquid Distortion Shader
const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader: Bends the UV coordinates to create the distortion
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;

    void main() {
      vec2 uv = vUv;
      
      // Subtle sine wave distortion
      uv.y += sin(uv.x * 8.0 + uTime * 1.5) * 0.015;
      uv.x += cos(uv.y * 8.0 + uTime * 1.5) * 0.015;
      
      gl_FragColor = texture2D(uTexture, uv);
    }
  `,
);

extend({ LiquidMaterial });

declare global {
  namespace ReactThreeFiber {
    interface IntrinsicElements {
      liquidMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof LiquidMaterial
      >;
    }
  }
}

function Scene({ src }: { src: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(src);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh>
      {/* Plane sized to fill the canvas */}
      <planeGeometry args={[16, 9]} />
      <liquidMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export default function DistortedImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene src={src} />
      </Canvas>
    </div>
  );
}
