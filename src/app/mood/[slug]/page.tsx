/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MoodLoading from '../components/MoodLoading';
import Image from 'next/image';

const MoodPage = () => {
  const [mood, setMood] = useState<any>(null);
  const [book, setBook] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntroQuote, setShowIntroQuote] = useState(true);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      fetchMood();
    }
  }, [slug]);

  const fetchMood = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moods`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch moods');

      const moods = await res.json();
      const moodData = moods.find((m: any) => m.mood === decodeURIComponent(slug as string));

      if (!moodData) {
        router.push('/404');
        return;
      }

      const randomBook = moodData.books[Math.floor(Math.random() * moodData.books.length)];

      setTimeout(() => {
        setMood(moodData);
        setBook(randomBook);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching mood:', error);
      setLoading(false);
    }
  };

  // ✅ แสดง quote เจ็บๆ ก่อนเข้าเนื้อหา
  useEffect(() => {
    if (!loading && mood && book) {
      const timer = setTimeout(() => {
        setShowIntroQuote(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, mood, book]);

  const shareUrl = `https://app.chidahp.com/mood/${mood?.mood}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return alert("เบราว์เซอร์ไม่รองรับการแชร์นี้");

    try {
      await navigator.share({
        title: `อารมณ์ "${mood.mood}"`,
        text: `เล่มนี้เหมาะกับฉันมาก! ลองดูเลย 👉`,
        url: shareUrl,
      });
    } catch (err) {
      console.log("แชร์ล้มเหลว", err);
    }
  };

  if (loading || !mood || !book) {
    return <MoodLoading />;
  }

  // ✅ ส่วนนี้แสดง Quote Intro ก่อนหนังสือ
  if (showIntroQuote) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${mood.gradient}`}>
        <motion.div
          className="max-w-xl text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <div className="text-6xl mb-4">{mood.emoji}</div> */}
          <h1 className="text-2xl md:text-4xl font-semibold mb-2">“{mood?.quote}”</h1>
          <p className="text-base md:text-lg text-white text-opacity-80">
            {mood?.quoteLineTwo}
          </p>
        </motion.div>
      </div>
    );
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
          {/* Emoji */}
          <motion.div className="text-7xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
            {mood.emoji}
          </motion.div>

          <motion.h1 className="text-3xl md:text-5xl font-bold mt-4">{mood.mood}</motion.h1>
          <p className="mt-2 text-white text-opacity-80">อารมณ์นี้ เหมาะกับเล่มนี้สุดๆ</p>

          {/* Book Card */}
          <motion.div
            key={book.title}
            className="bg-white text-black rounded-xl shadow-xl p-6 mt-10 flex items-center flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {book.cover && (
              <Image
                src={book.cover}
                alt={book.title}
                width={256}
                height={256}
                className="rounded-lg shadow mb-4"
              />
            )}
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

          {/* More & Share */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={fetchMood}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-full text-sm transition"
            >
              🎲 เปลี่ยนใจ ขออีกเล่ม!
            </button>
            <button
              onClick={handleCopy}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm hover:bg-opacity-30 transition"
            >
              🔗 คัดลอกลิงก์แชร์
            </button>
            <button
              onClick={handleNativeShare}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm hover:bg-opacity-30 transition"
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
};

export default MoodPage;
