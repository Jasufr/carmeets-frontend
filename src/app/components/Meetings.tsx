import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Meeting } from "../types";
import { Html, Image, Text } from "@react-three/drei";

const Meetings = ({ meeting }: { meeting: Meeting }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh>
        <planeGeometry args={[3.3, 3]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
        <Text maxWidth={3}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.3}
        position={[-1.5, 1.4, 0.1]}>{meeting.name.toUpperCase()}</Text>
        {/* {meeting.picture && (<Image url={meeting.picture} alt={meeting.name} />)} */}
        <Text maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.2}
        position={[-1.5, -0.5, 0.1]}>{meeting.description}</Text>

      </mesh>
    </group>
  );
};

export default Meetings;
