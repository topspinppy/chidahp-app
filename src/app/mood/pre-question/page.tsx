"use client";

import { useState } from "react";
import PreQuestionFlow from "./components/PreQuestion";

type Choice = {
  text: string;
  mood: string;
  subfeeling: string;
};

type Question = {
  id: string;
  question: string;
  choices: Choice[];
};

export default function PreQuestionPage() {
  const [mode, setMode] = useState<"quick" | "default" | "deep" | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  const fetchQuestions = async (selectedMode: "quick" | "default" | "deep") => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/soft-interview?mode=${selectedMode}`, {
      cache: "no-store"
    });
    const data = await res.json();
    setQuestions(data.questions);
  };

  if (!mode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-700 via-gray-800 to-zinc-900 px-4 text-white space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">
            คุณอยาก “รู้จักตัวเอง” ลึกแค่ไหน?
          </h1>
          <p className="text-sm text-gray-300">
            เลือกโหมดที่จะพาคุณไปหาเล่มที่ใช่ที่สุด 🎯
          </p>
        </div>

        <div className="space-y-4 w-full max-w-sm">
          <button
            onClick={() => {
              setMode("quick");
              fetchQuestions("quick");
            }}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 transition rounded text-white font-medium"
          >
            🚀 ขอสั้น ๆ แต่อยากรู้เล่ม
          </button>

          <button
            onClick={() => {
              setMode("default");
              fetchQuestions("default");
            }}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 transition rounded text-white font-medium"
          >
            🧩 ปกติดี ตอบได้เรื่อย ๆ
          </button>

          <button
            onClick={() => {
              setMode("deep");
              fetchQuestions("deep");
            }}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 transition rounded text-white font-medium"
          >
            🧠 ล้วงลึก อยากรู้จริง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-700 via-gray-800 to-zinc-900">
      {questions ? (
        <PreQuestionFlow questions={questions} />
      ) : (
        <div className="text-white text-center pt-10">กำลังโหลดคำถาม...</div>
      )}
    </div>
  );
}
