'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { getProducts, getCategories, Product } from '@/lib/products'
import { useFavorites } from '@/lib/favorites-context'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
]

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const wishlisted = isFavorite(product.id)

  return (
    <div className="group">
      <div
        className="relative overflow-hidden bg-secondary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/product/${product.slug}`} className="block">
          <div
            className="aspect-[3/4] relative overflow-hidden"
            style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.6s ease' }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </Link>

        {product.tag && (
          <span className="absolute top-4 left-4 bg-off-white text-dark-gray text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans">
            {product.tag}
          </span>
        )}

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
          >
            Buy Now
          </Link>
        </div>
      </div>

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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('newest')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [products, categories] = await Promise.all([
        getProducts(),
        getCategories()
      ])
      setAllProducts(products)
      setAllCategories(categories)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.priceNum - b.priceNum
      case 'price-desc':
        return b.priceNum - a.priceNum
      case 'name-asc':
        return a.name.localeCompare(b.name)
      default:
        return b.id - a.id
    }
  })

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 bg-secondary overflow-hidden">
          <Image
            src="/images/category-dresses.jpg"
            alt="All Products"
            fill
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Explore Our</p>
            <h1 className="font-serif text-4xl md:text-5xl text-off-white font-semibold">All Products</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <p className="text-mid-gray font-sans text-sm">
              Showing <span className="text-dark-gray font-medium">{sortedProducts.length}</span> products
            </p>
            <div className="flex items-center gap-4">
              {/* Filter Button */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 text-dark-gray hover:text-gold font-sans text-xs tracking-[0.1em] uppercase transition-colors"
              >
                <SlidersHorizontal size={16} strokeWidth={1.5} />
                Filter
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-dark-gray hover:text-gold font-sans text-xs tracking-[0.1em] uppercase transition-colors"
                >
                  Sort
                  <ChevronDown size={14} strokeWidth={1.5} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-off-white border border-border shadow-lg z-20 min-w-40">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setSortOpen(false) }}
                        className={`block w-full text-left px-4 py-3 font-sans text-sm hover:bg-secondary transition-colors ${
                          sortBy === option.value ? 'text-gold' : 'text-dark-gray'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mb-10 p-6 bg-secondary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-dark-gray">Categories</h3>
                <button onClick={() => setFilterOpen(false)} className="text-mid-gray hover:text-gold">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${
                    selectedCategory === 'all'
                      ? 'border-brand-black bg-brand-black text-off-white'
                      : 'border-border text-mid-gray hover:border-dark-gray hover:text-dark-gray'
                  }`}
                >
                  All
                </button>
                {allCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${
                      selectedCategory === cat.id
                        ? 'border-brand-black bg-brand-black text-off-white'
                        : 'border-border text-mid-gray hover:border-dark-gray hover:text-dark-gray'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-20">Loading products...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {sortedProducts.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-mid-gray font-sans">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-gold hover:underline font-sans text-sm"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
