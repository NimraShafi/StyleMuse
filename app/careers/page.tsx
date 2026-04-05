import Link from 'next/link'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Careers | StyleMuse',
  description: 'Join the StyleMuse team. Explore career opportunities in luxury fashion.',
}

const openings = [
  {
    title: 'Senior Fashion Buyer',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Lead our buying team in curating exceptional luxury fashion collections.',
  },
  {
    title: 'Digital Marketing Manager',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive our digital presence and customer acquisition strategies.',
  },
  {
    title: 'Customer Experience Specialist',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Deliver exceptional service to our discerning clientele.',
  },
  {
    title: 'Visual Merchandiser',
    location: 'New York, NY',
    type: 'Part-time',
    description: 'Create compelling visual stories that bring our brand to life.',
  },
]

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="bg-secondary py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-3">Join Us</p>
            <h1 className="font-serif text-4xl md:text-5xl text-dark-gray font-semibold mb-4">Careers at StyleMuse</h1>
            <p className="font-sans text-mid-gray max-w-lg mx-auto">
              Be part of a passionate team dedicated to redefining luxury fashion. We&apos;re always looking for talented individuals who share our vision.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          {/* Why Join Us */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Why StyleMuse?</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Growth', desc: 'Opportunities for professional development and career advancement.' },
                { title: 'Culture', desc: 'A collaborative, creative environment where your ideas matter.' },
                { title: 'Benefits', desc: 'Competitive compensation, employee discounts, and flexible schedules.' },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif text-lg text-dark-gray mb-2">{item.title}</h3>
                  <p className="font-sans text-mid-gray text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Current Openings */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-dark-gray mb-6">Current Openings</h2>
            <div className="w-10 h-px bg-gold mb-8" />
            <div className="flex flex-col gap-6">
              {openings.map((job) => (
                <div key={job.title} className="border border-border p-6 hover:border-gold transition-colors group">
                  <h3 className="font-serif text-lg text-dark-gray group-hover:text-gold transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1 font-sans text-xs text-mid-gray">
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-sans text-xs text-mid-gray">
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>
                  <p className="font-sans text-mid-gray text-sm mb-4">{job.description}</p>
                  <Link
                    href="/contact"
                    className="inline-block text-gold font-sans text-xs tracking-[0.15em] uppercase hover:underline"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Don't see your role? */}
          <section className="text-center py-12 bg-secondary">
            <Briefcase size={32} className="text-gold mx-auto mb-4" />
            <h2 className="font-serif text-xl text-dark-gray mb-3">Don&apos;t see your role?</h2>
            <p className="font-sans text-mid-gray mb-6 max-w-md mx-auto">
              We&apos;re always interested in meeting talented people. Send us your resume and tell us how you can contribute.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-black text-off-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold hover:text-brand-black transition-colors"
            >
              Get In Touch
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
