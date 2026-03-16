"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import {
  Float,
  Html,
  ContactShadows,
  Environment,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "@/utils/math";

// --- 1. COLOR LERPING UTILITIES ---
const lerpColor = (color1: number[], color2: number[], t: number) => {
  return color1.map((c, i) => Math.round(lerp(c, color2[i], t)));
};

const COLOR_DEFAULT = [24, 24, 27]; // zinc-900
const COLOR_HOVER = [161, 161, 170]; // zinc-400

function AnimatedLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isHovered = useRef(false);
  const progress = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      const target = isHovered.current ? 1 : 0;
      progress.current = lerp(progress.current, target, 0.1);

      if (linkRef.current) {
        // Lerp Color
        const currentColor = lerpColor(
          COLOR_DEFAULT,
          COLOR_HOVER,
          progress.current,
        );
        linkRef.current.style.color = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;

        // Lerp X-Transform (slide right slightly on hover)
        const currentX = lerp(0, 8, progress.current);
        linkRef.current.style.transform = `translateX(${currentX}px)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      className="block w-max transition-none" // Disable CSS transitions so JS can handle it
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {children}
    </a>
  );
}

// --- 2. GLSL WAVE SHADER MATERIAL ---
const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#f4f4f5"), // zinc-100
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 newPos = position;
      
      float waveStrength = 0.3;
      float edgeTaper = pow(sin(vUv.y * 3.14159), 2.0); 
      float wave = sin(vUv.x * 2.0 + uTime * 2.0) * waveStrength * edgeTaper;
      float curl = pow(vUv.x - 0.5, 2.0) * -0.15;

      newPos.z += wave + curl;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      vNormal = normalize(normalMatrix * normal);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec3 uColor;

    void main() {
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(vNormal, lightDir), 0.3); 
      gl_FragColor = vec4(uColor * diffuse, 1.0);
    }
  `,
);

extend({ WaveMaterial });
declare global {
  namespace ReactThreeFiber {
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof WaveMaterial
      >;
    }
  }
}

// --- 3. 3D SCENE COMPONENT ---
function PaperMenu({ onClose }: { onClose: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group scale={[0.8, 0.8, 0.8]}>
        <mesh ref={meshRef}>
          <planeGeometry args={[4, 5.5, 32, 32]} />
          <waveMaterial ref={materialRef} transparent={true} />

          <Html
            position={[0, 0, 0.05]}
            className="w-[320px] h-[440px] flex flex-col justify-between p-10 pointer-events-auto select-none"
            center
          >
            <div className="flex justify-between items-center w-full border-b border-zinc-300 pb-4">
              <span className="text-sm font-bold tracking-widest uppercase text-zinc-900">
                Menu
              </span>
              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                [ Close ]
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-4xl font-bold tracking-tighter mt-8">
              <AnimatedLink href="#work">Work.</AnimatedLink>
              <AnimatedLink href="#about">About.</AnimatedLink>
              <AnimatedLink href="#initiatives">Initiatives.</AnimatedLink>
              <AnimatedLink href="#contact">Contact.</AnimatedLink>
            </nav>

            <div className="mt-auto pt-8 text-xs text-zinc-400 font-medium">
              © 2026 / PORTFOLIO
            </div>
          </Html>
        </mesh>
      </group>
    </Float>
  );
}

// --- 4. MAIN EXPORT ---
export default function FloatingPaperNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center backdrop-blur-sm bg-black/20 transition-all duration-500">
      <div className="w-full h-full md:w-[600px] md:h-[800px] pointer-events-auto">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.25}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <PaperMenu onClose={() => setIsOpen(false)} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.3}
            scale={15}
            blur={3}
            far={4}
          />
        </Canvas>
      </div>
    </div>
  );
}
