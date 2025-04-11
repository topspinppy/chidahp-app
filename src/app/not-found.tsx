// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="text-[90px] font-extrabold text-yellow-600 drop-shadow-sm">
        404
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
        ไม่พบหน้าที่คุณกำลังค้นหา
      </h1>

      <p className="text-gray-600 mt-3 mb-9 max-w-md">
        เส้นทางนี้อาจถูกเปลี่ยนชื่อ ถูกลบ หรือคุณอาจพิมพ์ URL ผิดนิดหน่อย ลองกลับไปที่หน้าหลักดูนะครับ
      </p>

      <Link
        href="/"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-full shadow-md transition-all duration-200"
      >
        ⬅ กลับสู่หน้าแรก
      </Link>
    </div>
  );
}
