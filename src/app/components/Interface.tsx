'use client'

import React, { useState } from 'react';
import CarScene from './CarScene';

const Interface = () => {

  const [lightsOn, setLightsOn] = useState(false);
  const [wheelsOn, setWheelsOn] = useState(false);
  return (
    <>
      <button onClick={() => setLightsOn(!lightsOn)} className="bg-red-500 z-50">Lights</button>
      <button onClick={() => setWheelsOn(!wheelsOn)} className="bg-blue-500 z-50">Wheels</button>
      <CarScene lightsOn={lightsOn} wheelsOn={wheelsOn} />

    </>
  );
}

export default Interface;
