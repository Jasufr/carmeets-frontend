'use client'

import React, { useEffect, useState } from 'react';
import CarScene from './CarScene';
import { Meeting } from "../types";
import Menu from './Menu';

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
      <div className='absolute z-50 m-5'>
      <button onClick={() => setLightsOn(!lightsOn)} className="bg-red-500 p-2 me-5">Lights</button>
      <button onClick={() => setWheelsOn(!wheelsOn)} className="bg-blue-500 p-2">Wheels</button>
      </div>
      <CarScene lightsOn={lightsOn} wheelsOn={wheelsOn} meetings={meetings} />
      <Menu />
    </>
  );
}

export default Interface;
