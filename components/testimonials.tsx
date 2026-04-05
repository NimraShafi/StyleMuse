'use client'

import { useRef, useEffect, useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: 'StyleMuse has completely transformed how I approach fashion. Every piece I\'ve purchased feels like a work of art. The quality is absolutely unmatched.',
    name: 'Isabelle Fontaine',
    title: 'Fashion Editor, Paris',
    initials: 'IF',
  },
  {
    id: 2,
    quote: 'I\'ve shopped at countless luxury boutiques, but nothing compares to the curation here. My wardrobe has never felt more cohesive and intentional.',
    name: 'Sophia Renard',
    title: 'Creative Director, London',
    initials: 'SR',
  },
  {
    id: 3,
    quote: 'The attention to detail and packaging is extraordinary. StyleMuse doesn\'t just sell clothing — it delivers an experience that begins the moment you browse.',
    name: 'Amara Chen',
    title: 'Stylist & Consultant',
    initials: 'AC',
  },
]

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

export default function Testimonials() {
  const { ref: titleRef, visible: titleVisible } = useIntersectionObserver()
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Our Clients</p>
          <h2 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold text-balance">
            Words of Praise
          </h2>
          <div className="w-10 h-px bg-gold mx-auto mt-5" />
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Mobile: single card + dots */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[active]} index={0} />
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-gold' : 'bg-mid-gray/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, visible } = useIntersectionObserver()
  return (
    <div
      ref={ref}
      className="bg-card border border-border p-8 flex flex-col gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* Stars */}
      <div className="flex gap-1" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.6 3.5L7 9.5 3.9 11l.6-3.5L2 5l3.5-.5L7 1z" fill="#C9A96E" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-serif text-base text-dark-gray leading-relaxed italic flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-sm text-brand-black font-semibold">{testimonial.initials}</span>
        </div>
        <div>
          <p className="font-sans text-sm font-medium text-dark-gray">{testimonial.name}</p>
          <p className="font-sans text-xs text-mid-gray mt-0.5">{testimonial.title}</p>
        </div>
      </div>
    </div>
  )
}
