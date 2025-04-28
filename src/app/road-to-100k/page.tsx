"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import CountUp from "react-countup";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [subs, setSubs] = useState<number | undefined>(undefined);
  const [emojiCounts, setEmojiCounts] = useState<{ [emoji: string]: number }>({});
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number, emoji: string, x: number, size: number, rotate: number, duration: number }[]>([]);
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  const emojiOptions = ["🎯", "🚀", "❤️", "🎈", "🛡️"];

  useEffect(() => {
    preloadEmojiCounts();
    fetchSubscribers();

    const subscriberInterval = setInterval(fetchSubscribers, 300000);

    const channel = supabase
      .channel('cheer-realtime', { config: { broadcast: { self: true } } })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cheers' }, (payload) => {
        const newEmoji = payload.new.emoji;

        setEmojiCounts(prev => ({
          ...prev,
          [newEmoji]: (prev[newEmoji] || 0) + 1
        }));

        if (["🎯", "🚀"].includes(newEmoji)) {
          setTeamA(prev => prev + 1);
        } else {
          setTeamB(prev => prev + 1);
        }

        setFloatingEmojis(prev => [
          ...prev,
          createFloatingEmoji(newEmoji)
        ]);
      })
      .subscribe();

    return () => {
      clearInterval(subscriberInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribers`);
      const data = await res.json();
      setSubs(Number(data.subscribers));
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    }
  };

  const preloadEmojiCounts = async () => {
    const { data, error } = await supabase.from('cheers').select('emoji');
    if (error) {
      console.error('Failed to preload cheers:', error);
      return;
    }
    if (data) {
      const counts: { [emoji: string]: number } = {};
      data.forEach((row) => {
        counts[row.emoji] = (counts[row.emoji] || 0) + 1;
      });
      setEmojiCounts(counts);

      let teamAScore = 0;
      let teamBScore = 0;
      Object.entries(counts).forEach(([emoji, count]) => {
        if (["🎯", "🚀"].includes(emoji)) {
          teamAScore += count;
        } else {
          teamBScore += count;
        }
      });
      setTeamA(teamAScore);
      setTeamB(teamBScore);
    }
  };

  const createFloatingEmoji = (emoji: string) => ({
    id: Date.now() + Math.random(),
    emoji,
    x: Math.random() * 90,
    size: Math.random() * 0.5 + 1,
    rotate: Math.random() * 360,
    duration: Math.random() * 1 + 2
  });

  const handleEmojiClick = async (emoji: string) => {
    await fetch('/api/cheers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji })
    });
  };

  const total = teamA + teamB;
  const teamAPercent = total > 0 ? (teamA / total) * 100 : 50;
  const teamBPercent = 100 - teamAPercent;

  const percentage = subs ? (subs / 100000) * 100 : 0;
  const remaining = subs !== undefined ? Math.max(100000 - subs, 0) : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-700 to-black px-4 py-10 overflow-hidden">

      {/* Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {floatingEmojis.map(e => (
          <div
            key={e.id}
            className="absolute animate-float-up"
            style={{
              left: `${e.x}%`,
              bottom: '-10%',
              transform: `scale(${e.size}) rotate(${e.rotate}deg)`,
              animationDuration: `${e.duration}s`,
              fontSize: "2rem"
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-12 z-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl leading-tight animate-text-glow">
          🛤️ Road to 100k Subscribers
        </h1>
        <p className="text-lg md:text-2xl text-yellow-200 mt-6 italic drop-shadow-sm font-light">
          ชาวชูโล่ร่วมสร้างตำนาน สานฝันชี้ดาบสู่ยูทูปเบอร์ 100,000 ซับ
        </p>
      </div>

      {/* Subscriber Counter */}
      <div className="flex flex-col items-center">

        {/* Counter Card */}
        <div className="bg-yellow-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <p className="text-2xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-wide animate-pulse-slow text-center">
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
              className="h-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 animate-gradient-x rounded-full transition-all duration-700 ease-out"
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

        {/* Cheer Battle Section */}
        <div className="mt-12 bg-yellow-800/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm">

          <h2 className="text-xl md:text-2xl font-bold text-yellow-200 text-center mb-4 animate-pulse-slow">
            🎮 Cheer Battle Zone
          </h2>

          {/* Battle Bar */}
          <div className="flex w-full mt-2 h-6 rounded-full overflow-hidden bg-gray-700 relative">
            <div className="bg-yellow-400" style={{ width: `${teamAPercent}%` }}></div>
            <div className="bg-pink-400" style={{ width: `${teamBPercent}%` }}></div>
          </div>

          {/* Team Scores */}
          <div className="flex justify-between w-full text-sm text-white mt-2">
            <span>🎯🚀 {teamA} คะแนน</span>
            <span>❤️🎈🛡️ {teamB} คะแนน</span>
          </div>

          {/* Mini Cheer Zone */}
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {emojiOptions.map((emoji) => (
              <div key={emoji} className="flex flex-col items-center">
                <button
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-3xl hover:scale-125 transition-transform text-yellow-100"
                >
                  {emoji}
                </button>
                <span className="text-xs mt-1 text-yellow-100">{emojiCounts[emoji] || 0}</span>
              </div>
            ))}
          </div>

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

      {/* Footer */}
      <div className="mt-12 mb-4 text-center w-full z-20">
        <p className="text-[10px] md:text-xs text-white/10 italic">
          Copyright © 2025 นักเรียนชูโล่วิทยาคม. All rights reserved.
        </p>
      </div>

    </div>
  );
}
