"use client";
import { ThemeButton } from "@/theme/theme-button";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const Animation = useMemo(() => {
    return ParticleExplosion;
  }, [window]);
  return (
    <div>
      <section className="@container flex flex-row @3xs:justify-center @3xs:items-center">
        <div className="relative w-full h-screen">
          <Animation />
        </div>
        {/* <div className="bg-gradient-to-b from-[#049EA460] to-[#8FBC8F15] w-4xl h-screen @max-[1800px]:w-full flex items-center justify-center shadow-cyan-100"> */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#049EA460] to-[#8FBC8F15] flex items-center justify-center shadow-cyan-100">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-row justify-between items-center gap-2 mb-1 w-full">
              <Link href={"/"} className="flex items-center">
                <ArrowLeft />
              </Link>
              <h3 className="text-4xl text-[#00000070] dark:text-white text-shadow-3xs pr-38 sm:46 md:pr-52 lg:52 2xl:pr-62">
                sisar
              </h3>
            </div>
            {children}
            <ThemeButton />
          </div>
        </div>
      </section>
    </div>
  );
}

const ParticleExplosion = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const mode = useMemo(() => {
    return theme === "dark" ? "dark" : "light";
  }, [theme]);

  useEffect(() => {
    // Cena, câmera, renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(mode == "dark" ? 0x000000 : 0xffffff, 1); // Fundo transparente
    mountRef?.current?.appendChild(renderer.domElement);

    // Responsividade - ajuste de partículas baseado no tamanho da tela
    const getParticleCount = () => {
      if (window.innerWidth <= 480) return 5000; // Mobile
      if (window.innerWidth <= 768) return 9000; // Tablet
      return 15500; // Desktop
    };

    const particleCount = getParticleCount();
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      positions[i * 3 + 3] = 0;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.1 + 0.02;
      const elevation = Math.random() * Math.PI;

      velocities[i * 3] = Math.cos(angle) * Math.sin(elevation) * speed;
      velocities[i * 3 + 1] = Math.cos(elevation) * speed;
      velocities[i * 3 + 2] = Math.sin(angle) * Math.sin(elevation) * speed;
      velocities[i * 3 + 3] = Math.sin(angle) * Math.sin(elevation) * speed;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 4));

    const colorChange = (mode: string): THREE.ColorRepresentation =>
      mode === "dark" ? 0xffffff : 0x000000;

    const material = new THREE.PointsMaterial({
      color: colorChange(mode),
      size: 0.004,
      transparent: false,
      opacity: 1,
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    let time = 0;
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posArray = particleSystem.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];
        posArray[i * 3 + 3] += velocities[i * 3 + 3];

        velocities[i * 3] *= 0.98;
        velocities[i * 3 + 1] *= 0.98;
        velocities[i * 3 + 2] *= 0.98;
        velocities[i * 3 + 3] *= 0.98;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Ajustar a órbita da câmera baseada no tamanho da tela
      const orbitRadius = window.innerWidth <= 768 ? 2.5 : 4.0;
      camera.position.x = Math.sin(time) * orbitRadius;
      camera.position.z = Math.cos(time) * (orbitRadius * 0.75);
      camera.lookAt(0, 0, 0);
      time += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mode]);

  return <div ref={mountRef} className="w-full h-full" />;
};
