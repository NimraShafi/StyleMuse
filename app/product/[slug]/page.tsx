'use client'

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ShieldCheck, RefreshCw, Truck, Award, Heart } from 'lucide-react'
import { getProductBySlug, getProducts, Product } from '@/lib/products'
import { useFavorites } from '@/lib/favorites-context'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const trustBadges = [
  { Icon: Truck, label: 'Free Shipping', sub: 'On orders over $200' },
  { Icon: RefreshCw, label: '30-Day Returns', sub: 'Hassle-free returns' },
  { Icon: ShieldCheck, label: 'Secure Payment', sub: '256-bit SSL encryption' },
  { Icon: Award, label: 'Authenticated', sub: '100% genuine products' },
]

function RelatedProducts({ currentProduct, allProducts }: { currentProduct: Product, allProducts: Product[] }) {
  const related = allProducts
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-2xl md:text-3xl text-dark-gray mb-10 text-center">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map(product => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-4 font-serif text-dark-gray group-hover:text-gold transition-colors">{product.name}</h3>
              <p className="text-mid-gray font-sans text-sm mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedProduct, fetchedProducts] = await Promise.all([
        getProductBySlug(slug),
        getProducts()
      ])
      setProduct(fetchedProduct || null)
      setAllProducts(fetchedProducts)
      setLoading(false)
    }
    fetchData()
  }, [slug])

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColorName, setSelectedColorName] = useState('')
  const [zoomed, setZoomed] = useState(false)

  // Get images for selected color or fallback to product images
  const displayedImages = product?.colors.find(c => c.name === selectedColorName)?.images || product?.images || []
