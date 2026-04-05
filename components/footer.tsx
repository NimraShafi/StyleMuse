import Link from 'next/link'

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', href: '/products' },
    { label: 'Dresses', href: '/category/dresses' },
    { label: 'Bags', href: '/category/bags' },
    { label: 'Jewelry', href: '/category/jewelry' },
    { label: 'Accessories', href: '/category/accessories' },
    // { label: 'Sale', href: '/sale' },
  ],
  Company: [
    { label: 'Our Story', href: '/about' },
    // { label: 'Sustainability', href: '/sustainability' },
    // { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/contact' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    // { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQs', href: '/faq' },
    // { label: 'Privacy Policy', href: '/privacy' },
  ],
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )},
  { label: 'Facebook', href: 'https://facebook.com', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )},
  { label: 'Pinterest', href: 'https://pinterest.com', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.136-1.867 3.136-4.563 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.325 0 .856.33 1.775.741 2.278a.3.3 0 0 1 .069.286c-.076.31-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
    </svg>
  )},
  // { label: 'TikTok', href: 'https://tiktok.com', icon: (
  //   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  //     <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  //   </svg>
  // )},
]

export default function Footer() {
  return (
    <footer className="bg-brand-black text-off-white/70 border-t border-off-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="block mb-5">
              <span className="font-serif text-2xl tracking-[0.15em] font-semibold text-off-white">
                STYLEMUSE
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-off-white/50 max-w-xs">
              A curated destination for those who believe fashion is a form of self-expression. Premium quality, timeless design.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-off-white/40 hover:text-gold transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-off-white mb-5">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-off-white/50 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        {/* <div className="flex flex-wrap items-center gap-6 py-8 border-y border-off-white/10 mb-8">
          {['Free shipping over $200', 'Easy 30-day returns', 'Secure payments', 'Authenticity guaranteed'].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gold rounded-full" />
              <span className="font-sans text-[11px] tracking-[0.1em] text-off-white/40 uppercase">{badge}</span>
            </div>
          ))}
        </div> */}

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-off-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} StyleMuse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="font-sans text-xs text-off-white/30 hover:text-gold transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-xs text-off-white/30 hover:text-gold transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/faq"
              className="font-sans text-xs text-off-white/30 hover:text-gold transition-colors"
            >
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
