'use client'

import React, { useState } from 'react';
import CarScene from './CarScene';

const Interface = () => {

  const [animOn, setAnimOn] = useState(false);
  return (
    <>
      <button onClick={() => setAnimOn(!animOn)} className="bg-red-500 z-50">Hello</button>
      <CarScene animOn={animOn} />

    </>
  );
}

export default Interface;
