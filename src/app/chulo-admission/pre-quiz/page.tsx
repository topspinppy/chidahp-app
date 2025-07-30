"use client"

import { useRouter } from "next/navigation"

export default function PreQuiz() {
  const router = useRouter()

  const handleStart = () => {
    router.push("/chulo-admission/quiz")
  }

  return (
    <main className="min-h-screen bg-[#FFFDE7] flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 tracking-tight animate-pulse">
        📝 ก่อนจะเริ่มข้อสอบ
      </h1>

      {/* Introduction */}
      <p className="text-md md:text-lg text-gray-800 leading-relaxed max-w-xl mb-8 motion-safe:animate-pulse">
        โรงเรียนชูโล่วิทยาคมไม่ได้รับใครง่ายๆ<br />
        แต่ถ้าคุณกล้าพอจะ “เป็นตัวเอง”…<br />
        เราพร้อมจะพาคุณไปสู่สายที่ใช่ในจักรวาลชูโล่
      </p>

      {/* Rules */}
      <div className="bg-white border border-yellow-500 text-left p-4 rounded-md text-sm text-gray-700 max-w-md shadow-sm mb-8">
        <p className="mb-2 font-bold text-black">📌 กติกาการสอบ:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>มีทั้งหมด 5 คำถาม</li>
          <li>ตอบจากความรู้สึกจริง อย่าคิดมาก</li>
          <li>ไม่มีถูก ไม่มีผิด มีแต่ตัวคุณในอีกมิติ</li>
          <li>ไม่ต้องใช้กระดาษคำตอบ แค่ใช้หัวใจ</li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="bg-black text-yellow-300 font-semibold px-6 py-3 rounded-lg text-lg shadow-md hover:bg-yellow-300 hover:text-black transition duration-200 ease-in-out"
      >
        พร้อมแล้ว เริ่มข้อสอบ!
      </button>

    </main>
  )
}
