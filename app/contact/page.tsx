'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check, ChevronDown } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit form')
      }

      setSubmitted(true)
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your message. Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Get In Touch</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">Contact Us</h1>
            <p className="font-sans text-mid-gray max-w-lg mx-auto">
              We&apos;d love to hear from you. Whether you have a question, feedback, or just want to say hello, our team is here to help.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl text-dark-gray mb-8">Contact Information</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-1">Email</p>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@stylemuse.com'}`} className="font-sans text-mid-gray hover:text-gold transition-colors">
                      nimrashafi707@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-1">Phone</p>
                    <a href="tel:+1234567890" className="font-sans text-mid-gray hover:text-gold transition-colors">
                      0313-0128944
                    </a>
                  </div>
                </div>

                {/* <div className="flex gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-1">Address</p>
                    <p className="font-sans text-mid-gray">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-1">Hours</p>
                    <p className="font-sans text-mid-gray text-sm">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 4:00 PM<br />
                      Sun: Closed
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-dark-gray mb-8">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-secondary p-12 text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-dark-gray mb-3">Thank You!</h3>
                  <p className="font-sans text-mid-gray">
                    Your message has been received. We&apos;ll get back to you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-2 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-dark-gray focus:border-gold focus:outline-none transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-dark-gray focus:border-gold focus:outline-none transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-2 block">
                      Subject
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-dark-gray focus:border-gold focus:outline-none transition-colors flex items-center justify-between"
                      >
                        <span className={formState.subject ? 'text-dark-gray' : 'text-mid-gray'}>
                          {formState.subject || 'Select a topic'}
                        </span>
                        <ChevronDown size={16} className={`text-mid-gray transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-off-white border border-border shadow-lg z-10">
                          {[
                            { value: 'order', label: 'Order Inquiry' },
                            { value: 'product', label: 'Product Question' },
                            { value: 'returns', label: 'Returns & Exchanges' },
                            { value: 'styling', label: 'Personal Styling' },
                            { value: 'other', label: 'Other' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFormState(s => ({ ...s, subject: option.value }))
                                setDropdownOpen(false)
                              }}
                              className="w-full px-4 py-3 text-left font-sans text-dark-gray hover:bg-secondary hover:text-gold transition-colors first:rounded-t-sm last:rounded-b-sm"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-dark-gray mb-2 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full border border-border bg-transparent px-4 py-3 font-sans text-dark-gray focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : (
                      <>
                        Send Message
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
