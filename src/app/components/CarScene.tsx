"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls, SpotLight, useAnimations, useDepthBuffer, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Micro_5 } from "next/font/google";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from 'three';
import gsap from 'gsap';
import { applyProps } from "@react-three/fiber";
import { Meeting } from "../types";
import Meetings from "./Meetings";

const Car = ({ lightsOn, wheelsOn }: { lightsOn: boolean, wheelsOn: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, materials, animations } = useGLTF('./model/test.glb') as any;
  const { actions } = useAnimations(animations, group);
  const [isPlayingBackward, setIsPlayingBackward] = useState(false);

  const [headlightsOn, setHeadlightsOn] = useState(false);
  const headlight1 = useRef<THREE.SpotLight>(null);
  const headlight2 = useRef<THREE.SpotLight>(null);



  // Floating effect
  // useFrame((state) => {
  //   if (group.current) {
  //     group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
  //   }
  // });


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
        setHeadlightsOn(true);
      } else {
        // If animation is complete and lightsOn is false, play the animation backward
        if (!action.isRunning() && !isPlayingBackward) {
          setIsPlayingBackward(true);
          action.paused = false;
          action.setLoop(THREE.LoopOnce, 1).play();
          action.timeScale = -4;
          action.clampWhenFinished = true;
          setHeadlightsOn(false);
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
      const newPosition = lightsOn ? [2, -1.5, -3] : [0.5, -1.5, -1]; // Change to desired positions
      const newRotation = lightsOn ? [0, Math.PI * 1.1, 0] : [0, 2.2, 0]; // Change to desired rotations
      const newScale = lightsOn ? [1.5, 1.5, 1.5] : [1.8, 1.8, 1.8]; // Change to desired scales

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
  }, [lightsOn]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // useFrame(() => {
  //   if (headlight1.current && headlight2.current) {
  //     // Set spotlight positions to match the car's front lights
  //     headlight1.current.position.copy(/* position of your first car front light */);
  //     headlight2.current.position.copy(/* position of your second car front light */);

  //     // Set spotlight targets to point towards the background or another direction
  //     headlight1.current.target.position.set(/* position where you want it to point */);
  //     headlight2.current.target.position.set(/* position where you want it to point */);
  //   }
  // });

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]} rotation={[0, 2.2, 0]} scale={[1.3, 1.3, 1.3]}>
      <primitive object={scene} />
      {/* Add lights */}
      {/* <pointLight position={[0, 2, 5]} intensity={0.5} /> */}
      {/* {headlightsOn && (
      <>
        <SpotLight
          position={[1, 0.5, 2.5]}  // Adjust position as needed
          angle={Math.PI / 4}
          penumbra={0.5}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <SpotLight
          position={[-1, 0.5, 1.5]}  // Adjust position as needed
          angle={Math.PI / 4}
          penumbra={0.5}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </>
    )} */}
    </group>
  );
};


const CarScene = ({ lightsOn, wheelsOn, meetings }: { lightsOn: boolean, wheelsOn: boolean, meetings: Meeting[] }) => {
  // const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <Canvas camera={{ position: [0, 2, 5] }} shadows>
      <color attach="background" args={['#2A221E']} />
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[10, 10, 5]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}

      <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={1} far={10} />
      <Car lightsOn={lightsOn} wheelsOn={wheelsOn} />
      {/* <Environment>
        <Lightformer
          form="circle"
          intensity={1}
          color="white"
          // scale={[10,5]}
          target={[5, 0, 0]}
        />
      </Environment> */}
      {/* <SpotLight
      // depthBuffer={depthBuffer}
        position={[0, 0, 2]}
        distance={1}
        angle={0.15}
        attenuation={5}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
      /> */}

      {meetings.map((meeting) => (
        <Meetings key={meeting.id} meeting={meeting} />
      ))}

    </Canvas>
  );
};

export default CarScene;
