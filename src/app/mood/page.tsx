"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // อย่าลืม import ด้วยนะค้าบ

export default function IntroPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleStart = () => {
    setShowContent(false);
    setTimeout(() => {
      router.push("/mood/pre-question");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-primary">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 opacity-80 backdrop-blur-sm"></div>

      {/* --- CONTENT --- */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative flex flex-col items-center justify-center min-h-screen text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* โลโก้ชี้ดาบด้านบน */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <Image
                src="/logo/chidahp-logo.png" // เปลี่ยนเป็น path ที่ถูกต้องของคุณ
                alt="ชี้ดาบโลโก้"
                width={120}
                height={120}
                className="mx-auto drop-shadow-lg animate-bounce"
              />
            </motion.div>

            {/* ข้อความ Quote */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              เราอาจไม่รู้ว่าคุณกำลังรู้สึกอะไร...
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white mb-10 text-opacity-90"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              แต่เรามีเล่มนึงที่อาจเข้าใจคุณมากกว่าที่คุณคิด
            </motion.p>

            {/* ปุ่มเริ่ม */}
            <motion.button
              onClick={handleStart}
              className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-yellow-200 transition drop-shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              เริ่มเลือกอารมณ์ของคุณ
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
