/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { moods } from "./moods";
import MoodLoading from "../../components/MoodLoading";

export default function RecommendResult() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [mood, setMood] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [_, setSubfeelings] = useState<string[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [caption, setCaption] = useState<string>("");

  const intentCaptionMap: Record<string, string> = {
    "อยากรู้สึกมีกำลังใจขึ้น": "ให้คุณได้กำลังใจกลับไป",
    "อยากเข้าใจตัวเองมากขึ้น": "พาคุณใกล้ตัวเองขึ้นอีกนิด",
    "อยากหัวเราะเบา ๆ": "ให้คุณได้ยิ้มในวันที่ยังไม่ไหว",
    "อยากรู้สึกว่าไม่แปลก": "เพราะคุณไม่ได้อยู่คนเดียว",
    "อยากลุกขึ้นเริ่มใหม่": "ให้ใจคุณได้เริ่มต้นอีกครั้ง",
    "อยากได้แรงบันดาลใจ": "ให้ใจคุณได้ขยับ",
    "อยากพักใจเฉย ๆ สักนิด": "ให้คุณได้พักอย่างไม่รู้สึกผิด",
  };

  useEffect(() => {
    const mood = sessionStorage.getItem("finalMood");
    const intent = sessionStorage.getItem("userIntent");
    const subs = JSON.parse(sessionStorage.getItem("topSubfeelings") || "[]");

    if (!mood || !intent) {
      router.push("/mood/pre-question");
      return;
    }

    setMood(mood);
    setIntent(intent);
    setSubfeelings(subs);
    setCaption(intentCaptionMap[intent] || "ให้คุณได้สิ่งที่ใจคุณต้องการ");

    const moodObj = moods.find((m) => m.mood === mood);
    if (!moodObj) return;

    const safeMatch = (arr?: string[]) => Array.isArray(arr) ? arr : [];

    const matchedBooks = moodObj.books.filter((book: any) =>
      safeMatch(book.matchSubfeelings).some((sf: string) =>
        subs.some((userSf: string) => sf.toLowerCase() === userSf.toLowerCase())
      )
    );

    setBooks(matchedBooks.length > 0 ? matchedBooks : moodObj.books);
    setTimeout(() => setIsLoading(false), 1800);
  }, [router]);

  if (isLoading) return <MoodLoading />;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3 tracking-tight leading-snug">
            เราเลือกเล่มนี้ให้คุณแล้ว
          </h1>
          {mood && (
            <p className="text-lg text-gray-600 italic">
              จากความรู้สึกว่า <strong className="text-indigo-700">{`"${mood}"`}</strong> <br />
              และสิ่งที่คุณต้องการคือ <strong className="text-indigo-700">{`"${intent}"`}</strong>
            </p>
          )}
          <p className="mt-4 text-xl text-gray-700 font-medium">{caption}</p>
        </motion.div>

        {/* BOOKS */}
        <div className="flex flex-wrap justify-center gap-8">
          {books.map((book, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg w-full max-w-xs"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-[300px] object-contain bg-white"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-indigo-800 mb-1">{book.title}</h2>
                <p className="text-sm text-gray-500 mb-2">โดย {book.author}</p>
                <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-indigo-600 font-medium hover:underline"
                >
                  ไปดูเล่มนี้ →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {books.length === 0 && (
          <motion.div
            className="text-center mt-20 text-gray-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ยังไม่มีเล่มที่ตรงเป๊ะ แต่เราเชื่อว่าแค่คุณเริ่มฟังใจตัวเอง...คุณก็เก่งมากแล้ว 💙
          </motion.div>
        )}

        {/* EMOTIONALLY CLOSING */}
        <motion.div
          className="text-center mt-20 text-lg text-gray-700 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ยังมีอีกหลายเรื่องรอให้คุณค้นเจอ... หรือบางที สิ่งที่ใจคุณต้องการอาจยังไม่ชัดเจนพอ 💭
        </motion.div>

        {/* RETRY BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/mood")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            ลองอีกครั้งกับอารมณ์ใหม่ →
          </button>
          <p className="text-sm text-gray-500 mt-2 italic">
            เพราะใจเราก็เปลี่ยนได้ทุกวัน
          </p>
        </div>

        {/* FOOTER */}
        <motion.div
          className="mt-16 text-center text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <p className="italic">powered by นักเรียนชูโล่ | Cardtel System</p>
          <p>© {new Date().getFullYear()} สำนักพิมพ์ชี้ดาบ</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
