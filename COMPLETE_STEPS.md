# StyleMuse Club - Complete Steps After Database Setup

## ✅ Stage 1 DONE! (Database Table Bana Chuka)

Ab ye steps follow karo:

---

## 📋 NEXT STEPS - Ek Ke Baad Ek Karo

### **STEP 2: Get API Keys (Resend Se)**

```
1. Jao: https://resend.com
2. Click: "Sign Up" (FREE!)
3. Email verify karo (inbox check)
4. Dashboard mein jao
5. Left sidebar → API Keys
6. Copy karo ye key: "re_xxxxxxxxxxxxx"
7. Kahin note kar lo (important!)
```

---

### **STEP 3: Add Keys To .env.local**

```
1. Project folder mein .env.local file kholo
   (Agar nahi hai to banao)

2. Ye 5 lines add karo:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@stylemuse.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

3. Apni values dari:
   - Supabase URL: Supabase Dashboard → Settings → API
   - Supabase Key: Same place
   - Resend Key: Jo copy kiya
   - Email: noreply@stylemuse.com (same)
   - Site URL: localhost:3000 (development mein)

4. File save karo (Ctrl+S)
```

---

### **STEP 4: API Endpoints Banao**

#### **A. Newsletter Subscribe Endpoint**

```
Create file: app/api/newsletter/route.ts

Content (copy-paste karo):

===========================================

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const { data: existingSubscriber } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existingSubscriber?.status === "active") {
      return NextResponse.json(
        { error: "Already subscribed!" },
        { status: 400 }
      );
    }

    if (!existingSubscriber) {
      await supabase
        .from("subscribers")
        .insert([{ email, status: "active" }]);
    }

    try {
      await resend.emails.send({
        from: "noreply@resend.dev",
        to: email,
        subject: "Welcome to StyleMuse Club!",
        html: `
          <html>
            <body style="font-family: Arial; background: #1a1a1a; color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px; background: #1a1a1a; border: 1px solid #c9a96e;">
                <h1 style="color: #c9a96e; text-align: center;">STYLEMUSE CLUB</h1>
                <p style="text-align: center; color: #999;">EXCLUSIVE ACCESS</p>
                
                <p>Welcome to StyleMuse Club!</p>
                
                <p>You now have access to:</p>
                <ul>
                  <li>48-hour early access to new collections</li>
                  <li>Exclusive member-only discounts</li>
                  <li>VIP styling tips</li>
                  <li>First dibs on limited editions</li>
                </ul>
                
                <p style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000/products" style="background: #c9a96e; color: #1a1a1a; padding: 12px 30px; text-decoration: none; font-weight: bold;">
                    Explore Collections
                  </a>
                </p>
                
                <p style="text-align: center; color: #999; font-size: 12px;">
                  StyleMuse | Curated Style. Exclusive Access.
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Welcome to StyleMuse Club!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

===========================================
```

#### **B. Unsubscribe Endpoint**

```
Create file: app/api/newsletter/unsubscribe/route.ts

Content (copy-paste):

===========================================

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    await supabase
      .from("subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
      })
      .eq("email", email);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}

===========================================
```

---

### **STEP 5: Update Newsletter Component**

```
File: components/newsletter.tsx

Replace EVERYTHING with:

===========================================

'use client'

import { useRef, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

export default function Newsletter() {
  const { ref, visible } = useIntersectionObserver()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error')
        setLoading(false)
        return
      }

      setSubmitted(true)
      setEmail('')
      setLoading(false)
    } catch (err) {
      setError('Failed to subscribe')
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 bg-brand-black">
      <div
        ref={ref}
        className="max-w-2xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <p className="text-gold text-[11px] tracking-[0.4em] uppercase font-sans mb-4">
          Exclusive Access
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-off-white font-semibold mb-4">
          Join StyleMuse Club
        </h2>
        <p className="font-sans text-off-white/60 text-sm leading-relaxed mb-10">
          Subscribe for early access to new collections and exclusive offers.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border border-gold flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10l4.5 4.5 7.5-8"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-serif text-xl text-off-white">Welcome!</p>
            <p className="font-sans text-sm text-mid-gray">Check your email for exclusive offers.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 bg-transparent border border-off-white/20 text-off-white px-5 py-4 outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gold text-brand-black px-8 py-4 hover:bg-off-white transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {loading ? '...' : 'Subscribe'} <ArrowRight size={14} />
              </button>
            </form>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </>
        )}

        <p className="font-sans text-[11px] text-mid-gray mt-6">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

===========================================
```

---

### **STEP 6: Test Karo**

```
1. Terminal mein: npm run dev

2. Browser mein: http://localhost:3000

3. Scroll to bottom → Newsletter form dekho

4. Email daalo → Subscribe karo

5. Email check karo → Welcome email aaye?

6. Supabase mein dekho → Email save hue?

All 3 check mark? ✓ PERFECT!
```

---

## 🎯 FINAL CHECKLIST

```
✅ Stage 1: Database table create
   └─ SQL run kiya Supabase mein

✅ Stage 2: Got Resend API key
   └─ API key note kiya

✅ Stage 3: Added keys to .env.local
   └─ 5 lines add kiye

✅ Stage 4A: Created newsletter API
   └─ app/api/newsletter/route.ts

✅ Stage 4B: Created unsubscribe API
   └─ app/api/newsletter/unsubscribe/route.ts

✅ Stage 5: Updated Newsletter component
   └─ components/newsletter.tsx

✅ Stage 6: Testing
   └─ npm run dev
   └─ Form working?
   └─ Email aaye?
   └─ Database save?
```

---

## 🚀 AB KYA KARE?

### After Testing:

```
1. Offer email bhejne hain → EMAIL_MANAGEMENT_GUIDE.md dekho
2. Stats dekne hain → Supabase dashboard mein
3. Subscribers badane hain → Email campaigns chalao
4. Analytics track karne hain → Database queries likho
```

---

## ⏱️ TOTAL TIME

```
Database: 5 min (SQL run)
API Keys: 10 min (Resend signup)
Environment: 5 min (add to .env.local)
API Endpoints: 15 min (c/p code)
Component: 5 min (replace code)
Testing: 5 min (form test)
───────────────────
TOTAL: 45 MINUTES! ✅
```

---

## 🆘 AGE ERROR AAAYE

```
Error: "Cannot find module..."
Fix: npm install resend (agar nahi hai)

Error: "Supabase not writable"
Fix: Check .env.local values sahi hain?

Error: "Email not received"
Fix: Check spam folder, wait 5 min

Error: "Email not saved"
Fix: Supabase mein table check, RLS policies?
```

---

**🎉 BAS! Yeh sab karte ho to system ready ho jayega!**

Koi doubt ho to pooch lena! 👍
