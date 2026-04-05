'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  { id: 'clothing', name: 'Clothing', count: '24 Items', image: '/images/product-4.jpg' },
  { id: 'shoes', name: 'Shoes', count: '18 Items', image: '/images/category-accessorie.jpg' },
  { id: 'bags', name: 'Bags', count: '48 Items', image: '/images/category-bags.jpg' },
  { id: 'dresses', name: 'Dresses', count: '63 Items', image: '/images/category-dresses.jpg' },
  { id: 'jewelry', name: 'Jewelry', count: '35 Items', image: '/images/category-jewelry.jpg' },
  { id: 'accessories', name: 'Accessories', count: '52 Items', image: '/images/category-accessories.jpg' },
]

function useIntersectionObserver(threshold = 0.15) {
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

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const { ref, visible } = useIntersectionObserver()
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={`/category/${category.id}`}
      className="relative overflow-hidden block group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
      aria-label={`Browse ${category.name}`}
    >
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.1) 50%)', opacity: hovered ? 0.95 : 0.65 }}
        />
      </div>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-off-white/70 text-[10px] tracking-[0.3em] uppercase font-sans mb-1">{category.count}</p>
        <h3 className="font-serif text-2xl text-off-white font-semibold">{category.name}</h3>
        <div
          className="flex items-center gap-2 mt-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)' }}
        >
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans">Shop Now</span>
          <ArrowRight size={14} className="text-gold" />
        </div>
      </div>
    </Link>
  )
}

export default function Categories() {
  const { ref: titleRef, visible: titleVisible } = useIntersectionObserver(0.1)

  return (
    <section id="categories" className="py-24 bg-dark-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Browse By</p>
          <h2 className="font-serif text-4xl md:text-5xl text-off-white font-semibold text-balance">
            Shop Categories
          </h2>
          <div className="w-10 h-px bg-gold mx-auto mt-5" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
