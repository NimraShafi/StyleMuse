'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Loader from '@/components/ui/loader'

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500) // Show loader for 500ms on route change
    return () => clearTimeout(timer)
  }, [pathname])

  return loading ? <Loader /> : null
}