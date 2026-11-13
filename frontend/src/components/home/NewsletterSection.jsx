import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await api.post('/newsletter/subscribe', { email })
      setSubscribed(true)
      toast.success("Welcome to the Brew & Bloom Society! ☕")
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Thank you for your interest!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-coffee-900 via-coffee-950 to-stone-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,122,40,0.15),transparent_70%)] pointer-events-none" />
      <div className="container-custom relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-cream-200 text-xs font-semibold uppercase tracking-wider mb-6 border border-white/15">
            <Mail size={14} className="text-coffee-300"/> Coffee Letters & Privileges
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-50 mb-4 leading-tight">
            Join the Brew & Bloom Society
          </h2>
          <p className="text-cream-200/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Receive invitation-only cupping sessions, seasonal harvest releases, and a 15% welcome voucher on your next visit.
          </p>

          {subscribed ? (
            <div className="bg-white/10 border border-coffee-400/30 rounded-2xl p-6 text-cream-100 flex items-center justify-center gap-3">
              <CheckCircle2 size={24} className="text-emerald-400"/>
              <span className="font-medium">You are on the guestlist! Check your inbox shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-cream-200/50 focus:outline-none focus:ring-2 focus:ring-coffee-400 text-sm backdrop-blur-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-4 px-8 text-sm whitespace-nowrap shadow-xl hover:shadow-coffee-500/20"
              >
                {loading ? 'Subscribing...' : 'Join Now ☕'}
              </button>
            </form>
          )}
          <p className="text-xs text-cream-200/50 mt-4">We respect your inbox. Unsubscribe with one click anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}

