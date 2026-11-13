import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, Coffee } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await api.post('/newsletter/subscribe', { email })
      toast.success('Subscribed successfully! ☕')
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Already subscribed or error occurred')
    } finally { setLoading(false) }
  }

  return (
    <footer className="bg-coffee-950 text-cream-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <div>
                <div className="font-display text-xl font-bold text-cream-100">Brew & Bloom</div>
                <div className="text-[10px] text-coffee-400 tracking-widest uppercase">Café</div>
              </div>
            </div>
            <p className="text-coffee-300 text-sm leading-relaxed mb-5">
              Where every cup tells a story. Handcrafted with love, served with warmth since 2015.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 rounded-full bg-coffee-800 hover:bg-coffee-600 flex items-center justify-center transition-colors duration-300">
                  <Icon size={16}/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-cream-100 mb-5 text-lg">Explore</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/menu', 'Our Menu'], ['/about', 'Our Story'], ['/reservation', 'Book a Table'], ['/contact', 'Contact']].map(([path, label]) => (
                <li key={path}><Link to={path} className="text-coffee-300 hover:text-cream-100 text-sm transition-colors duration-200">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-cream-100 mb-5 text-lg">Visit Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-coffee-300 text-sm"><MapPin size={16} className="mt-0.5 shrink-0 text-coffee-400"/>123 Bloom Street, Café Quarter, Mumbai 400001</li>
              <li className="flex items-center gap-2 text-coffee-300 text-sm"><Phone size={16} className="text-coffee-400"/>+91 98765 43210</li>
              <li className="flex items-center gap-2 text-coffee-300 text-sm"><Mail size={16} className="text-coffee-400"/>hello@brewandbloom.in</li>
            </ul>
            <div className="mt-4 text-sm text-coffee-300">
              <p className="font-medium text-cream-200 mb-1">Opening Hours</p>
              <p>Mon – Fri: 7:00 AM – 10:00 PM</p>
              <p>Sat – Sun: 8:00 AM – 11:00 PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-cream-100 mb-5 text-lg">Stay Updated</h4>
            <p className="text-coffee-300 text-sm mb-4">Get exclusive offers, new arrivals & brewing tips delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-coffee-900 border border-coffee-700 text-cream-100 placeholder-coffee-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-coffee-500 transition-colors"
              />
              <button type="submit" disabled={loading}
                className="bg-coffee-600 hover:bg-coffee-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                {loading ? 'Subscribing...' : 'Subscribe ☕'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-coffee-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-coffee-500 text-sm">© 2025 Brew & Bloom Café. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-coffee-500 hover:text-coffee-300 text-sm transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
