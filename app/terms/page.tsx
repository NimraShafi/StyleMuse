import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Terms & Conditions | StyleMuse',
  description: 'Read the terms and conditions for using the StyleMuse website and services.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Legal</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">Terms & Conditions</h1>
            {/* <p className="font-sans text-mid-gray">Last updated: January 1, 2026</p> */}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Agreement to Terms</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                By accessing or using the StyleMuse website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Use of Website</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                You may use our website for lawful purposes only. You agree not to:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Use our website in any way that violates applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit any harmful code or malware</li>
                <li>Collect information about other users without consent</li>
                <li>Use automated systems to access our website without permission</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Products and Pricing</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                We strive to ensure that all product descriptions and prices are accurate. However, we reserve the right to:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Correct any errors in pricing or product information</li>
                <li>Cancel orders if pricing errors are discovered</li>
                <li>Limit quantities available for purchase</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
              <p className="font-sans text-mid-gray leading-relaxed mt-4">
                All prices are displayed in USD unless otherwise stated and do not include applicable taxes or shipping costs, which will be calculated at checkout.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Orders and Payment</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order. Your order is accepted when we send a shipping confirmation email.
              </p>
              <p className="font-sans text-mid-gray leading-relaxed">
                You agree to provide accurate and complete payment information. By submitting your payment, you authorize us to charge the provided payment method for the total amount of your order.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Intellectual Property</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                All content on our website, including text, images, logos, and graphics, is the property of StyleMuse or our licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">User Accounts</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Limitation of Liability</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                To the fullest extent permitted by law, StyleMuse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or products.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Indemnification</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                You agree to indemnify and hold harmless StyleMuse and its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our website or violation of these terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Changes to Terms</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our website after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Governing Law</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                These Terms and Conditions are governed by the laws of the State of New York, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Contact</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                For questions about these Terms and Conditions, please contact us at{' '}
                <a href="mailto:legal@stylemuse.com" className="text-gold hover:underline">legal@stylemuse.com</a>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
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
