'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategories } from '@/lib/products'

function CategoryCard({
  category,
  index,
}: {
  category: { id: string; name: string; count: number; image: string }
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/category/${category.id}`}
      className="relative overflow-hidden block group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
      aria-label={`Browse ${category.name}`}
    >
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background:
              'linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.1) 50%)',
            opacity: hovered ? 0.95 : 0.65,
          }}
        />
      </div>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-off-white/70 text-[10px] tracking-[0.3em] uppercase font-sans mb-1">
          {category.count} Items
        </p>
        <h3 className="font-serif text-2xl text-off-white font-semibold">{category.name}</h3>
        <div
          className="flex items-center gap-2 mt-3 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
          }}
        >
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans">
            Shop Now
          </span>
          <ArrowRight size={14} className="text-gold" />
        </div>
      </div>
    </Link>
  )
}

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories() // Fetch categories from Supabase
      console.log('Fetched categories:', fetchedCategories); // Debugging: log fetched categories
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  return (
    <section id="categories" className="py-24 bg-dark-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Browse By</p>
          <h2 className="font-serif text-4xl md:text-5xl text-off-white font-semibold text-balance">
            Shop Categories
          </h2>
          <div className="w-10 h-px bg-gold mx-auto mt-5" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.length > 0 ? (
            categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))
          ) : (
            <div>Loading categories...</div>
          )}
        </div>
      </div>
    </section>
  )
}