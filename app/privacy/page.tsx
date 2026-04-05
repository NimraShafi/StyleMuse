import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy | StyleMuse',
  description: 'Learn how StyleMuse collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Legal</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">Privacy Policy</h1>
            <p className="font-sans text-mid-gray">Last updated: January 1, 2026</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Introduction</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                StyleMuse (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
              <p className="font-sans text-mid-gray leading-relaxed">
                Please read this privacy policy carefully. By using our website, you consent to the practices described herein.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Information We Collect</h2>
              <h3 className="font-serif text-lg text-dark-gray mb-3 mt-6">Personal Information</h3>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 mb-4 list-disc list-inside">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us with inquiries</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                This information may include your name, email address, mailing address, phone number, and payment information.
              </p>

              <h3 className="font-serif text-lg text-dark-gray mb-3 mt-6">Automatically Collected Information</h3>
              <p className="font-sans text-mid-gray leading-relaxed">
                When you visit our website, we automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">How We Use Your Information</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and customer experience</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Information Sharing</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Service providers who assist in our operations (payment processors, shipping carriers)</li>
                <li>Analytics providers to help us understand website usage</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Cookies and Tracking</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Data Security</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Your Rights</h2>
              <p className="font-sans text-mid-gray leading-relaxed mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="font-sans text-mid-gray text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-4">Contact Us</h2>
              <p className="font-sans text-mid-gray leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{' '}
                <a href="mailto:privacy@stylemuse.com" className="text-gold hover:underline">privacy@stylemuse.com</a>.
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
