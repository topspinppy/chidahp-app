"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Choice = {
  text: string;
  mood: string;
  subfeeling: string;
  reaction?: string;
};

type Question = {
  id: string;
  question: string;
  choices: Choice[];
};

const moodGradientMap: Record<string, string> = {
  "เศร้า": "from-gray-200 via-slate-100 to-blue-100",
  "หมดไฟ": "from-zinc-200 via-neutral-50 to-rose-100",
  "โกรธโลก": "from-red-100 via-yellow-50 to-orange-100",
  "สับสน": "from-blue-100 via-purple-50 to-indigo-100",
  "อยากเข้าใจตัวเอง": "from-green-100 via-teal-50 to-emerald-100",
  "อยากไปไกลๆ": "from-cyan-100 via-blue-50 to-sky-100",
  "อินเลิฟ": "from-pink-100 via-rose-50 to-red-100",
  "ตั้งคำถามกับชีวิต": "from-slate-300 via-zinc-100 to-neutral-50",
};

export default function PreQuestionFlow({ questions }: { questions: Question[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [showReaction, setShowReaction] = useState(false);
  const [currentReaction, setCurrentReaction] = useState("");
  const [currentMoodColor, setCurrentMoodColor] = useState("from-indigo-100 via-zinc-50 to-amber-50");
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const currentQuestion = questions[step];
  const totalSteps = questions.length;

  const handleChoice = (choice: Choice) => {
    const updatedAnswers = [...answers, choice];

    setAnswers(updatedAnswers);
    setCurrentReaction(choice.reaction || "");
    setSelectedText(choice.text);
    setCurrentMoodColor(moodGradientMap[choice.mood] || currentMoodColor);
    setShowReaction(true);

    setTimeout(() => {
      setShowReaction(false);
      setSelectedText(null);

      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        const countBy = (key: "mood" | "subfeeling") =>
          updatedAnswers.reduce((acc, curr) => {
            const k = curr[key];
            acc[k] = (acc[k] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

        const topNFrequent = (map: Record<string, number>, n: number) =>
          Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, n)
            .map(([key]) => key);

        const topMoods = topNFrequent(countBy("mood"), 3);
        const topSubfeelings = topNFrequent(countBy("subfeeling"), 5);
        const moodStats = countBy("mood");

        sessionStorage.setItem("topMoods", JSON.stringify(topMoods));
        sessionStorage.setItem("topSubfeelings", JSON.stringify(topSubfeelings));
        sessionStorage.setItem("fullAnswers", JSON.stringify(updatedAnswers));
        sessionStorage.setItem("moodStats", JSON.stringify(moodStats));

        router.push("/mood/recommend/intent");
      }
    }, 1400);
  };

  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${currentMoodColor} transition-all relative flex items-center justify-center`}>
      <AnimatePresence>
        {showReaction && (
          <motion.div
            className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReaction && currentReaction && (
          <motion.div
            key={currentReaction}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-white shadow-lg border border-indigo-200 rounded-lg px-6 py-4 
            text-indigo-700 text-sm max-w-xs w-full z-50 text-center"
          >
            <p className="italic">“{currentReaction}”</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-xl w-full px-4 py-12 text-center relative z-10">
        <motion.div
          className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden"
          animate={{ opacity: showReaction ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            ขอรู้จักใจคุณอีกนิด...
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            เพื่อให้เราเลือกหนังสือที่ตรงกับคุณที่สุด
          </p>
        </motion.div>

        {/* 💙 NEW! Opening line */}
        {step === 0 && (
          <motion.div
            className="mb-6 text-sm text-indigo-700 italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ชี้ดาบคัดมาให้คุณ <strong className="text-indigo-900">{questions.length + 1} คำถามจากใจ</strong>... <br />
            พร้อม <strong className="text-indigo-900">คำถามสุดท้าย</strong>ที่ตรงกับความรู้สึกคุณที่สุด 💙
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-medium mb-4 text-gray-700">
              {currentQuestion?.question}
            </h3>

            <div className="grid gap-3">
              {currentQuestion?.choices.map((choice) => (
                <motion.button
                  key={choice.text}
                  onClick={() => handleChoice(choice)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={showReaction}
                  className={`border border-gray-300 rounded-md px-4 py-3 text-left bg-white transition 
                    ${
                      showReaction
                        ? "opacity-40 pointer-events-none"
                        : "hover:bg-gray-50"
                    } 
                    ${
                      selectedText === choice.text
                        ? "ring-2 ring-indigo-300"
                        : ""
                    }`}
                >
                  {choice.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
