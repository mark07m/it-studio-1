'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeSceneProps {
  capabilityStage: number;
}

// Компонент куба с wireframe
function WireframeBox({ capabilityStage }: { capabilityStage: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Медленное вращение
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <Box ref={meshRef} args={[2.5, 2.5, 2.5]}>
      <meshBasicMaterial
        color="#00D4AA"
        wireframe
        transparent
        opacity={0.3}
      />
    </Box>
  );
}

// Компонент частиц
function ParticleField({ capabilityStage }: { capabilityStage: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Позиции частиц в кубическом пространстве
        const x = (Math.random() - 0.5) * 8;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 8;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Цвета частиц - зеленовато-голубые тона
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
function Scene({ capabilityStage }: { capabilityStage: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00D4AA" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00B4D8" />
      
      <WireframeBox capabilityStage={capabilityStage} />
      <ParticleField capabilityStage={capabilityStage} />
    </>
  );
}

export default function ThreeScene({ capabilityStage }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene capabilityStage={capabilityStage} />
    </Canvas>
  );
}
