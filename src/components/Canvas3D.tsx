"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";

function CameraLens() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Simple Abstract Lens Representation */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.2, 16, 100]} />
          <meshStandardMaterial color="#c89228" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <cylinderGeometry args={[1.4, 1.4, 0.3, 32]} />
          <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <circleGeometry args={[1.3, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.1} 
            roughness={0.1} 
            transmission={0.9} 
            ior={1.5} 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Canvas3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-0.4, 0.2]}>
          <CameraLens />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
