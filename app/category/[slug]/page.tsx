'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ChevronLeft } from 'lucide-react'
import { getProductsByCategory, getCategories, Product } from '@/lib/products'
import { useFavorites } from '@/lib/favorites-context'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

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

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [allCategories, setAllCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [products, categories] = await Promise.all([
        getProductsByCategory(slug),
        getCategories()
      ])
      setCategoryProducts(products)
      setAllCategories(categories)
      setLoading(false)
    }
    fetchData()
  }, [slug])

  const category = allCategories.find(c => c.id === slug)
  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1)
  const categoryImage = category?.image || '/images/category-dresses.jpg'

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 bg-secondary overflow-hidden">
          <Image
            src={categoryImage}
            alt={categoryName}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Shop Collection</p>
            <h1 className="font-serif text-4xl md:text-5xl text-off-white font-semibold">{categoryName}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-mid-gray hover:text-gold transition-colors"
            >
              <ChevronLeft size={14} />
              All Products
            </Link>
          </div>

          {/* Product count */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <p className="text-mid-gray font-sans text-sm">
              Showing <span className="text-dark-gray font-medium">{categoryProducts.length}</span> products
            </p>
          </div>

          {/* Product Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-mid-gray font-sans">No products found in this category.</p>
              <Link href="/products" className="mt-4 inline-block text-gold hover:underline font-sans text-sm">
                Browse all products
              </Link>
            </div>
          )}

          {/* Other Categories */}
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl text-dark-gray mb-8 text-center">Explore Other Categories</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {allCategories.filter(c => c.id !== slug).map(cat => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="px-6 py-3 border border-border text-dark-gray font-sans text-xs tracking-[0.15em] uppercase hover:bg-brand-black hover:text-off-white hover:border-brand-black transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
