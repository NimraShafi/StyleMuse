import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Our Story | StyleMuse',
  description: 'Discover the story behind StyleMuse — a curated destination for timeless luxury fashion.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-80 md:h-96 bg-secondary overflow-hidden">
          <Image
            src="/images/featured-collection.jpg"
            alt="StyleMuse Story"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">About Us</p>
            <h1 className="font-serif text-4xl md:text-5xl text-off-white font-semibold">Our Story</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          {/* Mission */}
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-dark-gray mb-6">A Curated Vision</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <p className="font-sans text-mid-gray leading-relaxed mb-6">
              StyleMuse was born from a simple belief: that fashion should be an extension of who you are. We are not just a store — we are a carefully curated destination for those who understand that true style transcends trends.
            </p>
            <p className="font-sans text-mid-gray leading-relaxed mb-6">
              Our journey began in 2020, when our founders — seasoned fashion editors and luxury retail veterans — recognized a gap in the market. They envisioned a space where discerning individuals could discover exceptional pieces without the overwhelming noise of mass retail.
            </p>
            <p className="font-sans text-mid-gray leading-relaxed">
              Every item in our collection is handpicked by our team of style experts who travel the globe seeking out the finest craftsmanship, the most innovative designs, and the most enduring quality. We partner directly with artisans, designers, and heritage houses to bring you pieces that tell a story.
            </p>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-dark-gray mb-6">Our Values</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { title: 'Quality Over Quantity', desc: 'We believe in investing in fewer, better things. Each piece in our collection meets rigorous standards for materials, construction, and design.' },
                { title: 'Timeless Design', desc: 'We favor enduring elegance over fleeting trends. Our curation focuses on pieces that will remain relevant and cherished for years to come.' },
                { title: 'Ethical Sourcing', desc: 'We work only with partners who share our commitment to responsible practices, fair labor, and environmental consciousness.' },
                { title: 'Personal Service', desc: 'Our dedicated style advisors are here to help you find pieces that truly resonate with your individual aesthetic and lifestyle.' },
              ].map((value) => (
                <div key={value.title}>
                  <h3 className="font-serif text-xl text-dark-gray mb-3">{value.title}</h3>
                  <p className="font-sans text-mid-gray text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-dark-gray mb-6">The Team</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <p className="font-sans text-mid-gray leading-relaxed mb-8">
              Behind StyleMuse is a passionate team of fashion lovers, trend forecasters, and customer experience specialists. From our buyers who travel to Paris, Milan, and Tokyo seeking the next great discovery, to our stylists who provide personalized recommendations — every team member is dedicated to elevating your experience.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-12 bg-secondary -mx-6 px-6 lg:-mx-12 lg:px-12">
            <h2 className="font-serif text-2xl text-dark-gray mb-4">Begin Your StyleMuse Journey</h2>
            <p className="font-sans text-mid-gray mb-8 max-w-md mx-auto">Explore our curated collections and discover pieces that speak to your unique sense of style.</p>
            <Link
              href="/products"
              className="inline-block bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors"
            >
              Shop Now
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
