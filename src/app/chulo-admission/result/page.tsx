// app/chulo-admission/result/page.tsx
import { Suspense } from "react"
import ResultClient from "./ResultClient"

export default function ResultPageWrapper() {
  return (
    <Suspense fallback={<p className="text-center py-20">กำลังโหลดผลลัพธ์...</p>}>
      <ResultClient />
    </Suspense>
  )
}
