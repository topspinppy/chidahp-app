/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MoodDisplay({ moods }: { moods: any[] }) {
  const router = useRouter();
  const [background, setBackground] = useState(
    "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const handleRandomMood = () => {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const books = randomMood.books;
    const randomBook = books[Math.floor(Math.random() * books.length)];
    setSelectedMood(randomMood);
    setSelectedBook(randomBook);
    setShowModal(true);
  };

  const goToMoodPage = (mood: any) => {
    const slug = encodeURIComponent(mood.mood);
    router.push(`/mood/${slug}`);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-[1500ms] ease-in-out ${background}`}
    >
      <div className="pt-16 px-6">
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg font-primary">
            อารมณ์แบบนี้ อ่านเล่มไหนดี?
          </h1>
          <p className="mt-2 text-white text-opacity-80 text-base md:text-lg">
            ชี้ดาบจะชี้ให้เอง...ตามหัวใจคุณ 💫
          </p>
        </header>

        {/* Mood Cards */}
        <main className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 rounded-xl p-4 flex flex-col items-center justify-center transition-all cursor-pointer transform hover:scale-105"
              onMouseEnter={() => setBackground(mood.gradient)}
              onMouseLeave={() =>
                setBackground(
                  "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                )
              }
              onClick={() => {
                setTimeout(() => goToMoodPage(mood), 400); // ให้ effect แว้บก่อนเปลี่ยนหน้า
              }}
            >
              <div className="text-4xl">{mood.emoji}</div>
              <div className="mt-2 font-semibold text-red-950">
                {mood.mood}
              </div>
            </div>
          ))}
        </main>

        {/* Random Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleRandomMood}
            className="group px-6 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-black rounded-full text-sm font-medium 
              transition transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg
              animate-[pulse_3s_ease-in-out_infinite]"
          >
            <span className="inline-block animate-spin mr-2">🎲</span>
            เลือกเล่มให้ฉันแบบสุ่มเลย!
          </button>
        </div>

        {/* Footer */}
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

      {/* Cinematic Modal */}
      {showModal && selectedMood && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white text-black rounded-xl shadow-xl w-full max-w-md mx-6 p-6 text-center animate-fadeIn relative">
            {/* Mood & Book Info */}
            <div className="text-6xl mb-2">{selectedMood.emoji}</div>
            <h2 className="text-2xl font-bold">{selectedMood.mood}</h2>
            <p className="text-sm italic text-gray-500 mb-4">
              วันนี้คุณกำลังรู้สึกแบบนี้สินะ...
            </p>

            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">{selectedBook.title}</h3>
            <p className="text-sm text-gray-600 mt-1 mb-2">
              {selectedBook.quote || selectedBook.description}
            </p>
            <a
              href={selectedBook.link}
              target="_blank"
              className="text-sm text-blue-600 underline"
            >
              อ่านเพิ่มเติม
            </a>

            {/* แชร์ลิงก์ */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">แชร์อารมณ์นี้ให้เพื่อน:</p>
              <div className="flex items-center justify-center gap-2">
                <input
                  readOnly
                  value={`https://www.chidahp.com/mood/${encodeURIComponent(
                    selectedMood.mood
                  )}`}
                  className="bg-gray-100 text-xs px-3 py-1 rounded-md w-full max-w-[220px] text-gray-700"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  className="text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.chidahp.com/mood/${encodeURIComponent(
                        selectedMood.mood
                      )}`
                    );
                    alert("คัดลอกลิงก์แล้วค้าบ!");
                  }}
                >
                  คัดลอก
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
