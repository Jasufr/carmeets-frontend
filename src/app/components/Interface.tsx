'use client'

import React, { useEffect, useState } from 'react';
import CarScene from './CarScene';
import { Meeting } from "../types";

const Interface = () => {

  const [lightsOn, setLightsOn] = useState(false);
  const [wheelsOn, setWheelsOn] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/meetings");
        if (!res.ok) {
          throw new Error("Failed to fetch meetings");
        }
        const data: Meeting[] = await res.json();
        setMeetings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <>
      <button onClick={() => setLightsOn(!lightsOn)} className="bg-red-500 z-50">Lights</button>
      <button onClick={() => setWheelsOn(!wheelsOn)} className="bg-blue-500 z-50">Wheels</button>
      <CarScene lightsOn={lightsOn} wheelsOn={wheelsOn} meetings={meetings} />

    </>
  );
}

export default Interface;
