'use client'

import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function Newsletter() {
  const { ref, visible } = useIntersectionObserver()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error')
        setLoading(false)
        return
      }

      setSubmitted(true)
      setEmail('')
      setLoading(false)
    } catch (err) {
      setError('Failed to subscribe')
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-brand-black">
      <div
        ref={ref}
        className="max-w-2xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-4">Exclusive Access</p>
        <h2 className="font-serif text-4xl md:text-5xl text-off-white font-semibold text-balance mb-4">
          Join StyleMuse Club
        </h2>
        <p className="font-sans text-off-white/60 text-sm leading-relaxed mb-10 max-w-md mx-auto">
          Subscribe for early access to new collections, exclusive member offers, and curated style inspiration delivered to your inbox.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border border-gold flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10l4.5 4.5 7.5-8" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-serif text-xl text-off-white">Welcome to StyleMuse Club</p>
            <p className="font-sans text-sm text-mid-gray">Check your email.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={loading}
                className="flex-1 bg-transparent border border-off-white/20 text-off-white placeholder:text-mid-gray text-sm font-sans px-5 py-4 outline-none focus:border-gold transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="bg-gold text-brand-black font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-off-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-4 h-4 border border-brand-black/40 border-t-brand-black rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {error && (
              <p className="font-sans text-xs text-red-400 mt-3 max-w-md mx-auto">
                {error}
              </p>
            )}
          </>
        )}

        <p className="font-sans text-[11px] text-mid-gray mt-6 tracking-wide">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
