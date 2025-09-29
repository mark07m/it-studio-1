'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cone } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneProps {
  processStage: number;
}

// Компонент пирамиды с wireframe
function WireframePyramid({ processStage }: { processStage: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Медленное вращение
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;

      // Анимация для разных этапов Process
      if (processStage === 1) {
        // Deep Dive - поиск/сканирование
        meshRef.current.rotation.y += 0.01;
      } else if (processStage === 2) {
        // Product Vision - цель/фокус
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.x += 0.005;
      } else if (processStage === 3) {
        // System Design - архитектура/схема
        meshRef.current.rotation.y += 0.003;
        meshRef.current.rotation.z += 0.002;
      } else if (processStage === 4) {
        // Code & Ship - энергия/скорость
        meshRef.current.rotation.y += 0.015;
        meshRef.current.rotation.x += 0.01;
      } else if (processStage === 5) {
        // Scale & Grow - рост/масштаб
        meshRef.current.rotation.y += 0.007;
        meshRef.current.rotation.x += 0.003;
        meshRef.current.rotation.z += 0.001;
      }
    }
  });

  return (
    <Cone ref={meshRef} args={[2, 3, 4]}>
      <meshBasicMaterial
        color="#00D4AA"
        wireframe
        transparent
        opacity={0.3}
      />
    </Cone>
  );
}

// Компонент частиц
function ParticleField({ processStage }: { processStage: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Позиции частиц в пирамидальном пространстве
        const x = (Math.random() - 0.5) * 8;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Цвета частиц - голубовато-зеленые тона для Process
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.2, 0.8, 0.6);
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

      // Анимация частиц для разных этапов
      if (processStage === 4) {
        // Code & Ship - быстрая анимация
        pointsRef.current.rotation.y += 0.005;
        pointsRef.current.rotation.x += 0.003;
      } else if (processStage === 5) {
        // Scale & Grow - медленная, но масштабная анимация
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x += 0.0005;
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
function Scene({ processStage }: { processStage: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00D4AA" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00B4D8" />
      
      <WireframePyramid processStage={processStage} />
      <ParticleField processStage={processStage} />
    </>
  );
}

export default function ThreeScene({ processStage }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene processStage={processStage} />
    </Canvas>
  );
}
