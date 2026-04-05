import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ProductGrid from '@/components/product-grid'
import Categories from '@/components/categories'
import FeaturedCollection from '@/components/featured-collection'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
      
        <FeaturedCollection />
          <Categories />
        {/* <Testimonials /> */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
