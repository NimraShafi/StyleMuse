import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Size Guide | StyleMuse',
  description: 'Find your perfect fit with our comprehensive size guide for clothing, shoes, and accessories.',
}

const clothingSizes = [
  { size: 'XS', bust: '31-32"', waist: '24-25"', hips: '34-35"', eu: '34' },
  { size: 'S', bust: '33-34"', waist: '26-27"', hips: '36-37"', eu: '36' },
  { size: 'M', bust: '35-36"', waist: '28-29"', hips: '38-39"', eu: '38' },
  { size: 'L', bust: '37-39"', waist: '30-32"', hips: '40-42"', eu: '40' },
  { size: 'XL', bust: '40-42"', waist: '33-35"', hips: '43-45"', eu: '42' },
]

const shoeSizes = [
  { us: '5', eu: '35', uk: '2.5', cm: '22' },
  { us: '6', eu: '36', uk: '3.5', cm: '23' },
  { us: '7', eu: '37', uk: '4.5', cm: '23.5' },
  { us: '8', eu: '38', uk: '5.5', cm: '24' },
  { us: '9', eu: '39', uk: '6.5', cm: '25' },
  { us: '10', eu: '40', uk: '7.5', cm: '26' },
  { us: '11', eu: '41', uk: '8.5', cm: '26.5' },
]

export default function SizeGuidePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Fit & Sizing</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">Size Guide</h1>
            <p className="font-sans text-mid-gray max-w-lg mx-auto">
              Find your perfect fit with our comprehensive sizing information.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          {/* How to Measure */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">How to Measure</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-3">Bust</h3>
                <p className="font-sans text-mid-gray text-sm leading-relaxed">
                  Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-3">Waist</h3>
                <p className="font-sans text-mid-gray text-sm leading-relaxed">
                  Measure around your natural waistline, the narrowest part of your torso.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-gold mb-3">Hips</h3>
                <p className="font-sans text-mid-gray text-sm leading-relaxed">
                  Measure around the fullest part of your hips, approximately 8 inches below your waist.
                </p>
              </div>
            </div>
          </section>

          {/* Clothing Sizes */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Clothing Sizes</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">Size</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">Bust</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">Waist</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">Hips</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">EU</th>
                  </tr>
                </thead>
                <tbody>
                  {clothingSizes.map((row) => (
                    <tr key={row.size} className="border-b border-border">
                      <td className="py-4 px-4 font-sans text-dark-gray font-medium">{row.size}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.bust}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.waist}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.hips}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Shoe Sizes */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Shoe Sizes</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">US</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">EU</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">UK</th>
                    <th className="py-4 px-4 text-left font-sans text-xs tracking-[0.15em] uppercase text-dark-gray">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {shoeSizes.map((row) => (
                    <tr key={row.us} className="border-b border-border">
                      <td className="py-4 px-4 font-sans text-dark-gray font-medium">{row.us}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.eu}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.uk}</td>
                      <td className="py-4 px-4 font-sans text-mid-gray text-sm">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Fit Tips */}
          <section className="mb-16 bg-secondary p-8">
            <h2 className="font-serif text-xl text-dark-gray mb-4">Fit Tips</h2>
            <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-3">
              <li>If you&apos;re between sizes, we generally recommend sizing up for a more comfortable fit.</li>
              <li>For a more relaxed fit, choose one size larger than your measurements suggest.</li>
              <li>Different designers may have slight variations in sizing - check individual product descriptions for specific sizing notes.</li>
              <li>When in doubt, our customer service team is happy to provide personalized sizing recommendations.</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="font-sans text-mid-gray mb-6">Need help finding your size?</p>
            <Link
              href="/contact"
              className="inline-block bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors"
            >
              Contact Our Stylists
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
