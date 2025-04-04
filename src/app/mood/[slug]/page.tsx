'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MoodLoading from '../components/MoodLoading';

export default function MoodPage() {
  const { slug } = useParams() as { slug: string };
  const [mood, setMood] = useState<any>(null);
  const [book, setBook] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMood = async () => {
    setLoading(true);
    const res = await fetch('/api/moods', { cache: 'no-store' });
    const moods = await res.json();
    const moodData = moods.find((m: any) => m.mood === decodeURIComponent(slug));
    if (!moodData) return notFound();

    const random = moodData.books[Math.floor(Math.random() * moodData.books.length)];

    // ⏱️ Delay แบบ Cinematic
    setTimeout(() => {
      setMood(moodData);
      setBook(random);
      setLoading(false);
    }, 2000); // ปรับเลขได้ 1000 = 1 วิ
  };


  useEffect(() => {
    fetchMood();
  }, [slug]);
  

  const shareUrl = `https://app.chidahp.com/mood/${mood?.mood}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = async () => {
    const data = {
      title: `อารมณ์ "${mood.mood}"`,
      text: `เล่มนี้เหมาะกับฉันมาก! ลองดูเลย 👉`,
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (err) {
        console.log("แชร์ล้มเหลว", err);
      }
    } else {
      alert("เบราว์เซอร์ไม่รองรับการแชร์นี้");
    }
  };

  if (loading || !mood || !book) {
    return <MoodLoading />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${mood.gradient}`}>
      <AnimatePresence>
        <motion.div
          className="max-w-xl w-full text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Emoji mood */}
          <motion.div className="text-7xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
            {mood.emoji}
          </motion.div>

          <motion.h1 className="text-3xl md:text-5xl font-bold mt-4">{mood.mood}</motion.h1>
          <p className="mt-2 text-white text-opacity-80">อารมณ์นี้ เหมาะกับเล่มนี้สุดๆ</p>

          {/* การ์ดหนังสือ */}
          <motion.div
            key={book.title}
            className="bg-white text-black rounded-xl shadow-xl p-6 mt-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-64 object-cover rounded-lg shadow mb-4"
            />
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{book.description}</p>
            <p className="text-xs text-gray-400 mt-1">โดย {book.author}</p>
            <a
              href={book.link}
              target="_blank"
              className="inline-block mt-4 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full transition"
            >
              📚 อ่านเล่มนี้เลย
            </a>
          </motion.div>

          {/* ปุ่มสุ่มใหม่ */}
          <button
            onClick={fetchMood}
            className="mt-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-full text-sm transition"
          >
            🎲 สุ่มเล่มอื่นในอารมณ์นี้
          </button>

          {/* ปุ่มแชร์ */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCopy}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm text-blackhover:bg-opacity-30 transition"
            >
              🔗 คัดลอกลิงก์แชร์
            </button>
            <button
              onClick={handleNativeShare}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm text-blackhover:bg-opacity-30 transition"
            >
              📤 แชร์ให้เพื่อน (มือถือ)
            </button>
          </div>

          {/* Toast */}
          {copied && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✅ คัดลอกลิงก์แล้ว! ส่งให้เพื่อนได้เลย
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