const selectedColor = product?.colors.find(
  c => c.name.trim().toLowerCase() === selectedColorName.trim().toLowerCase()
);

  // Set default color and reset image index on product load
  useEffect(() => {
    if (product) {
      if (product.colors.length > 0) {
        setSelectedColorName(product.colors[0].name)
      } else {
        setSelectedColorName('')
      }
      setSelectedImageIndex(0)
    }
  }, [product])

  // Reset image index on color change
  useEffect(() => {
    setSelectedImageIndex(0)
  }, [selectedColorName])

  const { isFavorite, toggleFavorite } = useFavorites()
  const wishlisted = product ? isFavorite(product.id) : false

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-[50vh]">
          <p className="text-mid-gray font-sans">Loading product...</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {product ? (
          <>
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
              <div className="flex items-center gap-2 text-xs font-sans tracking-[0.1em] uppercase">
                <Link href="/" className="text-mid-gray hover:text-gold transition-colors">Home</Link>
                <span className="text-mid-gray">/</span>
                <Link href="/products" className="text-mid-gray hover:text-gold transition-colors">Shop</Link>
                <span className="text-mid-gray">/</span>
                <Link href={`/category/${product.category}`} className="text-mid-gray hover:text-gold transition-colors capitalize">{product.category}</Link>
                <span className="text-mid-gray">/</span>
                <span className="text-dark-gray">{product.name}</span>
              </div>
            </div>

            {/* Product layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* Image gallery */}
                <div className="flex flex-col-reverse lg:flex-row gap-4">

                  {/* LEFT SIDE — COLOR IMAGES (vertical thumbnails) */}
                  <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 scrollbar-hide">
                    {product?.colors?.map((color) => {
                      const img = color.images?.[0]
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorName(color.name)}
                          className={`relative w-16 lg:w-20 aspect-square overflow-hidden flex-shrink-0 transition-all ${
                            selectedColorName === color.name
                              ? 'ring-2 ring-gold'
                              : 'ring-1 ring-border opacity-60 hover:opacity-100'
                          }`}
                          aria-label={`Select color ${color.name}`}
                        >
                          {img && (
                            <Image
                              src={img}
                              alt={color.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* RIGHT SIDE — MAIN IMAGE */}
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:h-[500px] bg-secondary cursor-zoom-in flex-1"
                    onClick={() => setZoomed(!zoomed)}
                  >
                    {displayedImages.length > 0 && (
                      <Image
                        src={displayedImages[selectedImageIndex]}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover transition-transform duration-700"
                        style={{ transform: zoomed ? 'scale(1.15)' : 'scale(1)' }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}

                    {/* Wishlist button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.id)
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-off-white/90 flex items-center justify-center hover:bg-gold transition-colors"
                      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.5}
                        className={wishlisted ? 'fill-gold text-gold' : 'text-dark-gray'}
                      />
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className="flex flex-col">
                  <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold mb-3">{product.tag}</p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-dark-gray font-semibold leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-2xl text-dark-gray mt-4 mb-6">{selectedColor?.price ?? product.price}</p>
                  <div className="w-10 h-px bg-gold mb-6" />

                  <p className="font-sans text-sm text-mid-gray leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Color selector */}
                  {product.colors.length > 0 && (
                    <div className="mb-6">
                      <p className="font-sans text-xs tracking-[0.2em] uppercase text-dark-gray mb-3">
                        Color — <span className="text-mid-gray">{selectedColorName}</span>
                      </p>
                       <div className="flex gap-2 overflow-x-auto lg:overflow-x-visible pb-2 scrollbar-hide">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColorName(color.name)}
                            aria-label={`Select color ${color.name}`}
                            className={`px-4 py-2 font-sans text-xs tracking-wide border transition-colors ${
                              selectedColorName === color.name
                                ? 'border-brand-black bg-brand-black text-off-white'
                                : 'border-border text-mid-gray hover:border-dark-gray hover:text-dark-gray'
                            }`}
                          >
                            {color.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size selector */}
                  {product.sizes.length > 1 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-sans text-xs tracking-[0.2em] uppercase text-dark-gray">
                          Size {selectedSize && `— ${selectedSize}`}
                        </p>
                        <Link href="/size-guide" className="font-sans text-xs text-gold hover:underline">Size Guide</Link>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            aria-label={`Select size ${size}`}
                            className={`min-w-12 h-12 px-3 font-sans text-sm border transition-colors ${
                              selectedSize === size
                                ? 'border-brand-black bg-brand-black text-off-white'
                                : 'border-border text-mid-gray hover:border-dark-gray hover:text-dark-gray'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <a
                      href={product.affiliate_url || '#'}
                      target={product.affiliate_url ? '_blank' : undefined}
                      rel={product.affiliate_url ? 'noopener noreferrer' : undefined}
                      className="flex-1 font-sans text-xs tracking-[0.2em] uppercase py-4 text-center transition-colors duration-300 flex items-center justify-center gap-2 bg-brand-black text-off-white hover:bg-gold hover:text-brand-black"
                      style={{ textDecoration: 'none' }}
                    >
                      Buy Now
                    </a>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`flex-1 border font-sans text-xs tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 transition-colors duration-300 ${
                        wishlisted
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-dark-gray text-dark-gray hover:bg-brand-black hover:text-off-white hover:border-brand-black'
                      }`}
                    >
                      <Heart size={16} strokeWidth={1.5} className={wishlisted ? 'fill-gold' : ''} />
                      {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>

                  {/* Trust badges */}
                  {/* <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
                    {trustBadges.map(({ Icon, label, sub }) => (
                      <div key={label} className="flex items-center gap-3">
                        <Icon size={18} strokeWidth={1.5} className="text-gold flex-shrink-0" />
                        <div>
                          <p className="font-sans text-xs text-dark-gray font-medium">{label}</p>
                          <p className="font-sans text-[11px] text-mid-gray">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div> */}

                  {/* Product details */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-dark-gray mb-4">Product Details</p>
                    <ul className="flex flex-col gap-2">
                      {product.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 font-sans text-sm text-mid-gray">
                          <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <RelatedProducts currentProduct={product} allProducts={allProducts} />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-mid-gray font-sans">Product not found</p>
              <Link href="/products" className="mt-4 inline-block text-gold hover:underline font-sans text-sm">
                Browse all products
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}