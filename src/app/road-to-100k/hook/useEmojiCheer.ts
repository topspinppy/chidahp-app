/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STORAGE_KEY = "cheer-buffer-v1";
const EMOJIS = ["🎯", "🚀", "❤️", "🎈", "🛡️"];
const DEBOUNCE_DELAY = 100;

export default function useEmojiCheer() {
  const [localCounts, setLocalCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(EMOJIS.map(e => [e, 0]))
  );
  const [floatingEmojis, setFloatingEmojis] = useState<any[]>([]);
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  const bufferRef = useRef<string[]>([]);
  const pendingCountsRef = useRef<Record<string, number>>(Object.fromEntries(EMOJIS.map(e => [e, 0])));
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 🚀 ยิง Buffer ไป API
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

      // 🎯 ลบ pendingCounts หลังยิงสำเร็จ
      toSend.forEach(emoji => {
        pendingCountsRef.current[emoji] = Math.max((pendingCountsRef.current[emoji] || 0) - 1, 0);
      });

    } catch (e) {
      console.error('Send failed, retry next round', e);
      bufferRef.current = [...toSend, ...bufferRef.current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bufferRef.current));
    }
  };

  // 🎈 ตอน User Click
  const handleEmojiClick = (emoji: string) => {
    updateLocal(emoji);

    bufferRef.current = [...bufferRef.current, emoji];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bufferRef.current));

    pendingCountsRef.current[emoji] = (pendingCountsRef.current[emoji] || 0) + 1;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(sendBuffer, DEBOUNCE_DELAY);
  };

  // 🛡️ โหลด counts ตอนแรก
  const preloadCounts = async () => {
    const { data, error } = await supabase
      .from('cheer_counts_mv')
      .select('emoji, count');

    if (data && !error) {
      const counts: Record<string, number> = Object.fromEntries(EMOJIS.map(e => [e, 0]));
      let scoreA = 0;
      let scoreB = 0;

      data.forEach(row => {
        counts[row.emoji] = row.count;
      });

      EMOJIS.forEach(emoji => {
        if (["🎯", "🚀"].includes(emoji)) scoreA += counts[emoji];
        else scoreB += counts[emoji];
      });

      setLocalCounts(counts);
      setTeamA(scoreA);
      setTeamB(scoreB);
    }
  };

  // 🎯 Update Local Score & Floating Emoji
  const updateLocal = (emoji: string) => {
    setLocalCounts(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));

    if (["🎯", "🚀"].includes(emoji)) {
      setTeamA(prev => prev + 1);
    } else {
      setTeamB(prev => prev + 1);
    }

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
  };

  useEffect(() => {
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cheers' }, (payload) => {
        const emoji = payload.new?.emoji;
        if (!emoji) return;
        updateLocal(emoji);
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
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      supabase.removeChannel(channel);
    };
  }, []);

  // ✨ คำนวณคะแนนรวม (รวม pending)
  const getTotalCount = (emoji: string) => {
    return (localCounts[emoji] || 0) + (pendingCountsRef.current[emoji] || 0);
  };

  const totalTeamA = teamA + EMOJIS.filter(e => ["🎯", "🚀"].includes(e))
    .reduce((sum, e) => sum + (pendingCountsRef.current[e] || 0), 0);

  const totalTeamB = teamB + EMOJIS.filter(e => ["❤️", "🎈", "🛡️"].includes(e))
    .reduce((sum, e) => sum + (pendingCountsRef.current[e] || 0), 0);

  return { floatingEmojis, getTotalCount, totalTeamA, totalTeamB, handleEmojiClick };
}
