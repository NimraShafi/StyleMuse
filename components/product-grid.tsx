'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { getProducts, Product } from '@/lib/products'
import { useFavorites } from '@/lib/favorites-context'

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

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const wishlisted = isFavorite(product.id)
  const { ref, visible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      <div
        className="relative overflow-hidden bg-secondary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Product image - clickable */}
        <Link href={`/product/${product.slug}`} className="block">
          <div
            className="aspect-[3/4] relative overflow-hidden cursor-pointer"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-4 left-4 bg-off-white text-dark-gray text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans">
            {product.tag}
          </span>
        )}

        {/* Wishlist button */}
        <button
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-4 right-4 w-9 h-9 bg-off-white flex items-center justify-center hover:bg-gold transition-colors duration-200"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={wishlisted ? 'fill-gold text-gold' : 'text-dark-gray'}
          />
        </button>

        {/* Hover overlay with actions */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-brand-black/90 flex items-center justify-center gap-4 py-4"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <Link
            href={`/product/${product.slug}`}
            className="text-off-white text-[11px] tracking-[0.15em] uppercase font-sans hover:text-gold transition-colors border-r border-off-white/20 pr-4"
          >
            Quick View
          </Link>
          <Link
            href={`/product/${product.slug}`}
            className="text-off-white text-[11px] tracking-[0.15em] uppercase font-sans hover:text-gold transition-colors"
            aria-label={`Buy ${product.name} now`}
          >
            Buy Now
          </Link>
        </div>
      </div>

      {/* Product info */}
      <div className="pt-4 pb-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base text-dark-gray group-hover:text-gold transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-sm text-mid-gray mt-1 tracking-wide">{product.price}</p>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  const { ref: titleRef, visible: titleVisible } = useIntersectionObserver(0.1)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setDisplayProducts(products.slice(0, 6))
    }
    fetchProducts()
  }, [])

  return (
    <section id="shop" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div
        ref={titleRef}
        className="text-center mb-16"
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Curated Selection</p>
        <h2 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold text-balance">
          New Arrivals
        </h2>
        <div className="w-10 h-px bg-gold mx-auto mt-5" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {displayProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* View all CTA */}
      <div className="text-center mt-16">
        <Link
          href="/products"
          className="inline-block border border-dark-gray text-dark-gray font-sans text-xs tracking-[0.2em] uppercase px-12 py-4 hover:bg-brand-black hover:text-off-white transition-colors duration-300"
        >
          View All Products
        </Link>
      </div>
    </section>
  )
}
