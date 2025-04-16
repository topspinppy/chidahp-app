'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"
import Image from "next/image"



function useRedirectIfAuthenticated() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/cardtel-live/admin")
      } else {
        setChecked(true)
      }
    })

    return () => unsubscribe()
  }, [router])

  return { checked }
}

export default function AdminLogin() {
  const { checked } = useRedirectIfAuthenticated()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/cardtel-live/admin")
    } catch {
      setError("🫣 ใส่ผิดแหละดูออก")
    }
  }

  // 🔒 ยังไม่เช็คเสร็จ → ซ่อนไว้ก่อน
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBEA]">
        <p className="text-gray-400 text-sm">กำลังตรวจสอบ...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFBEA] flex items-center justify-center">
      <div className="bg-white shadow-lg border border-[#FFE57F] rounded-xl p-8 w-full max-w-md text-center relative">

        {/* การ์ดหมุน */}
        <div className="flex justify-center mb-4">
          <div className="rounded-full shadow-md animate-spin-slow border border-black flex items-center justify-center text-black text-2xl font-bold">
            <Image src="/logo/chidahp-logo.png" alt="Cardtel Live Logo" className="w-16 h-16" width={64} height={64} />
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-[#000000] mb-4">
          Cardtel Live Admin
        </h1>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-yellow-400 font-semibold py-2 rounded hover:opacity-90 transition"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-6">
          © 2025 <strong>นักเรียนชูโล่</strong> | สำนักพิมพ์ชี้ดาบ
          <br />
          <span className="italic">*เราไม่ได้ร่ายเวท...แต่รหัสต้องถูกถึงเข้าได้*</span>
        </div>
      </div>

      {/* 🔁 CSS animation */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
