"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

const resultMap = {
  A: {
    name: "เด็กหน้าห้อง",
    shortName: "หน้าห้อง",
    icon: "👓",
    quote: "เรารู้ว่าเธอไม่ได้อ่าน แต่เราทำสรุปมาให้แล้ว",
    description: "เจ้าพ่อความรู้รอบด้อม ใครงงให้มาหาเธอ",
    detail:
      "คุณคือพลังเบื้องหลังความเรียบร้อยในจักรวาลชูโล่ ใครทำกิจกรรมยังไง คุณคือคนที่ทำสรุปให้ทุกคนเข้าใจง่าย ใส่ใจในรายละเอียด เห็นเงียบๆ แต่ขาดคุณไม่ได้เลยนะ!",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    textColor: "text-blue-900"
  },
  B: {
    name: "เด็กหลังห้อง",
    shortName: "หลังห้อง",
    icon: "🎭",
    quote: "เสียงฮาคือพลังที่เรามอบให้กลุ่ม",
    description: "นักมุกมือไว หัวเราะในความมืด",
    detail:
      "คุณคือลมหายใจของกลุ่ม ใครๆ ก็รอเมนต์คุณทุกครั้งที่มีโพสต์ใหม่ มุกคุณอาจจะไม่สุภาพ แต่สุพาพันธุ์! คุณทำให้ทุกอย่างเบาขึ้น แต่ก็จริงใจกว่าที่ใครคิด",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
    textColor: "text-pink-900"
  },
  C: {
    name: "โฆษกห้อง",
    shortName: "โฆษก",
    icon: "📣",
    quote: "เราพูดแล้วทั้งด้อมก็เดินตาม",
    description: "สายขายเก่ง พูดทีเพื่อนตามทั้งด้อม",
    detail:
      "คุณคือปากเสียงของจักรวาลชูโล่ พลังรีวิวของคุณเปลี่ยนคนธรรมดาให้กลายเป็นนักอ่านประจำสำนักพิมพ์ได้ ความจริงใจและอินเนอร์ของคุณคือพลังเปลี่ยนโลก!",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    textColor: "text-yellow-900"
  },
  D: {
    name: "เด็กกิจกรรม",
    shortName: "กิจกรรม",
    icon: "🏃‍♀️",
    quote: "ความเงียบคือศัตรู เพราะเราจะวิ่ง",
    description: "แอคทีฟกว่าแอร์แฟลช ชอบลุยทุกชาเลนจ์",
    detail:
      "คุณมาพร้อมพลังงานระดับโซล่าเซลล์ย่านลาดกระบัง ไม่ว่าจะมีอะไรก็พร้อมเข้าร่วมก่อนเพื่อน ขับเคลื่อนกลุ่มให้ไม่เงียบ เป็นตัวเริ่มต้นเรื่องราวสนุกๆ ได้เสมอ!",
    color: "from-green-400 to-green-600",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    textColor: "text-green-900"
  },
  E: {
    name: "เด็กสายหลับ",
    shortName: "หลับ",
    icon: "😴",
    quote: "เราอยู่เสมอ แค่ไม่พูด",
    description: "วิญญาณผู้รู้ทุกอย่าง แต่ไม่เคยพูด",
    detail:
      "คุณอาจไม่ค่อยปรากฏตัว แต่เมื่อไหร่ที่พูด คนจะหยุดฟังเสมอ ความนิ่งของคุณไม่ได้แปลว่าเฉย แต่มันคือพลังของคนที่รู้เวลาและรู้วิธีโผล่ในจังหวะเป๊ะ",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
    textColor: "text-gray-900"
  }
}

