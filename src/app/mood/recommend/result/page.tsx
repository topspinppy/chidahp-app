"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { moods } from "./moods";
import MoodLoading from "../../components/MoodLoading";

export default function RecommendResult() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [topMood, setTopMood] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [, setSubfeelings] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [insightLines, setInsightLines] = useState<string[]>([]);
  const [bgGradient, setBgGradient] = useState("from-gray-50 via-slate-100 to-indigo-100");

  const intentCaptionMap: Record<string, string> = {
    "อยากรู้สึกมีกำลังใจขึ้น": "ให้คุณได้กำลังใจกลับไป",
    "อยากเข้าใจตัวเองมากขึ้น": "พาคุณใกล้ตัวเองขึ้นอีกนิด",
    "อยากหัวเราะเบา ๆ": "ให้คุณได้ยิ้มในวันที่ยังไม่ไหว",
    "อยากรู้สึกว่าไม่แปลก": "เพราะคุณไม่ได้อยู่คนเดียว",
    "อยากลุกขึ้นเริ่มใหม่": "ให้ใจคุณได้เริ่มต้นอีกครั้ง",
    "อยากได้แรงบันดาลใจ": "ให้ใจคุณได้ขยับ",
    "อยากพักใจเฉย ๆ สักนิด": "ให้คุณได้พักอย่างไม่รู้สึกผิด",
  };

  const subfeelingMap: Record<string, string> = {
    "กลัวเริ่มใหม่แล้วพังอีก": "คุณกลัวจะเจ็บจากความพยายามซ้ำอีกครั้ง",
    "สูญเสีย": "คุณอาจกำลังคิดถึงบางคนที่ไม่ได้อยู่ตรงนี้แล้ว",
    "รู้สึกโดดเดี่ยว": "คุณรู้สึกเหมือนความเงียบมันไม่ใช่เพื่อน",
    "ลังเล ตัดสินใจไม่ได้": "คุณยังไม่แน่ใจว่าจะเลือกทางไหนดี",
    "ถูกเอาเปรียบ": "คุณรู้สึกว่าโลกยังไม่ยุติธรรมกับคุณ",
    "อยากหนีจากเสียงรอบตัว": "คุณอยากเงียบเพื่อฟังตัวเอง",
    "ยังไม่รู้ว่าต้องการอะไร": "คุณยังหาไม่เจอว่าจริงๆ ต้องการอะไร",
    "หมดแรงกับที่เดิม": "คุณอยากเริ่มใหม่ เพราะที่เดิมมันหมดแรง",
    "โหยหาการเชื่อมโยง": "คุณอยากมีใครสักคนที่เข้าใจ",
    "อยากใช้ชีวิตให้คุ้ม": "คุณอยากออกไปใช้ชีวิตให้สุด!",
    "แบกเยอะเกินไป": "คุณอาจรู้สึกว่าต้องแบกมากเกินไป",
    "ขาดเป้าหมาย": "คุณยังไม่เห็นภาพปลายทางของตัวเอง",
    "ไม่มั่นใจในตัวเอง": "คุณอาจสงสัยในคุณค่าของตัวเองอยู่",
  };

  const moodGradientMap: Record<string, string> = {
    "เศร้า": "from-slate-100 via-blue-50 to-indigo-100",
    "หมดไฟ": "from-zinc-100 via-neutral-50 to-rose-100",
    "สับสน": "from-purple-100 via-indigo-50 to-blue-100",
    "อยากเข้าใจตัวเอง": "from-emerald-100 via-green-50 to-teal-100",
    "โกรธโลก": "from-orange-100 via-yellow-50 to-red-100",
    "เหงา": "from-slate-50 via-gray-100 to-blue-50",
    "ฮีลใจ": "from-pink-100 via-rose-50 to-red-100",
    "เฟียซ": "from-yellow-100 via-orange-50 to-red-100",
    "มั่นใจ": "from-indigo-100 via-violet-50 to-blue-100",
    "เหนื่อย": "from-gray-200 via-neutral-50 to-white",
  };

  useEffect(() => {
    const storedIntent = sessionStorage.getItem("userIntent");
    const stats = JSON.parse(sessionStorage.getItem("moodStats") || "{}");
    const subs = JSON.parse(sessionStorage.getItem("topSubfeelings") || "[]");

    if (!storedIntent || Object.keys(stats).length === 0) {
      router.push("/mood/pre-question");
      return;
    }

    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
    const topMood = sorted[0]?.[0];

    setTopMood(topMood);
    setIntent(storedIntent);
    setSubfeelings(subs);
    setCaption(intentCaptionMap[storedIntent] || "ให้คุณได้สิ่งที่ใจคุณต้องการ");

    const mapped = subs.map((s: string) => subfeelingMap[s]).filter(Boolean);
    setInsightLines(mapped);

    // 🎨 เปลี่ยนพื้นหลังตาม topMood
    setBgGradient(moodGradientMap[topMood] || "from-gray-50 via-slate-100 to-indigo-100");

    const moodObj = moods.find((m) => m.mood === topMood);
    if (!moodObj) return;

    const safeMatch = (arr?: string[]) => Array.isArray(arr) ? arr : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchedBooks = moodObj.books.filter((book: any) =>
      safeMatch(book.matchSubfeelings).some((sf: string) =>
        subs.some((userSf: string) => sf.toLowerCase() === userSf.toLowerCase())
      )
    );

    setBooks(matchedBooks.length > 0 ? matchedBooks : moodObj.books);
    setTimeout(() => setIsLoading(false), 1800);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (isLoading) return <MoodLoading />;

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-b ${bgGradient} py-12 px-4 font-sans`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3 tracking-tight leading-snug">
          เล่มนี้แหละ... ใจคุณกำลังอยากอ่านอยู่แต่ยังไม่รู้ตัว
          </h1>
          {topMood && (
            <p className="text-lg text-gray-600 italic mt-2">
              จากอารมณ์หลักในใจคุณ <strong className="text-indigo-700">{`"${topMood}"`}</strong> <br />
              และสิ่งที่คุณต้องการคือ <strong className="text-indigo-700">{`"${intent}"`}</strong>
            </p>
          )}
          <p className="mt-4 text-xl text-gray-700 font-medium">{caption}</p>

          {insightLines.length > 0 && (
            <div className="mt-6 text-sm text-gray-600 leading-relaxed">
              {insightLines.map((line, idx) => (
                <p key={idx} className="mb-1">• {line}</p>
              ))}
              <p className="mt-3 italic text-indigo-600 font-medium">
                และทั้งหมดนี้... คือคุณในตอนนี้
              </p>
            </div>
          )}
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

        {/* CLOSING */}
        <motion.div
          className="text-center mt-20 text-lg text-gray-700 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          หนังสือเล่มนึงอาจเปลี่ยนชีวิตไม่ได้ทันที <br />
          แต่ใจที่ยอมฟังตัวเอง... นั่นแหละจุดเริ่มต้นของทุกอย่าง 💭
        </motion.div>

        {/* RETRY */}
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
