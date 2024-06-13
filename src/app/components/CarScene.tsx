"use client";

import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

const Car = ({ animOn }: { animOn: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, materials, animations } = useGLTF('./model/test.glb') as any;
  const { actions } = useAnimations(animations, group);
  const [isPlayingBackward, setIsPlayingBackward] = useState(false);

  // Floating effect
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  useEffect(() => {
    if (actions["HeadlightsAction"]) {
      const action = actions["HeadlightsAction"];

      if (animOn) {
        // Play the animation forward
        setIsPlayingBackward(false);
        action.reset().setLoop(THREE.LoopOnce, 1).play();
        action.timeScale = 4;
        action.clampWhenFinished = true;
      } else {
        // If animation is complete and animOn is false, play the animation backward
        if (!action.isRunning() && !isPlayingBackward) {
          setIsPlayingBackward(true);
          action.paused = false;
          action.setLoop(THREE.LoopOnce, 1).play();
          action.timeScale = -4;
          action.clampWhenFinished = true;
        }
      }
    }
  }, [actions, animOn]);

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]} rotation={[0, 2.2, 0]} scale={[1.3, 1.3, 1.3]}>
      <primitive object={scene} />
      {/* Add lights */}
      {/* <pointLight position={[0, 2, 5]} intensity={0.5} /> */}
    </group>
  );
};

const CarScene = ({ animOn }: { animOn: boolean }) => {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      {/* <ambientLight intensity={0.5} /> */}
      <Environment preset="sunset" />
      <Car animOn={animOn} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default CarScene;
