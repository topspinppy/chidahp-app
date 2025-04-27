"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
// import CheerWall from './components/CheerWall'; // ยังไม่ใช้ในรอบนี้

export default function Home() {
  const [subs, setSubs] = useState<number | undefined>(undefined);
  const [_, setCheers ] = useState<string[]>([]);
  const [newCheer, setNewCheer] = useState<string>("");
  const showCheerWall = false; // 🔥 toggle ได้ว่าเปิด-ปิด CheerWall

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribers`);
        const data = await res.json();
        setSubs(Number(data.subscribers));
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      }
    };

    fetchSubscribers();
    const interval = setInterval(fetchSubscribers, 300000);
    return () => clearInterval(interval);
  }, []);

  const percentage = subs ? (subs / 100000) * 100 : 0;
  const remaining = subs !== undefined ? Math.max(100000 - subs, 0) : undefined;

  const handleCheerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCheer.trim()) {
      setCheers(prev => [newCheer.trim(), ...prev]);
      setNewCheer("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-700 to-black px-4 py-10">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl leading-tight animate-text-glow">
          🛤️ Road to 100k Subscribers
        </h1>
        <p className="text-lg md:text-2xl text-yellow-200 mt-6 italic drop-shadow-sm font-light">
          ชาวชูโล่ร่วมสร้างตำนาน สานฝันชี้ดาบสู่ยูทูปเบอร์ 100,000 ซับ
        </p>
      </div>

      {/* Grid Layout */}
      <div className={`grid gap-8 w-full max-w-6xl ${showCheerWall ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 place-items-center'}`}>

        {/* ซ้าย: Counter */}
        <div className="flex flex-col items-center">

          {/* Subscriber Counter Card */}
          <div className="bg-yellow-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-fade-zoom-in w-full max-w-sm">
            <p className="text-2xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-wide animate-pulse-slow text-center leading-snug">
              {subs === undefined ? 'Loading...' : (
                <CountUp end={subs} duration={2.5} separator="," />
              )}
            </p>
            <p className="text-base md:text-2xl font-light text-white flex justify-center">Subscribers</p>
          </div>

          {/* Remaining Counter */}
          {remaining !== undefined && (
            <div className="mt-6 text-center animate-flash-urgent">
              <p className={`text-2xl md:text-4xl font-bold ${remaining <= 1000 ? 'text-red-400' : 'text-yellow-200'}`}>
                🚀 เหลืออีก <CountUp end={remaining} duration={2} separator="," /> คน ถึง 100,000!
              </p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="relative w-full max-w-sm mt-10">
            <div className="bg-gray-300 rounded-full h-8 shadow-inner overflow-hidden">
              <div
                className="h-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-[length:200%_200%] animate-gradient-x rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            {subs !== undefined && (
              <div
                className="absolute transition-all duration-700 ease-out"
                style={{
                  top: '50%',
                  transform: 'translate(-40%, -50%)',
                  left: `calc(${percentage}% )`,
                }}
              >
                <Image
                  src="/logo/chidahp-logo.png"
                  alt="Chidahp Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 animate-drift-right drop-shadow-md"
                />
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href={`https://www.youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 animate-pulse"
            >
              🎯 Subscribe Now!
            </a>
          </div>

        </div>

        {/* ขวา: Cheer Wall */}
        {showCheerWall && (
          <div className="flex justify-center">
            {/* <CheerWall /> */}
            {/* ยังไม่ได้เปิด */}
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="mt-12 mb-4 text-center w-full">
        <p className="text-[10px] md:text-xs text-white/10 italic">
          Copyright © 2025 นักเรียนชูโล่วิทยาคม. All rights reserved.
        </p>
      </div>

    </div>
  );
}
