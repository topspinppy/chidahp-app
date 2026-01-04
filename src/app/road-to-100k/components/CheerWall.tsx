"use client";

import { useEffect, useState } from 'react';

export default function CheerWall() {
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [counts, setCounts] = useState<{ [emoji: string]: number }>({});
  const [combo, setCombo] = useState<{ emoji: string; count: number; lastClick: number } | null>(null);
  const [burst, setBurst] = useState(false);

  const emojiOptions = ['🎯', '🚀', '❤️', '🎈', '🛡️'];

  const handleEmojiClick = (emoji: string) => {
    const now = Date.now();

    // เพิ่ม Emoji ที่จะลอย
    setEmojis(prev => [...prev, { id: Date.now(), emoji, x: Math.random() * 80 + 10 }]);

    // เพิ่ม Count
    setCounts(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));

    // ตรวจจับ Combo
    if (combo && combo.emoji === emoji && now - combo.lastClick < 2000) {
      const newComboCount = combo.count + 1;
      setCombo({ emoji, count: newComboCount, lastClick: now });

      // ถ้า Combo ถึง 5 ขึ้น Burst
      if (newComboCount === 5) {
        triggerBurst();
      }
    } else {
      setCombo({ emoji, count: 1, lastClick: now });
    }
  };

  const triggerBurst = () => {
    setBurst(true);

    // ปิด Burst หลัง 2 วิ
    setTimeout(() => {
      setBurst(false);
    }, 2000);
  };

  // ลบ Emoji ที่ลอยเสร็จ
  useEffect(() => {
    const timer = setInterval(() => {
      setEmojis(prev => prev.slice(1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-yellow-700/20 rounded-2xl mt-10 p-6 flex flex-col justify-between">

      {/* Heading Text */}
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-200 drop-shadow-md animate-pulse-slow">
          ✨ ให้กำลังใจชี้ดาบด้วยการกด Emoji ด้านล่าง ✨
        </h2>
      </div>

      {/* Floating Emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {emojis.map(e => (
          <div
            key={e.id}
            className="absolute text-4xl animate-float-up"
            style={{ left: `${e.x}%`, bottom: '0' }}
          >
            {e.emoji}
          </div>
        ))}

        {/* Combo Floating */}
        {combo && combo.count >= 2 && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl text-yellow-300 animate-bounce">
            {combo.emoji} x{combo.count} !!
          </div>
        )}

        {/* Burst Effect */}
        {burst && (
          <div className="absolute inset-0 flex flex-wrap justify-center items-center pointer-events-none">
            {Array(10).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="text-4xl animate-ping text-yellow-400"
                style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              >
                🎉
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emoji Buttons */}
      <div className="relative z-10 flex justify-center gap-4">
        {emojiOptions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            className="text-3xl hover:scale-125 transition-transform relative"
          >
            {emoji}
            <span className="text-xs block text-yellow-100">{counts[emoji] || 0}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
