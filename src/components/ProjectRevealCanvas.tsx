"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "@/utils/math";

const RevealMaterial = shaderMaterial(
  {
    uHoverState: 0,
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uHoverState;
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      vec2 uv = (vUv - 0.5) * (1.0 - uHoverState * 0.05) + 0.5;
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.005 * uHoverState;
      uv.x += wave;

      float r = texture2D(uTexture, uv + vec2(0.015 * (1.0 - uHoverState), 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(0.015 * (1.0 - uHoverState), 0.0)).b;

      gl_FragColor = vec4(r, g, b, uHoverState);
    }
  `,
);

extend({ RevealMaterial });

declare global {
  namespace ReactThreeFiber {
    interface IntrinsicElements {
      revealMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof RevealMaterial
      >;
    }
  }
}

function RevealImage({
  activeImage,
  isExpanding,
}: {
  activeImage: string | null;
  isExpanding: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetHover = useRef(0);

  // Updated fallback to the new directory structure
  const texture = useTexture(activeImage || "/images/project-1.jpg");

  useEffect(() => {
    targetHover.current = activeImage ? 1 : 0;
  }, [activeImage]);

  useFrame((state, delta) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uniforms.uHoverState.value = lerp(
        materialRef.current.uniforms.uHoverState.value,
        targetHover.current,
        0.08,
      );

      materialRef.current.uniforms.uTime.value += delta;

      const targetX = state.pointer.x * state.viewport.width * 0.05;
      const targetY = state.pointer.y * state.viewport.height * 0.05;

      meshRef.current.position.x = lerp(
        meshRef.current.position.x,
        isExpanding ? 0 : targetX,
        0.1,
      );
      meshRef.current.position.y = lerp(
        meshRef.current.position.y,
        isExpanding ? 0 : targetY,
        0.1,
      );

      const targetWidth = isExpanding ? state.viewport.width : 10;
      const targetHeight = isExpanding ? state.viewport.height : 5.5;

      meshRef.current.scale.x = lerp(
        meshRef.current.scale.x,
        targetWidth,
        0.08,
      );
      meshRef.current.scale.y = lerp(
        meshRef.current.scale.y,
        targetHeight,
        0.08,
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 5.5, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <revealMaterial ref={materialRef} uTexture={texture} transparent={true} />
    </mesh>
  );
}

export default function ProjectRevealCanvas({
  activeImage,
  isExpanding,
}: {
  activeImage: string | null;
  isExpanding: boolean;
}) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <RevealImage activeImage={activeImage} isExpanding={isExpanding} />
      </Canvas>
    </div>
  );
}
