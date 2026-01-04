"use client"
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6 relative">
        {/* Subtle floating elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-amber-300/30 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-amber-400/50 rounded-full animate-ping"></div>

        <div className="max-w-2xl w-full space-y-8">

          {/* Logo with hover animation */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 group">
              <Image
                src="/logo/chulo-logo.png"
                alt="Chulo Logo"
                width={64}
                height={64}
                className="rounded-lg group-hover:rotate-3 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Main heading with subtle animations */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight animate-fade-in">
              ข้อสอบคัดสายเข้า<br />
              <span className="text-amber-600 hover:text-amber-700 transition-colors duration-300">
                โรงเรียนชูโล่วิทยาคม
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-lg mx-auto animate-fade-in-delay">
              สถาบันอันลึกลับที่ไม่มีใครเคยเข้า<br />
              แต่ทุกคนรู้ว่าอยากเข้า
            </p>
          </div>

          {/* CTA with enhanced animations */}
          <div className="space-y-6 animate-fade-in-delay-2">
            <a
              href="/chulo-admission/pre-quiz"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium px-8 py-3 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              อ่านกติกาก่อนสอบ
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <p className="text-sm text-gray-400 italic hover:text-gray-500 transition-colors duration-200">
              *โปรดใช้ดินสอ 2B ระบายในใจของคุณให้ชัดเจน*
            </p>
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </>
  )
}