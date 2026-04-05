'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is available at checkout. International orders typically arrive within 7-14 business days depending on the destination.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer complimentary standard shipping on all orders over $200. For orders under $200, a flat rate of $15 applies.',
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely. Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination and are calculated at checkout.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy for all unworn items in their original condition with tags attached. Sale items are final sale unless otherwise noted.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'To start a return, log into your account and select the item you wish to return, or contact our customer service team. We\'ll provide you with a prepaid shipping label.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive your return, please allow 5-7 business days for inspection and processing. Refunds are issued to your original payment method.',
      },
      {
        q: 'Can I exchange an item for a different size?',
        a: 'Yes! For size exchanges, please contact our customer service team. We\'ll arrange the exchange and ensure you receive your new size as quickly as possible.',
      },
    ],
  },
  {
    category: 'Products & Sizing',
    questions: [
      {
        q: 'How do I find my size?',
        a: 'Each product page includes a detailed size guide with measurements. If you\'re between sizes, we generally recommend sizing up for a more comfortable fit.',
      },
      {
        q: 'Are your products authentic?',
        a: 'Absolutely. We guarantee 100% authenticity on every item. We work directly with designers and authorized distributors, and each piece undergoes rigorous authentication.',
      },
      {
        q: 'How should I care for my items?',
        a: 'Care instructions are included on each product page and on the item\'s care label. For delicate pieces, we recommend professional dry cleaning.',
      },
    ],
  },
  {
    category: 'Account & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Shop Pay. We also offer Afterpay for eligible orders.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes. We use industry-standard 256-bit SSL encryption to protect your payment information. We never store your full credit card details on our servers.',
      },
      {
        q: 'Do I need an account to make a purchase?',
        a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and enjoy a faster checkout experience.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-sans text-dark-gray group-hover:text-gold transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-mid-gray flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '500px' : '0' }}
      >
        <p className="font-sans text-mid-gray text-sm leading-relaxed pb-5">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Help Center</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-mid-gray max-w-lg mx-auto">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
          {faqs.map((section) => (
            <div key={section.category} className="mb-12">
              <h2 className="font-serif text-2xl text-dark-gray mb-6">{section.category}</h2>
              <div className="border-t border-border">
                {section.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}

          {/* Still have questions? */}
          <div className="mt-16 text-center py-12 bg-secondary">
            <h2 className="font-serif text-xl text-dark-gray mb-3">Still have questions?</h2>
            <p className="font-sans text-mid-gray mb-6">Our customer service team is here to help.</p>
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
