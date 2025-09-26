'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneProps {
  portfolioStage: number;
}

// Компонент звезды с wireframe
function WireframeStar({ portfolioStage }: { portfolioStage: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Медленное вращение
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.z += 0.002;

      // Анимация для P4 - более активное вращение
      if (portfolioStage === 4) {
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.x += 0.004;
      }
    }
  });

  // Создаем геометрию звезды
  const starGeometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  // Параметры звезды
  const outerRadius = 2;
  const innerRadius = 0.8;
  const points = 5; // 5-конечная звезда

  // Создаем вершины звезды
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = 0;
    vertices.push(x, y, z);
  }

  // Создаем индексы для треугольников
  for (let i = 0; i < points * 2; i++) {
    const next = (i + 1) % (points * 2);
    const center = points * 2; // Центральная точка
    vertices.push(0, 0, 0); // Центральная точка
    indices.push(i, next, center);
  }

  starGeometry.setIndex(indices);
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return (
    <mesh ref={meshRef} geometry={starGeometry}>
      <meshBasicMaterial
        color="#8B5CF6"
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Компонент частиц в форме звезды
function StarParticleField({ portfolioStage }: { portfolioStage: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Позиции частиц в форме звезды
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 6 + 1;
        const height = (Math.random() - 0.5) * 4;

        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = Math.sin(angle) * radius;
        positions[i * 3 + 2] = height;

        // Цвета частиц - фиолетово-синие тона
        const color = new THREE.Color();
        const hue = 0.7 + Math.random() * 0.3; // От фиолетового до синего
        color.setHSL(hue, 0.8, 0.6);
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
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
      pointsRef.current.rotation.z += 0.0008;

      // Анимация для P4 - более активное движение частиц
      if (portfolioStage === 4) {
        pointsRef.current.rotation.y += 0.003;
        pointsRef.current.rotation.x += 0.002;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Основной компонент сцены
function Scene({ portfolioStage }: { portfolioStage: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#3B82F6" />
      <pointLight position={[0, 10, -10]} intensity={0.3} color="#A855F7" />
      
      <WireframeStar portfolioStage={portfolioStage} />
      <StarParticleField portfolioStage={portfolioStage} />
    </>
  );
}

export default function ThreeScene({ portfolioStage }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene portfolioStage={portfolioStage} />
    </Canvas>
  );
}
