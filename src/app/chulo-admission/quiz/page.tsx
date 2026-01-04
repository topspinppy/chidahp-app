// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function toThaiNumber(input: number | string): string {
  const thaiDigits = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
  return input.toString().split('').map(d => thaiDigits[parseInt(d)]).join('');
}

const questions = [
  {
    question: "ถ้าเพื่อนชวนคุณเข้ากลุ่มกิจกรรมใหม่ คุณจะ...",
    options: [
      "ขอรายละเอียดทันที แล้วช่วยวางแผน",
      "ตอบด้วยมุกตลกก่อนเลย",
      "แนะนำเพื่อนๆ ตามสไตล์คุณ",
      "ตกลงทันที ไม่ถามอะไรทั้งนั้น",
      "เปิดดู แล้วปิดไว้ก่อน ค่อยคิดอีกที"
    ]
  },
  {
    question: "เวลาคุยกันในกลุ่มแชท คุณมักจะ...",
    options: [
      "ช่วยสรุปเรื่องให้เข้าใจง่าย",
      "เล่นมุกแทรกจนเพื่อนงงแต่ฮา",
      "ส่งรีวิวยาว พร้อมฟอร์แมตสวยๆ",
      "ชวนทุกคนทำอะไรสนุกๆ ต่อ",
      "อ่านเงียบๆ อยู่ในมุมของคุณ"
    ]
  },
  {
    question: "ถ้ามีคนมาขอให้แนะนำหนังสือ คุณจะ...",
    options: [
      "จัดลิสต์ให้ พร้อมบอกเหตุผลละเอียด",
      "ตอบสั้นๆ แต่มีมุกติดมาด้วย",
      "เขียนรีวิวให้แบบจริงจัง",
      "แท็กเพื่อนให้ช่วยตอบต่อ",
      "เลื่อนผ่านแบบไม่ได้รู้สึกผิด"
    ]
  },
  {
    question: "คุณรู้สึกสนุกกับช่วงเวลาแบบไหนมากที่สุด?",
    options: [
      "ตอนที่ได้ช่วยวางแผนหรือจัดการอะไรบางอย่าง",
      "ตอนที่ทุกคนเล่นมุกใส่กัน",
      "ตอนที่ได้เล่าเรื่องหรือแชร์สิ่งที่ตัวเองชอบ",
      "ตอนที่ทุกคนรวมพลังทำอะไรร่วมกัน",
      "ตอนที่เงียบๆ ไม่มีใครกวน"
    ]
  },
  {
    question: "ถ้ามีอะไรใหม่ๆ ที่คุณไม่ถนัด คุณมักจะ...",
    options: [
      "หาวิธีเรียนรู้ แล้วช่วยคนอื่นต่อ",
      "แกล้งงงให้ขำ แล้วไปต่อแบบงงๆ",
      "ลองก่อน แล้วแชร์สิ่งที่ได้เจอ",
      "โดดเข้าไปก่อน แล้วค่อยว่ากัน",
      "รอดูว่าเพื่อนรอดไหม ก่อนตัดสินใจ"
    ]
  }
]

const optionMap = ["A", "B", "C", "D", "E"]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [nickname, setNickname] = useState("")
  const [started, setStarted] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleAnswer = (optionIndex: number) => {
    const selected = optionMap[optionIndex]
    const updatedAnswers = [...answers, selected]

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswers(updatedAnswers)
    } else {
      const answerString = updatedAnswers.join("")
      router.push(`/chulo-admission/result?answers=${answerString}&nickname=${nickname}`)
    }
  }

  const { question, options } = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-black text-white px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold">
            แบบทดสอบเข้าเรียน โรงเรียนชูโล่วิทยาคม ปีการศึกษา {toThaiNumber(new Date().getFullYear() + 543)}
          </h1>
          {!started && (
            <div className="text-sm opacity-90 mt-1">
              กรอกชื่อเล่นเพื่อเริ่มทำแบบทดสอบ
            </div>
          )}
          {started && (
            <div className="text-sm opacity-90 mt-1">
              ข้อ {currentQuestion + 1} จาก {questions.length} ข้อ
            </div>
          )}
        </div>
      </div>

      {!started ? (
        // หน้ากรอกชื่อเล่นก่อนเริ่ม
        <div className="flex-1 px-8 py-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ก่อนเริ่ม ขอทราบชื่อเล่นของนักเรียน
          </h2>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              if (e.target.value) setError("")
            }}
            placeholder="เช่น แนน / บีม / ต้า"
            className="border border-gray-300 rounded-md px-4 py-2 text-lg w-full max-w-xs text-center"
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <button
            onClick={() => {
              if (!nickname.trim()) {
                setError("โปรดกรอกชื่อเล่นก่อนเริ่มแบบทดสอบนะค้าบ")
              } else {
                setStarted(true)
              }
            }}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
          >
            เริ่มทำแบบทดสอบ
          </button>
        </div>
      ) : (
        // ข้อสอบ
        <>
          <div className="flex-1 px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-right text-sm text-gray-600 mb-8">
                หน้า {currentQuestion + 1} / {questions.length}
              </div>

              <div className="bg-gray-50 border-l-4 border-orange-500 p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                  {currentQuestion + 1}. {question}
                </h2>
              </div>

              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 border border-gray-300 rounded hover:bg-orange-50 hover:border-orange-500 transition-colors duration-150 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-orange-100 group-hover:text-orange-700 flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-gray-800 leading-relaxed flex-1">
                        {opt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-12">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>ความคืบหน้า</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-8 py-4">
            <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
              กรุณาเลือกคำตอบที่ตรงกับตัวคุณมากที่สุด
            </div>
          </div>
        </>
      )}
    </div>
  )
}
