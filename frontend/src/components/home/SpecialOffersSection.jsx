import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Tag, Clock, Gift, Sparkles } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader'

const offers = [
  {
    icon: Clock,
    label: 'Early Bird Special',
    title: 'Morning Bloom 20%',
    desc: 'Get 20% off all specialty hot coffee & fresh bakes ordered before 9:00 AM.',
    code: 'BLOOM20',
    gradient: 'from-amber-800 via-coffee-800 to-coffee-950',
    badge: 'Mon – Fri'
  },
  {
    icon: Gift,
    label: 'Signature Combo',
    title: 'Pour-Over & Tart',
    desc: 'Choice of single-origin pour-over paired with our artisanal fruit tart at ₹399.',
    code: 'PAIR399',
    gradient: 'from-coffee-700 via-coffee-900 to-gray-950',
    badge: 'All Day'
  },
  {
    icon: Sparkles,
    label: 'Golden Hour',
    title: 'Afternoon BOGO Frappe',
    desc: 'Buy one get one free on all cold brews, frappes, and iced specialties between 3 – 5 PM.',
    code: 'GOLDENBOGO',
    gradient: 'from-stone-800 via-coffee-900 to-stone-950',
    badge: 'Weekends'
  },
]

export default function SpecialOffersSection() {
  return (
    <section className="py-24 bg-cream-100/60 dark:bg-gray-950">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Special Promotions"
          title="Curated Seasonal Offers"
          subtitle="Treat yourself to artisan roasts and bakery delights with our limited-time café perks."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map(({ icon: Icon, label, title, desc, code, gradient, badge }, i) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white relative shadow-xl overflow-hidden border border-white/10`}
            >
              <div className="absolute top-5 right-5">
                <span className="bg-white/15 backdrop-blur-md text-cream-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  {badge}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                <Icon size={24} className="text-cream-200"/>
              </div>
              <span className="text-xs uppercase tracking-widest text-coffee-300 font-semibold mb-1 block">
                {label}
              </span>
              <h3 className="font-display text-2xl font-bold mb-3 text-cream-50">{title}</h3>
              <p className="text-cream-200/80 text-sm leading-relaxed mb-6">{desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-1.5">
                  <Tag size={13} className="text-coffee-300"/>
                  <span className="font-mono text-sm font-bold tracking-wider text-cream-100">{code}</span>
                </div>
                <Link to="/menu" className="text-cream-200 hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors">
                  Redeem →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

