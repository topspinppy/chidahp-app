"use client";

import React, { useState } from "react";
import ReactHowler from "react-howler";

interface AmbiencePlayerProps {
  src: string; // path to sound file
  volume?: number; // optional, default = 0.3
  showToggle?: boolean; // optional, default = true
}

const AmbiencePlayer: React.FC<AmbiencePlayerProps> = ({
  src,
  volume = 0.3,
  showToggle = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      {/* เสียง ambience */}
      <ReactHowler src={src} playing={isPlaying} loop={true} volume={volume} />

      {/* ปุ่มเปิด/ปิดเสียง */}
      {showToggle && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed bottom-6 right-6 z-50 bg-white text-black rounded-full px-4 py-2 shadow-lg text-sm hover:bg-gray-100 transition"
        >
          {isPlaying ? "🔊 ปิดเสียง" : "🔇 เปิดเสียง"}
        </button>
      )}
    </>
  );
};

export default AmbiencePlayer;
