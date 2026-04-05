import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Sustainability | StyleMuse',
  description: 'Learn about StyleMuse\'s commitment to sustainability and ethical fashion practices.',
}

export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-80 md:h-96 bg-secondary overflow-hidden">
          <Image
            src="/images/category-dresses.jpg"
            alt="Sustainability"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Our Commitment</p>
            <h1 className="font-serif text-4xl md:text-5xl text-off-white font-semibold">Sustainability</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <section className="mb-16">
            <h2 className="font-serif text-3xl text-dark-gray mb-6">Fashion with Purpose</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <p className="font-sans text-mid-gray leading-relaxed mb-6">
              At StyleMuse, we believe that luxury and sustainability are not mutually exclusive. We are committed to reducing our environmental impact while maintaining the exceptional quality our customers expect.
            </p>
            <p className="font-sans text-mid-gray leading-relaxed">
              Our approach to sustainability encompasses every aspect of our business, from the partners we choose to the materials we prioritize and the practices we implement.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Our Pillars</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: 'Ethical Sourcing',
                  desc: 'We partner only with suppliers who share our commitment to fair labor practices and safe working conditions. Every piece in our collection is traceable to its source.',
                },
                {
                  title: 'Quality Over Quantity',
                  desc: 'We curate timeless pieces designed to last, encouraging a mindful approach to consumption. Investing in fewer, better items reduces waste and environmental impact.',
                },
                {
                  title: 'Sustainable Materials',
                  desc: 'We prioritize natural, organic, and recycled materials. Our partners are increasingly adopting innovative fabrics that minimize environmental harm.',
                },
                {
                  title: 'Reduced Packaging',
                  desc: 'Our packaging is made from recycled and recyclable materials. We have eliminated single-use plastics and continuously seek ways to minimize waste.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-secondary p-8">
                  <h3 className="font-serif text-lg text-dark-gray mb-3">{item.title}</h3>
                  <p className="font-sans text-mid-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Our Goals</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <ul className="font-sans text-mid-gray leading-relaxed space-y-4">
              <li className="flex gap-4">
                <span className="text-gold font-serif text-xl">2026</span>
                <span>100% of our packaging will be plastic-free</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gold font-serif text-xl">2027</span>
                <span>50% of products from certified sustainable sources</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gold font-serif text-xl">2028</span>
                <span>Carbon-neutral operations across all facilities</span>
              </li>
              <li className="flex gap-4">
                <span className="text-gold font-serif text-xl">2030</span>
                <span>Full supply chain transparency and traceability</span>
              </li>
            </ul>
          </section>

          <section className="text-center py-12 bg-brand-black -mx-6 px-6 lg:-mx-12 lg:px-12">
            <h2 className="font-serif text-2xl text-off-white mb-4">Join Our Journey</h2>
            <p className="font-sans text-off-white/70 mb-8 max-w-md mx-auto">
              Together, we can make a difference. Choose quality, choose sustainability, choose StyleMuse.
            </p>
            <Link
              href="/products"
              className="inline-block bg-gold text-brand-black font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-off-white transition-colors"
            >
              Shop Sustainably
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
