"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { tunnel } from "@/providers/TunnelProvider";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uGlitch;
  
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    // 1. PERFECT OBJECT-COVER MATH
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    
    vec2 p = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // 2. APPLY GLITCH TO THE CORRECTED UVs
    float tear1 = step(0.9, sin(p.y * 40.0 + uTime * 20.0)) * uGlitch * 0.05;
    float tear2 = step(0.8, sin(p.y * 15.0 - uTime * 10.0)) * uGlitch * -0.08;
    p.x += tear1 + tear2;

    float r = texture2D(uTexture, p + vec2(uGlitch * 0.03, 0.0)).r;
    float g = texture2D(uTexture, p).g;
    float b = texture2D(uTexture, p - vec2(uGlitch * 0.03, 0.0)).b;

    float noise = (random(p + uTime) - 0.5) * 0.3 * uGlitch;

    gl_FragColor = vec4(r + noise, g + noise, b + noise, 1.0);
  }
`;

function SingletonMesh({
  projects,
  activeIndex,
  itemRefs,
}: {
  projects: { src: string }[];
  activeIndex: number | null;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const glitchRef = useRef(0);

  // Preload ALL textures simultaneously
  const textures = useTexture(projects.map((p) => p.src));

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    if (activeIndex !== null) {
      glitchRef.current = 1.0;
    }
  }, [activeIndex]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textures[0] },
      uTime: { value: 0 },
      uGlitch: { value: 0 },
      uPlaneSize: { value: new THREE.Vector2(1, 1) },
      uImageSize: { value: new THREE.Vector2(1, 1) },
    }),
    [textures],
  );

  const { size, viewport } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    if (activeIndex === null) {
      meshRef.current.visible = false;
      return;
    }

    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    const activeTexture = textures[activeIndex];
    materialRef.current.uniforms.uTexture.value = activeTexture;

    // THE TS FIX: Explicitly cast the image to an HTMLImageElement
    if (activeTexture.image) {
      const img = activeTexture.image as HTMLImageElement;
      materialRef.current.uniforms.uImageSize.value.set(img.width, img.height);
    }

    materialRef.current.uniforms.uTime.value += delta;
    glitchRef.current -= delta * 3.5;
    if (glitchRef.current < 0) glitchRef.current = 0;
    materialRef.current.uniforms.uGlitch.value = glitchRef.current;

    const rect = activeEl.getBoundingClientRect();

    materialRef.current.uniforms.uPlaneSize.value.set(rect.width, rect.height);

    const width = (rect.width / size.width) * viewport.width;
    const height = (rect.height / size.height) * viewport.height;
    const x =
      (rect.left / size.width) * viewport.width -
      viewport.width / 2 +
      width / 2;
    const y =
      -(rect.top / size.height) * viewport.height +
      viewport.height / 2 -
      height / 2;

    meshRef.current.scale.set(width, height, 1);
    meshRef.current.position.set(x, y, 0);
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function SingletonGlitch({
  projects,
  activeIndex,
  itemRefs,
}: {
  projects: { src: string }[];
  activeIndex: number | null;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <tunnel.In>
      <Suspense fallback={null}>
        <SingletonMesh
          projects={projects}
          activeIndex={activeIndex}
          itemRefs={itemRefs}
        />
      </Suspense>
    </tunnel.In>
  );
}
