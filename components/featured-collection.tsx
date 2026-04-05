'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getProducts, Product } from '@/lib/products'

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

export default function FeaturedCollection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref: titleRef, visible: titleVisible } = useIntersectionObserver()
  const [featuredItems, setFeaturedItems] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeatured = async () => {
      const products = await getProducts()
      const items = products.slice(0, 6).map(p => ({
        ...p,
        displayTag: p.tag === 'Bestseller' ? 'Best Seller' : p.tag
      }))
      setFeaturedItems(items)
    }
    fetchFeatured()
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex items-end justify-between mb-12"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Curated For You</p>
            <h2 className="font-serif text-4xl md:text-5xl text-off-white font-semibold text-balance">
              Trending Now
            </h2>
          </div>

          {/* Scroll Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-11 h-11 border border-off-white/20 flex items-center justify-center text-off-white hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-11 h-11 border border-off-white/20 flex items-center justify-center text-off-white hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex-none w-64 md:w-72 snap-start group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-105"
                  sizes="300px"
                />
                <span className="absolute top-3 left-3 bg-gold text-brand-black text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans">
                  {item.displayTag}
                </span>
              </div>
              <div className="pt-4">
                <h3 className="font-serif text-base text-off-white group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <p className="font-sans text-sm text-mid-gray mt-1">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block border border-off-white/40 text-off-white font-sans text-xs tracking-[0.2em] uppercase px-12 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            View All Trending
          </Link>
        </div>
      </div>
    </section>
  )
}
