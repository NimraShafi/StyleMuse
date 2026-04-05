import Link from 'next/link'
import { getProducts } from '@/lib/products'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Image from 'next/image'

export const metadata = {
  title: 'Sale | StyleMuse',
  description: 'Shop exclusive deals on luxury fashion at StyleMuse. Limited time offers on premium pieces.',
}

export default async function SalePage() {
  const products = await getProducts()
  const saleProducts = products.slice(0, 6).map(p => ({
    ...p,
    salePrice: `$${Math.round(p.priceNum * 0.7)}`,
    discount: '30% OFF',
  }))
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-brand-black py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Limited Time</p>
            <h1 className="font-serif text-4xl md:text-5xl text-off-white font-semibold mb-4">Seasonal Sale</h1>
            <p className="font-sans text-off-white/70 max-w-lg mx-auto mb-6">
              Discover exceptional pieces at extraordinary prices. Up to 30% off select luxury items.
            </p>
            <div className="inline-block bg-gold text-brand-black font-sans text-xs tracking-[0.2em] uppercase px-6 py-2">
              Ends Soon
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {saleProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 bg-gold text-brand-black text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans">
                    {product.discount}
                  </span>
                </div>
                <div className="pt-4">
                  <h3 className="font-serif text-dark-gray group-hover:text-gold transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-sans text-gold">{product.salePrice}</span>
                    <span className="font-sans text-mid-gray text-sm line-through">{product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16 py-12 bg-secondary">
            <h2 className="font-serif text-xl text-dark-gray mb-3">Want More?</h2>
            <p className="font-sans text-mid-gray mb-6">Browse our full collection for more exceptional pieces.</p>
            <Link
              href="/products"
              className="inline-block bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
