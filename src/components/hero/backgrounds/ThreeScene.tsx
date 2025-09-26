'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneProps {
  heroStage: number;
}

// Компонент сферы с wireframe
function WireframeSphere({ heroStage }: { heroStage: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Медленное вращение
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;

      // Анимация для H3 - только вращение, без масштабирования
      if (heroStage === 3) {
        meshRef.current.rotation.y += 0.01;
        // Убираем масштабирование, чтобы избежать конфликта с Framer Motion
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 32, 32]}>
      <meshBasicMaterial
        color="#8B5CF6"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

// Компонент частиц
function ParticleField({ heroStage }: { heroStage: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Позиции частиц в сферическом пространстве
        const radius = Math.random() * 4 + 1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Цвета частиц
        const color = new THREE.Color();
        color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x += 0.001;

      // Анимация для H3 - только вращение, без масштабирования
      if (heroStage === 3) {
        pointsRef.current.rotation.y += 0.005;
        // Убираем масштабирование частиц для Stage 3
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}



// Основной компонент сцены
function Scene({ heroStage }: { heroStage: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3B82F6" />
      
      <WireframeSphere heroStage={heroStage} />
      <ParticleField heroStage={heroStage} />
    </>
  );
}

export default function ThreeScene({ heroStage }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene heroStage={heroStage} />
    </Canvas>
  );
}