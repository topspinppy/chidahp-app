/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* --- IMPORT ZONE --- */
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

/* --- QUOTES DATA ZONE --- */
const moodQuotes: Record<string, string> = {
  "เศร้า": "มีคนเขียนเรื่องนี้ไว้ให้คุณแล้วนะ 🖤",
  "อยากบ้า": "บางทีความบ้าก็ช่วยให้เราอยู่รอดจากโลกที่จริงจังเกินไป",
  "อินเลิฟ": "เพราะความรักไม่ใช่แค่เรื่องของหัวใจ... แต่มันอยู่ในทุกช่วงชีวิต",
  "สับสน": "บางทีคำตอบก็ไม่ได้อยู่ในหัว แต่อยู่ในเล่ม",
  "ต้องการกำลังใจ": "เธออาจล้า... แต่เธอไม่ได้ล้ม",
  "อยากเข้าใจตัวเอง": "ไม่มีคำตอบไหนแม่นเท่าคำตอบของตัวเราเอง",
  "อยากไปไกลๆ": "บางทีก็แค่อยากหนี แล้วไปเจออะไรดีๆ ข้างหน้า 🌍",
  "โกรธโลก": "โลกอาจไม่แฟร์... แต่มันไม่สามารถปิดปากเธอได้",
  "หมดไฟ": "ไม่ต้องลุกทันที แค่นั่งพักตรงนี้กับตัวอักษรก่อนก็ได้",
  "กลัวความล้มเหลว": "ไม่มีใครชนะตลอด... แต่ทุกคนมีสิทธิ์เริ่มใหม่",
  "ตั้งคำถามกับชีวิต": "ถ้าเธอไม่ใช่ 'แบบที่ควรเป็น' ก็อาจเป็นแบบที่โลกต้องการ",
  "อยากรู้จักโลกมากขึ้น": "ทุกหน้ากระดาษคืออีกหนึ่งประเทศที่เราอาจยังไม่เคยเจอ"
};

export default function MoodDisplay({ moods }: { moods: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subFromQuery = searchParams.get("sub")?.trim().toLowerCase() || "";
  const [background, setBackground] = useState(
    "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
  );
  const [showQuote, setShowQuote] = useState(false);
  const [selectedMood, setSelectedMood] = useState<any>(null);

  /* --- RANKING LOGIC --- */
  const rankedMoods = useMemo(() => {
    return [...moods].sort((a, b) => {
      const countMatch = (mood: any) =>
        mood.books.reduce((acc: number, book: any) => {
          const matches = book.matchSubfeelings?.filter((sub: string) =>
            sub.toLowerCase().includes(subFromQuery)
          )?.length || 0;
          return acc + matches;
        }, 0);

      return countMatch(b) - countMatch(a);
    });
  }, [moods, subFromQuery]);

  /* --- ACTION --- */
  const goToMoodPage = (mood: any) => {
    const slug = encodeURIComponent(mood.mood);
    const query = subFromQuery ? `?sub=${encodeURIComponent(subFromQuery)}` : "";
    router.push(`/mood/${slug}${query}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`min-h-screen flex items-center justify-center transition-all duration-[1500ms] ease-in-out bg-animate ${background}`}
    >
      <div className="pt-16 px-6 relative w-full">

        {/* --- QUOTE OVERLAY --- */}
        {showQuote && selectedMood && moodQuotes[selectedMood.mood] && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-white text-center text-xl md:text-2xl font-semibold bg-black bg-opacity-60 
            px-6 py-4 rounded-xl animate-fadeIn z-50 max-w-md shadow-lg">
            {moodQuotes[selectedMood.mood]}
          </div>
        )}

        {/* --- HEADER --- */}
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg font-primary">
            อารมณ์แบบนี้ อ่านเล่มไหนดี?
          </h1>
          <p className="mt-2 text-white text-opacity-80 text-base md:text-lg">
            ชี้ดาบจะชี้ให้เอง...ตามหัวใจคุณ 💫
          </p>
        </header>

        {/* --- MOOD GRID --- */}
        <main className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white">
          {rankedMoods.map((mood, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              onMouseEnter={() =>
                setBackground(`${mood.gradient} animate-gradient`)
              }
              onMouseLeave={() =>
                setBackground(
                  "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                )
              }
              onClick={() => {
                setSelectedMood(mood);
                setShowQuote(true);
                setTimeout(() => {
                  setShowQuote(false);
                  goToMoodPage(mood);
                }, 2500);
              }}
            >
              <div className="text-4xl">{mood.emoji}</div>
              <div className="mt-2 font-semibold text-red-950">
                {mood.mood}
              </div>
            </div>
          ))}
        </main>

        {/* --- FOOTER --- */}
        <footer className="mt-24 text-center text-white text-xs sm:text-sm opacity-60 px-4 font-primary">
          <div className="py-6 border-t border-white border-opacity-20">
            <p className="italic">
              “เราไม่รู้ว่าอารมณ์คุณเป็นยังไง แต่เรารู้ว่าเล่มดีๆ มีอยู่ที่นี่”
            </p>
            <p className="mt-2">
              Powered by{" "}
              <a
                href="https://www.chidahp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-200"
              >
                นักเรียนชูโล่
              </a>{" "}
              | © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="mt-4 italic text-xs text-white text-opacity-70">
              #CardtelSystem #ชี้ดาบ #เลือกเล่มให้ตรงใจ
            </p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
