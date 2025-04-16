'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"

export function useAuthRedirect() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/cardtel-live/admin/login")
      } else {
        setIsAuthenticated(true)
      }
      setAuthChecked(true)
    })

    return () => unsubscribe()
  }, [router])

  return { authChecked, isAuthenticated }
}
