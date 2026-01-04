"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const userIntents = [
  { text: "อยากรู้สึกมีกำลังใจขึ้น", emoji: "💙" },
  { text: "อยากเข้าใจตัวเองมากขึ้น", emoji: "🧠" },
  { text: "อยากหัวเราะเบา ๆ", emoji: "😄" },
  { text: "อยากรู้สึกว่าไม่แปลก", emoji: "🫂" },
  { text: "อยากลุกขึ้นเริ่มใหม่", emoji: "🌱" },
  { text: "อยากได้แรงบันดาลใจ", emoji: "⚡" },
  { text: "อยากพักใจเฉย ๆ สักนิด", emoji: "🛋️" },
];

const moodQuotes: Record<string, string> = {
  "เศร้า": "เอาจริง ๆ ก็เศร้านะ... แต่ยังตลกกับตัวเองได้อยู่มั้ยล่ะ",
  "หมดไฟ": "ไฟมันไม่ได้ดับ... มันแค่พักอยู่ในโหลขี้เกียจ",
  "สับสน": "งงก็เดินต่อได้นะ ไม่ได้ผิดกฎโลกซะหน่อย",
  "อยากเข้าใจตัวเอง": "บางทีตัวเองก็เข้าใจยากกว่าคนที่แอบชอบอีกนะ",
  "โกรธโลก": "โลกมันไม่แฟร์ แต่ขอให้แฟร์กับตัวเองหน่อยก็ยังดี",
  "อยากเริ่มใหม่": "จะเริ่มใหม่ต้องใส่รองเท้าไหม หรือใจล้วนพอ?",
  "เหงา": "บางคนไม่อยู่จริง ๆ แต่อยู่ใน playlist ทุกคืน",
  "เฟียซ": "คนเฟียซไม่เดินธรรมดา... ต้องกระทืบพื้นให้สั่นด้วย",
  "กังวล": "ไม่ต้องหาคำตอบก็ได้ แค่ยังถามอยู่ก็คือเก่งแล้วค้าบ",
  "อยากก้าวข้าม": "ฝั่งตรงข้ามของกลัว... บางทีมันคือคุณในเวอร์ชันเท่กว่านี้",
  "มั่นใจ": "ไม่ได้มั่นใจทุกวัน...แต่วันที่มั่น ใครก็หยุดไม่ได้",
  "อยากกลับมาเป็นตัวเอง": "คุณไม่ได้หายไปไหน...แค่หลบอยู่ใน hoodie เฉย ๆ",
  "ฮีลใจ": "ใจมันช้ำไม่เป็นไร...แต่ขออย่าช้ำซ้ำที่เดิมก็พอ",
  "เครียด": "เครียดแต่ยังสแกนโปรเซเว่นทัน = ยังไม่ตาย",
  "เหนื่อย": "เหนื่อยแต่ยังอ่านมาถึงบรรทัดนี้...ก็เก่งสัสละ",
};

const moodToSuggestedIntent: Record<string, string> = {
  "เศร้า": "อยากรู้สึกว่าไม่แปลก",
  "หมดไฟ": "อยากพักใจเฉย ๆ สักนิด",
  "เฟียซ": "อยากได้แรงบันดาลใจ",
  "กังวล": "อยากเข้าใจตัวเองมากขึ้น",
  "เหนื่อย": "อยากรู้สึกมีกำลังใจขึ้น",
  "อยากเข้าใจตัวเอง": "อยากเข้าใจตัวเองมากขึ้น",
  "ฮีลใจ": "อยากรู้สึกมีกำลังใจขึ้น",
  "อยากกลับมาเป็นตัวเอง": "อยากรู้สึกมีกำลังใจขึ้น",
  "เหงา": "อยากรู้สึกว่าไม่แปลก",
  "อยากเริ่มใหม่": "อยากลุกขึ้นเริ่มใหม่",
};

export default function IntentPage() {
  const router = useRouter();
  const [topMoods, setTopMoods] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  useEffect(() => {
    const storedMoods = sessionStorage.getItem("topMoods");
    if (storedMoods) {
      const parsed = JSON.parse(storedMoods);
      if (Array.isArray(parsed)) {
        setTopMoods(parsed);
        setSelectedMood(parsed[0]);
      }
    } else {
      router.push("/mood/pre-question");
    }
  }, [router]);

  const handleConfirm = () => {
    if (!selectedMood || !intent) return;
    sessionStorage.setItem("finalMood", selectedMood);
    sessionStorage.setItem("userIntent", intent);
    router.push("/mood/recommend/result");
  };

  const suggested = selectedMood ? moodToSuggestedIntent[selectedMood] : null;

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-br from-indigo-100 via-sky-100 to-white animate-[spin_60s_linear_infinite] opacity-20 rounded-full" />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-5xl mb-2">🧭</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">ชี้ดาบขอลองเดาใจคุณดู...</h1>
        <p className="text-gray-600 mb-6 text-sm">
          จากคำตอบเมื่อกี้... ชี้ดาบว่าใจคุณกำลังวนอยู่แถวนี้แหละ
        </p>

        {/* Moods */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {topMoods.map((mood) => (
            <motion.button
              key={mood}
              onClick={() => {
                setSelectedMood(mood);
                setIntent(null); // reset intent
              }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${
                selectedMood === mood
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {mood}
            </motion.button>
          ))}
        </motion.div>

        {/* Quote */}
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              key="quote"
              className="max-w-md mx-auto mb-4 text-indigo-700 text-sm italic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              “{moodQuotes[selectedMood]}”
            </motion.div>
          )}
        </AnimatePresence>

        {selectedMood && (
          <p className="mb-4 text-gray-700 font-medium">
            แล้วตอนนี้... ใจคุณอยากได้อะไรกลับไปจากเล่มดี ๆ สักเล่มล่ะ?
          </p>
        )}

        {/* Intent grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {userIntents.map(({ text, emoji }) => {
            const isSuggested = text === suggested;

            return (
              <motion.div
                key={text}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIntent(text)}
                className={`cursor-pointer p-4 rounded-xl border text-sm text-center transition-all select-none ${
                  intent === text
                    ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300"
                    : isSuggested
                    ? "bg-white text-gray-700 border-yellow-400 ring-2 ring-yellow-200"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                {text}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Confirm */}
        <motion.button
          onClick={handleConfirm}
          disabled={!intent}
          whileHover={{ scale: intent ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ไปดูเล่มที่ใจคุณอยากอ่านเลย →
        </motion.button>

        {intent && (
          <p className="text-xs text-gray-500 mt-4 italic">
            💭 อย่ามัวลังเล เดี๋ยวเล่มที่ใช่หลุดมือนะค้าบ
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
