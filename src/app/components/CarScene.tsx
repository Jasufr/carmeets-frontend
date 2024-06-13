"use client";

import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Micro_5 } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import gsap from 'gsap';

const Car = ({ lightsOn, wheelsOn }: { lightsOn: boolean, wheelsOn: boolean }) => {
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
      // console.log(actions);


      if (lightsOn) {
        // Play the animation forward
        setIsPlayingBackward(false);
        action.reset().setLoop(THREE.LoopOnce, 1).play();
        action.timeScale = 4;
        action.clampWhenFinished = true;
      } else {
        // If animation is complete and lightsOn is false, play the animation backward
        if (!action.isRunning() && !isPlayingBackward) {
          setIsPlayingBackward(true);
          action.paused = false;
          action.setLoop(THREE.LoopOnce, 1).play();
          action.timeScale = -4;
          action.clampWhenFinished = true;
        }
      }
    }

    // if (actions["WheelBackLeftAction"] && actions["WheelBackRightAction"] && actions["WheelFrontLeftAction"] && actions["WheelFrontRightAction"]) {
    //   const wheelActions = [actions["WheelBackLeftAction"], actions["WheelBackRightAction"], actions["WheelFrontLeftAction"], actions["WheelFrontRightAction"]];

    //   if (wheelsOn) {
    //     wheelActions.forEach(action => action.play());
    //     wheelActions.forEach(action => action.timeScale = 10);
    //   } else {
    //     wheelActions.forEach(action => action.stop());
    //   }
    // }
  }, [actions, lightsOn]);

  useEffect(() => {
    if (actions["WheelBackLeftAction"] && actions["WheelBackRightAction"] && actions["WheelFrontLeftAction"] && actions["WheelFrontRightAction"]) {
      const wheelActions = [actions["WheelBackLeftAction"], actions["WheelBackRightAction"], actions["WheelFrontLeftAction"], actions["WheelFrontRightAction"]];

      if (wheelsOn) {
        wheelActions.forEach(action => action.play());
        wheelActions.forEach(action => action.timeScale = 10);
      } else {
        wheelActions.forEach(action => action.stop());
      }
    }
  }, [actions, wheelsOn]);

  // const position = [0, 0, 0];
  // const rotation = [0, 2,2, 0];
  // const scale = [1.3, 1.3, 1.3];

  // let position = new THREE.Vector3(0, 0, 0);
  // let rotation = new THREE.Euler(0, 2.2, 0); // Make sure the rotation is correctly defined
  // let scale = new THREE.Vector3(1.3, 1.3, 1.3);

  // useEffect(() => {
  //   if (lightsOn) {
  //     group.position.current = new THREE.Vector3(0, 5, 0);
  //   }
  // }, [lightsOn])

  useEffect(() => {
    if (group.current) {
      const newPosition = lightsOn ? [0, 1, 0] : [0, 0, 0]; // Change to desired positions
      const newRotation = lightsOn ? [0, Math.PI * 1.2, 0] : [0, 2.2, 0]; // Change to desired rotations
      const newScale = lightsOn ? [2, 2, 2] : [1.3, 1.3, 1.3]; // Change to desired scales

      // Smoothly change position
      gsap.to(group.current.position, {
        x: newPosition[0],
        y: newPosition[1],
        z: newPosition[2],
        duration: 1,
        ease: "power2.inOut"
      });

      // Smoothly change rotation
      gsap.to(group.current.rotation, {
        x: newRotation[0],
        y: newRotation[1],
        z: newRotation[2],
        duration: 1,
        ease: "power2.inOut"
      });

      // Smoothly change scale
      gsap.to(group.current.scale, {
        x: newScale[0],
        y: newScale[1],
        z: newScale[2],
        duration: 1,
        ease: "power2.inOut"
      });
    }
  },[lightsOn]);

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]} rotation={[0, 2.2, 0]} scale={[1.3, 1.3, 1.3]}>
      <primitive object={scene} />
      {/* Add lights */}
      {/* <pointLight position={[0, 2, 5]} intensity={0.5} /> */}
    </group>
  );
};

const CarScene = ({ lightsOn, wheelsOn }: { lightsOn: boolean, wheelsOn: boolean }) => {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      {/* <ambientLight intensity={0.5} /> */}
      <Environment preset="sunset" />
      <Car lightsOn={lightsOn} wheelsOn={wheelsOn} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default CarScene;
