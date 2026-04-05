'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [headingRef.current, subRef.current, btnRef.current, scrollIndicatorRef.current]
    elements.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.9s ease ${0.3 + i * 0.2}s, transform 0.9s ease ${0.3 + i * 0.2}s`
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    })
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-model.jpg"
        alt="StyleMuse luxury fashion editorial"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p
          ref={subRef}
          className="text-gold text-sm tracking-[0.4em] uppercase mb-6 font-sans"
        >
          New Collection 2026
        </p>
        <h1
          ref={headingRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-off-white font-semibold leading-tight text-balance mb-6"
        >
          Elevate Your Style
        </h1>
        <p
          className="font-sans text-off-white/80 text-base md:text-lg tracking-wide mb-10 max-w-md"
        >
          Discover Timeless Fashion
        </p>
        <div ref={btnRef} className="flex items-center gap-6">
          <Link
            href="/products"
            className="inline-block bg-off-white text-brand-black font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors duration-300"
          >
            Shop Now
          </Link>
          <Link
            href="/products"
            className="inline-block border border-off-white/60 text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-off-white/60 text-[10px] tracking-[0.3em] uppercase font-sans">Scroll</span>
        <div className="w-px h-12 bg-off-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gold animate-[scroll-line_1.8s_ease-in-out_infinite]" style={{ height: '40%', animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
