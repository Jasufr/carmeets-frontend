
import Image from "next/image";
import { Meeting } from "./types";
// import CarScene from "./components/CarScene";
import dynamic from 'next/dynamic';
import { useState } from "react";
import Interface from "./components/Interface";

const CarScene = dynamic(() => import('./components/CarScene'), { ssr: false });

async function fetchMeetings(): Promise<Meeting[]> {
  const res = await fetch("http://localhost:3000/api/v1/meetings", { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch meetings");
  }
  return res.json();
}

const Home: React.FC = async () => {
  const meetings = await fetchMeetings();
  // const [animOn, setAnimOn] = useState(false);

  return (
    <>
      <div className="h-[100vh]">
        {/* <h1>Meetings</h1>
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <h2>{meeting.name}</h2>
              {meeting.picture && <Image src={meeting.picture} alt={meeting.name} width={150} height={150} />}
              <p>{meeting.address}</p>
            </li>
          ))}
        </ul> */}
        <Interface />
        {/* <button onClick={() => setAnimOn(!animOn)} className="bg-red-500 z-50">Hello</button> */}
        {/* <CarScene animOn={animOn} /> */}
      </div>
    </>
  )
}

export default Home;
