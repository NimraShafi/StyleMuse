'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart, Menu, X } from 'lucide-react'
import { useFavorites } from '@/lib/favorites-context'
import { searchProducts, getProducts, Product } from '@/lib/products'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/#categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  const { favorites, favoritesCount, removeFavorite } = useFavorites()

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])

  // Determine if we should use dark text (on pages other than home)
  const shouldUseDarkText = pathname !== '/' || scrolled

  useEffect(() => {
    const fetchFavorites = async () => {
      const allProducts = await getProducts()
      const favs = allProducts.filter(p => favorites.includes(p.id))
      setFavoriteProducts(favs)
    }
    fetchFavorites()
  }, [favorites])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        const results = await searchProducts(searchQuery)
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
    }
    performSearch()
  }, [searchQuery])

  const closeAll = () => {
    setSearchOpen(false)
    setWishlistOpen(false)
    setMobileOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || pathname !== '/'
            ? 'bg-off-white/95 backdrop-blur-sm shadow-sm border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span
                className={`font-serif text-2xl tracking-[0.15em] font-semibold transition-colors duration-300 ${
                  shouldUseDarkText ? 'text-brand-black' : 'text-off-white'
                }`}
              >
                STYLEMUSE
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs tracking-[0.15em] uppercase font-sans transition-colors duration-300 hover:text-gold ${
                    shouldUseDarkText ? 'text-dark-gray' : 'text-off-white/90'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icon Actions */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <button
                onClick={() => { closeAll(); setSearchOpen(true) }}
                aria-label="Search"
                className={`hidden md:block transition-colors duration-300 hover:text-gold ${
                  shouldUseDarkText ? 'text-dark-gray' : 'text-off-white'
                }`}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => { closeAll(); setWishlistOpen(true) }}
                aria-label="Wishlist"
                className={`hidden md:flex relative transition-colors duration-300 hover:text-gold ${
                  shouldUseDarkText ? 'text-dark-gray' : 'text-off-white'
                }`}
              >
                <Heart size={20} strokeWidth={1.5} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-brand-black text-[10px] font-sans flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden transition-colors duration-300 hover:text-gold ${
                  shouldUseDarkText ? 'text-dark-gray' : 'text-off-white'
                }`}
              >
                {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-black/95">
          <div className="max-w-3xl mx-auto px-6 pt-24">
            <button
              onClick={closeAll}
              className="absolute top-6 right-6 text-off-white hover:text-gold"
              aria-label="Close search"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className="relative">
              <Search size={20} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-mid-gray" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent border-b border-off-white/20 py-4 pl-10 pr-4 text-2xl text-off-white placeholder:text-mid-gray focus:outline-none focus:border-gold font-serif"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
                {searchResults.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={closeAll}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                    </div>
                    <h3 className="mt-3 font-serif text-off-white group-hover:text-gold transition-colors">{product.name}</h3>
                    <p className="text-mid-gray font-sans text-sm">{product.price}</p>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <p className="mt-8 text-mid-gray font-sans">No products found for &quot;{searchQuery}&quot;</p>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-off-white z-50 transform transition-transform duration-500 ease-in-out ${
          wishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-border">
          <h2 className="font-serif text-xl text-dark-gray">Wishlist ({favoritesCount})</h2>
          <button onClick={closeAll} className="text-dark-gray hover:text-gold" aria-label="Close wishlist">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={48} strokeWidth={1} className="mx-auto text-border mb-4" />
              <p className="text-mid-gray font-sans">Your wishlist is empty</p>
              <Link href="/products" onClick={closeAll} className="inline-block mt-4 text-gold text-sm hover:underline">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {favoriteProducts.map(product => (
                <div key={product.id} className="flex gap-4">
                  <Link href={`/product/${product.slug}`} onClick={closeAll} className="relative w-20 aspect-[3/4] flex-shrink-0 bg-secondary overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/product/${product.slug}`} onClick={closeAll} className="font-serif text-dark-gray hover:text-gold transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-mid-gray font-sans text-sm mt-1">{product.price}</p>
                    <button onClick={() => removeFavorite(product.id)} className="text-mid-gray hover:text-gold text-xs mt-2 flex items-center gap-1">
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay for drawers */}
      {wishlistOpen && (
        <div className="fixed inset-0 bg-brand-black/50 z-40" onClick={closeAll} />
      )}

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-off-white flex flex-col transition-transform duration-500 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-border">
          <span className="font-serif text-2xl tracking-[0.15em] font-semibold text-brand-black">
            STYLEMUSE
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-dark-gray hover:text-gold"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-8 pt-10 gap-8" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl text-dark-gray hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-8 px-8 mt-auto pb-12">
          <button aria-label="Search" onClick={() => { setMobileOpen(false); setSearchOpen(true) }} className="text-dark-gray hover:text-gold">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button aria-label="Wishlist" onClick={() => { setMobileOpen(false); setWishlistOpen(true) }} className="text-dark-gray hover:text-gold relative">
            <Heart size={22} strokeWidth={1.5} />
            {favoritesCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-brand-black text-[9px] font-sans flex items-center justify-center">{favoritesCount}</span>}
          </button>
        </div>
      </div>
    </>
  )
}
