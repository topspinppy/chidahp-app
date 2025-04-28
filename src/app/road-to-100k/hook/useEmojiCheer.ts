"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STORAGE_KEY = "cheer-buffer-v1";
const EMOJIS = ["🎯", "🚀", "❤️", "🎈", "🛡️"];

export default function useEmojiCheer() {
  const [localCounts, setLocalCounts] = useState<Record<string, number>>(() => Object.fromEntries(EMOJIS.map(e => [e, 0])));
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number, emoji: string, x: number, size: number, rotate: number, duration: number }[]>([]);
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);
  const bufferRef = useRef<string[]>([]);
  const sendTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 🚀 ส่ง Buffer ไปยัง API
  const sendBuffer = async () => {
    if (bufferRef.current.length === 0) return;
    const toSend = [...bufferRef.current];
    bufferRef.current = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    try {
      const res = await fetch('/api/cheers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emojis: toSend }),
      });
      if (!res.ok) throw new Error('Server Error');
    } catch (e) {
      console.error('Send failed, retry next round', e);
      bufferRef.current = [...toSend, ...bufferRef.current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bufferRef.current));
    }
  };

  // 🎈 เมื่อ user click emoji
  const handleEmojiClick = (emoji: string) => {
    setLocalCounts(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));

    setFloatingEmojis(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        emoji,
        x: Math.random() * 90,
        size: Math.random() * 0.5 + 1,
        rotate: Math.random() * 360,
        duration: Math.random() * 1 + 2
      }
    ]);

    bufferRef.current = [...bufferRef.current, emoji];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bufferRef.current));

    if (bufferRef.current.length >= 10) {
      sendBuffer();
    }

    if (!sendTimerRef.current) {
      sendTimerRef.current = setInterval(sendBuffer, 30000);
    }
  };

  // 🛡️ Preload Counts (ดึง + บวก buffer)
  const preloadCounts = async () => {
    const { data, error } = await supabase
      .from('cheer_counts')
      .select('emoji, count');

    if (data && !error) {
      const counts: Record<string, number> = Object.fromEntries(EMOJIS.map(e => [e, 0]));
      let scoreA = 0;
      let scoreB = 0;

      data.forEach(row => {
        counts[row.emoji] = row.count;
      });

      // 🔥 รวม Buffer ที่ยังไม่ยิงด้วย เพื่อ smooth
      bufferRef.current.forEach(emoji => {
        counts[emoji] = (counts[emoji] || 0) + 1;
      });

      EMOJIS.forEach(emoji => {
        if (["🎯", "🚀"].includes(emoji)) {
          scoreA += counts[emoji];
        } else {
          scoreB += counts[emoji];
        }
      });

      setLocalCounts(counts);
      setTeamA(scoreA);
      setTeamB(scoreB);
    }
  };

  // 🔥 Initial Setup
  useEffect(() => {
    // โหลด buffer ตอนแรก
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          bufferRef.current = parsed;
        }
      } catch {}
    }

    preloadCounts();

    const channel = supabase
      .channel('cheer-realtime', { config: { broadcast: { self: true } } })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cheers' }, () => {
        preloadCounts(); // ✨ preload ใหม่ทันที เมื่อมี Insert
      })
      .subscribe();

    const handleUnload = () => {
      if (bufferRef.current.length > 0) {
        navigator.sendBeacon('/api/cheers', JSON.stringify({ emojis: bufferRef.current }));
      }
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      if (sendTimerRef.current) clearInterval(sendTimerRef.current);
      supabase.removeChannel(channel);
    };
  }, []);

  return { floatingEmojis, localCounts, teamA, teamB, handleEmojiClick };
}
