import { useRef } from "react";
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
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
        <Text>{meeting.name}</Text>
        {/* {meeting.picture && (<Image url={meeting.picture}  />)} */}
      </mesh>
    </group>
  );
};

export default Meetings;