export default function ResultClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [resultKey, setResultKey] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)


  useEffect(() => {
    const answerString = searchParams.get("answers") || ""
    const nickname = searchParams.get("nickname") || ""

    // ถ้าไม่มีทั้ง answers และ nickname ให้ redirect
    if (!answerString && !nickname) {
      router.replace("https://www.chidahp.com")
      return
    }

    const count: { [key: string]: number } = {}

    for (const ch of answerString) {
      count[ch] = (count[ch] || 0) + 1
    }

    let maxCount = 0
    let result = "A"
    for (const [key, val] of Object.entries(count)) {
      if (val > maxCount) {
        maxCount = val
        result = key
      }
    }

    setResultKey(result)
    setTimeout(() => setIsLoaded(true), 100)
  }, [searchParams])
  
  const result = resultMap[resultKey as keyof typeof resultMap]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayName)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // reset
    } catch {
      alert("คัดลอกไม่สำเร็จ ลองใหม่อีกครั้งนะค้าบ")
    }
  }

  if (!result) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  )
  const nickname = searchParams.get("nickname") || "???"
  const resultName = result?.shortName || "สายลึกลับ"
  const displayName = `${nickname} | สาย${resultName} อ.1`

  return (
    <Suspense>
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 px-2 sm:px-4 py-4 sm:py-6 lg:py-8 flex items-center justify-center">
        {/* Desktop & Tablet Layout (2 columns) */}
        <div className="hidden md:flex w-full max-w-6xl mx-auto gap-8 items-center justify-center">
          {/* Left Column - Result Card */}
          <div className={`flex-1 max-w-lg transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}>
            <div className={`${result.bgColor} backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20 relative overflow-hidden`}>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

              {/* Content */}
              <div className="relative z-10 text-center space-y-4 lg:space-y-6">

                {/* Trophy Header */}
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl animate-bounce">🏆</div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800">ยินดีด้วย!</h2>
                  <p className="text-xs lg:text-sm text-gray-600">และนี่คือสายของคุณในโรงเรียนชูโล่วิทยาคม</p>
                </div>

                {/* Character Icon */}
                <div className="relative">
                  <div className={`text-5xl lg:text-7xl animate-pulse filter drop-shadow-lg`}>
                    {result.icon}
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${result.color} opacity-20 blur-2xl rounded-full scale-150 animate-pulse`}></div>
                </div>

                {/* Character Name */}
                <div className="space-y-2">
                  <h1 className={`text-2xl lg:text-3xl font-black ${result.textColor} tracking-tight drop-shadow-sm`}>
                    {result.name}
                  </h1>
                  <p className="text-base lg:text-lg text-gray-700 font-medium italic">
                    {result.description}
                  </p>
                </div>

                {/* Quote */}
                <blockquote className={`text-sm lg:text-lg font-semibold ${result.textColor} px-4 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30`}>
                  <span className="text-xl lg:text-2xl opacity-50">&quot;</span>
                  <span className="mx-1">{result.quote}</span>
                  <span className="text-xl lg:text-2xl opacity-50">&quot;</span>
                </blockquote>

                {/* Detail Description */}
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed px-2 bg-white/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-white/30">
                  {result.detail}
                </p>

              </div>
            </div>
          </div>

          {/* Right Column - QR Code Section */}
          <div className={`flex-1 max-w-md transform transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl border border-white/40">
              <div className="text-center space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl">🎓</div>
                  <p className="text-base lg:text-lg font-medium text-gray-700">
                    เข้าสู่โรงเรียนใน LINE OpenChat
                  </p>
                  <p className="text-sm lg:text-base text-gray-500">
                    หยิบมือถือของคุณแล้วสแกนเลย!
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-4 lg:p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                    <Image
                      src="data:image/png;base64,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"
                      alt="QR Code"
                      width={150}
                      height={150}
                      className="rounded-xl w-32 h-32 lg:w-40 lg:h-40"
                    />
                  </div>
                </div>

                {/* Display Name + Copy Button */}
                <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                  🎓 <strong>เมื่อเข้า Line OpenChat</strong> <br />
                  กรุณาเปลี่ยนชื่อของคุณเป็น
                </p>
                <div className="mt-2 flex justify-center items-center gap-2 flex-wrap">
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                    {displayName}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                  >
                    {copied ? "✅ คัดลอกแล้ว" : "📋 คัดลอก"}
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-500 italic">
                    *หรือกดเข้าผ่านลิงก์ด้านล่างก็ได้ค้าบโผมม!*
                  </p>
                  <Link
                    href="https://line.me/ti/g2/V_sxJsPFO6YQ91-f5r5We8iqjdx8FBccSshfVA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm lg:text-base font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-blue-200 hover:border-blue-300"
                  >
                    🔗 เข้ากลุ่มผ่านลิงก์
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (Single Column) */}
        <div className={`md:hidden w-full max-w-md mx-auto transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>

          {/* Main Card */}
          <div className={`${result.bgColor} backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden`}>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-5">

              {/* Trophy Header */}
              <div className="space-y-2">
                <div className="text-4xl animate-bounce">🏆</div>
                <h2 className="text-2xl font-bold text-gray-800">ยินดีด้วย!</h2>
                <p className="text-sm text-gray-600">และนี่คือสายของคุณในโรงเรียนชูโล่วิทยาคม</p>
              </div>

              {/* Character Icon */}
              <div className="relative">
                <div className={`text-7xl animate-pulse filter drop-shadow-lg`}>
                  {result.icon}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${result.color} opacity-20 blur-2xl rounded-full scale-150 animate-pulse`}></div>
              </div>

              {/* Character Name */}
              <div className="space-y-2">
                <h1 className={`text-3xl font-black ${result.textColor} tracking-tight drop-shadow-sm`}>
                  {result.name}
                </h1>
                <p className="text-lg text-gray-700 font-medium italic">
                  {result.description}
                </p>
              </div>

              {/* Quote */}
              <blockquote className={`text-base font-semibold ${result.textColor} px-4 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30`}>
                <span className="text-2xl opacity-50">&quot;</span>
                <span className="mx-1">{result.quote}</span>
                <span className="text-2xl opacity-50">&quot;</span>
              </blockquote>

              {/* Detail Description */}
              <p className="text-sm text-gray-700 leading-relaxed px-2 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                {result.detail}
              </p>

            </div>
          </div>

          {/* Join Section */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/40">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-2xl">🎓</div>
                <p className="text-sm font-medium text-gray-700">
                  เข้าสู่โรงเรียนใน LINE OpenChat
                </p>
                <p className="text-xs text-gray-500">
                  หยิบมือถือของคุณแล้วสแกนเลย!
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <Image
                    src="data:image/png;base64,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"
                    alt="QR Code"
                    width={120}
                    height={120}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                🎓 <strong>เมื่อเข้า Line OpenChat</strong> <br />
                กรุณาเปลี่ยนชื่อของคุณเป็น
              </p>

              {/* Display Name + Copy Button */}
              <div className="mt-2 flex justify-center items-center gap-2 flex-wrap">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                  {displayName}
                </code>
                <button
                  onClick={handleCopy}
                  className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  {copied ? "✅ คัดลอกแล้ว" : "📋 คัดลอก"}
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 italic">
                  *หรือกดเข้าผ่านลิงก์ด้านล่างก็ได้ค้าบโผมม!*
                </p>
                <Link
                  href="https://line.me/ti/g2/V_sxJsPFO6YQ91-f5r5We8iqjdx8FBccSshfVA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full border border-blue-200 hover:border-blue-300"
                >
                  🔗 เข้ากลุ่มผ่านลิงก์
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  )
}