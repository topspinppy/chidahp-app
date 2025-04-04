// components/MoodLoading.tsx
'use client';

import { motion } from 'framer-motion';

export default function MoodLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <motion.div
        className="text-6xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        ⚡
      </motion.div>

      <motion.h1
        className="text-xl tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        กำลังเชื่อมต่ออารมณ์ของคุณ...
      </motion.h1>

      <motion.div
        className="mt-6 w-48 h-1 bg-yellow-500 rounded-full overflow-hidden relative"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute top-0 left-0 h-1 bg-white w-12"
          animate={{ x: [0, 180] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
