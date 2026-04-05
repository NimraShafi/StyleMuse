import { Truck, RefreshCw, Package, Globe, Clock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Shipping & Returns | StyleMuse',
  description: 'Learn about StyleMuse shipping options, delivery times, and our hassle-free return policy.',
}

export default function ShippingReturnsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Customer Service</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">
              Shipping & Returns
            </h1>
            <p className="font-sans text-mid-gray max-w-lg mx-auto">
              We want you to love your purchase. Here&apos;s everything you need to know about shipping and our return policy.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          {/* Shipping Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <Truck size={24} className="text-gold" />
              <h2 className="font-serif text-3xl text-dark-gray">Shipping Information</h2>
            </div>
            <div className="w-10 h-px bg-gold mb-8" />

            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="bg-secondary p-8">
                <Package size={20} className="text-gold mb-4" />
                <h3 className="font-serif text-lg text-dark-gray mb-3">Standard Shipping</h3>
                <p className="font-sans text-mid-gray text-sm mb-4">5-7 business days</p>
                <ul className="font-sans text-sm text-mid-gray space-y-2">
                  <li>Free on orders over $200</li>
                  <li>$15 flat rate for orders under $200</li>
                  <li>Tracking included</li>
                </ul>
              </div>

              <div className="bg-secondary p-8">
                <Clock size={20} className="text-gold mb-4" />
                <h3 className="font-serif text-lg text-dark-gray mb-3">Express Shipping</h3>
                <p className="font-sans text-mid-gray text-sm mb-4">2-3 business days</p>
                <ul className="font-sans text-sm text-mid-gray space-y-2">
                  <li>$25 flat rate</li>
                  <li>Priority handling</li>
                  <li>Signature required</li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary p-8 mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-gold" />
                <h3 className="font-serif text-lg text-dark-gray">International Shipping</h3>
              </div>
              <p className="font-sans text-mid-gray text-sm leading-relaxed mb-4">
                We ship to over 50 countries worldwide. International shipping rates are calculated at checkout based on destination and order weight. Delivery typically takes 7-14 business days.
              </p>
              <p className="font-sans text-mid-gray text-sm leading-relaxed">
                Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
              </p>
            </div>

            <h3 className="font-serif text-xl text-dark-gray mb-4">Shipping Policies</h3>
            <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-3">
              <li>Orders placed before 2:00 PM EST on business days will ship the same day.</li>
              <li>Orders placed after 2:00 PM EST or on weekends/holidays will ship the next business day.</li>
              <li>You will receive a shipping confirmation email with tracking information once your order ships.</li>
              <li>We are not responsible for delays caused by carriers or customs.</li>
            </ul>
          </section>

          {/* Returns Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw size={24} className="text-gold" />
              <h2 className="font-serif text-3xl text-dark-gray">Return Policy</h2>
            </div>
            <div className="w-10 h-px bg-gold mb-8" />

            <div className="bg-brand-black text-off-white p-8 mb-10">
              <h3 className="font-serif text-xl mb-4">30-Day Return Window</h3>
              <p className="font-sans text-off-white/70 text-sm leading-relaxed">
                We want you to be completely satisfied with your purchase. If you&apos;re not, you may return unworn items in their original condition within 30 days of delivery for a full refund.
              </p>
            </div>

            <h3 className="font-serif text-xl text-dark-gray mb-4">Return Conditions</h3>
            <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-3 mb-10">
              <li>Items must be unworn, unwashed, and in their original condition.</li>
              <li>All tags must be attached.</li>
              <li>Items must be returned in their original packaging.</li>
              <li>Sale items marked as &quot;Final Sale&quot; are not eligible for returns.</li>
              <li>Jewelry, intimates, and swimwear are final sale for hygiene reasons.</li>
            </ul>

            <h3 className="font-serif text-xl text-dark-gray mb-4">How to Return</h3>
            <ol className="font-sans text-mid-gray text-sm leading-relaxed space-y-3 mb-10 list-decimal list-inside">
              <li>Log into your account and navigate to your order history.</li>
              <li>Select the item(s) you wish to return and the reason for return.</li>
              <li>Print the prepaid return label (US orders only).</li>
              <li>Pack items securely and affix the return label.</li>
              <li>Drop off at any authorized shipping location.</li>
            </ol>

            <h3 className="font-serif text-xl text-dark-gray mb-4">Refunds</h3>
            <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-3">
              <li>Refunds are processed within 5-7 business days of receiving your return.</li>
              <li>Refunds are issued to your original payment method.</li>
              <li>Original shipping costs are non-refundable unless the return is due to our error.</li>
            </ul>
          </section>

          {/* Exchanges */}
          <section className="mb-20">
            <h2 className="font-serif text-3xl text-dark-gray mb-6">Exchanges</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <p className="font-sans text-mid-gray text-sm leading-relaxed mb-6">
              Need a different size or color? We&apos;re happy to help with exchanges. Please contact our customer service team to arrange an exchange. For the fastest service, we recommend placing a new order for the desired item and returning the original for a refund.
            </p>
          </section>

          {/* Damaged Items */}
          <section className="mb-16 bg-secondary p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={20} className="text-gold" />
              <h3 className="font-serif text-xl text-dark-gray">Damaged or Defective Items</h3>
            </div>
            <p className="font-sans text-mid-gray text-sm leading-relaxed">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage. We&apos;ll arrange a free return and send a replacement or issue a full refund, including original shipping costs.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="font-sans text-mid-gray mb-6">Have questions about shipping or returns?</p>
            <Link
              href="/contact"
              className="inline-block bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
