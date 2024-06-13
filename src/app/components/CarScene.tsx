"use client";

import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

const Car = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, materials, animations } = useGLTF('./model/test.glb') as any;
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
      {/* Add lights */}
      {/* <pointLight position={[0, 2, 5]} intensity={0.5} /> */}
    </group>
  );
};

const CarScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      {/* <ambientLight intensity={0.5} /> */}
      <Environment preset="sunset" />
      <Car />
      <OrbitControls />
    </Canvas>
  )
};

export default CarScene;
