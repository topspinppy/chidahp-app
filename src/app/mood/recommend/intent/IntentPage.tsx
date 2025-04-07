"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 💡 Intent options with emoji
const userIntents = [
  { text: "อยากรู้สึกมีกำลังใจขึ้น", emoji: "💙" },
  { text: "อยากเข้าใจตัวเองมากขึ้น", emoji: "🧠" },
  { text: "อยากหัวเราะเบา ๆ", emoji: "😄" },
  { text: "อยากรู้สึกว่าไม่แปลก", emoji: "🫂" },
  { text: "อยากลุกขึ้นเริ่มใหม่", emoji: "🌱" },
  { text: "อยากได้แรงบันดาลใจ", emoji: "⚡" },
  { text: "อยากพักใจเฉย ๆ สักนิด", emoji: "🛋️" },
];

// 🧠 Quote สำหรับแต่ละ mood
const moodQuotes: Record<string, string> = {
  "เศร้า": "บางความเสียใจ เราไม่ได้อยากลืม... แค่ไม่อยากเจ็บทุกครั้งที่นึกถึง",
  "หมดไฟ": "แค่ลืมตาในวันเหนื่อย ๆ ก็เก่งมากแล้ว... ยังไม่ต้องลุกก็ได้",
  "สับสน": "การไม่รู้ ไม่ได้แปลว่าอ่อนแอ มันคือจุดเริ่มต้นของความเข้าใจใหม่",
  "อยากเข้าใจตัวเอง": "บางคำตอบไม่ได้อยู่ในสมอง... แต่มันอยู่ตรงหัวใจ",
  "โกรธโลก": "โลกอาจไม่แฟร์... แต่คุณมีสิทธิ์พูด และมีค่ามากกว่าที่ระบบบอกไว้",
  "อยากเริ่มใหม่": "สิ่งใหม่อาจยังไม่สมบูรณ์... แต่มันคือก้าวแรกของใจที่กล้า",
  "เหงา": "บางครั้งเราไม่ได้ต้องการคนมาแก้ปัญหา... แค่มีใครฟังเราจริง ๆ ก็พอ",
  "เฟียซ": "แรงบันดาลใจไม่ต้องเสียงดัง... มันแค่ต้องขยับหัวใจคุณให้สั่นอีกครั้ง",
  "กังวล": "คุณไม่ต้องมีคำตอบทั้งหมด... แค่ยอมรับว่าไม่แน่ใจก็กล้าพอแล้ว",
  "อยากก้าวข้าม": "การกลัวคือสัญญาณว่า...สิ่งนั้นสำคัญพอที่เราจะไม่อยากเสียมันไป",
  "มั่นใจ": "คุณไม่ได้เริ่มจากศูนย์... คุณเริ่มจากประสบการณ์ทั้งหมดที่ผ่านมา",
  "อยากกลับมาเป็นตัวเอง": "คุณไม่เคยหายไปไหน...คุณแค่หลงลืมแสงของตัวเองไปชั่วคราว",
  "ฮีลใจ": "ทุกคลื่นลูกใหญ่ก็เคยผ่านไปได้... แล้วคุณจะผ่านครั้งนี้ได้เหมือนเดิม",
  "เครียด": "ไม่มีใครแบกได้ทุกอย่าง... ปล่อยบางอย่างลงได้ แปลว่าเราโตขึ้น",
  "เหนื่อย": "ไม่ต้องวิ่งแข่งกับใคร... แค่ยังอยู่ตรงนี้กับตัวเอง ก็ชนะมากแล้ว",
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

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* 🎨 BG Spin Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-br from-indigo-100 via-sky-100 to-white animate-[spin_60s_linear_infinite] opacity-30 rounded-full" />
      </div>

      {/* 💬 Main Content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-5xl mb-2">🧭</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          ชี้ดาบลองเดาใจคุณดู...
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          จากคำตอบเมื่อกี้ เราว่าคุณน่าจะกำลังรู้สึกแบบนี้
        </p>

        {/* 🟣 Mood Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {topMoods.map((mood) => (
            <motion.button
              key={mood}
              onClick={() => setSelectedMood(mood)}
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

        {/* 🧠 Mood Quote */}
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
              “{moodQuotes[selectedMood] || "หนังสือบางเล่มอาจไม่ได้เปลี่ยนโลก แต่เปลี่ยนใจเรา"}”
            </motion.div>
          )}
        </AnimatePresence>

        {/* ❓ Prompt */}
        {selectedMood && (
          <p className="mb-6 text-gray-700 font-medium">
            แล้วตอนนี้...คุณอยากได้อะไรกลับไปจากหนังสือ?
          </p>
        )}

        {/* 🎯 Intent Choices */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {userIntents.map(({ text, emoji }) => (
            <motion.div
              key={text}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIntent(text)}
              className={`cursor-pointer p-4 rounded-xl border text-sm transition-all duration-300 text-center select-none ${
                intent === text
                  ? "bg-indigo-500 text-white border-indigo-500 ring-2 ring-indigo-300"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="text-2xl mb-1">{emoji}</div>
              {text}
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Confirm Button */}
        <motion.button
          onClick={handleConfirm}
          disabled={!intent}
          whileHover={{ scale: intent ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ไปดูเล่มที่ใช่เลย →
        </motion.button>

        {/* 💡 Gentle Note */}
        {intent && (
          <p className="text-xs text-gray-500 mt-4 italic">
            ✨ ไม่มีคำตอบไหนถูกผิดหรอก... แค่คุณกล้าฟังใจตัวเองก็น่าชื่นชมแล้ว
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
