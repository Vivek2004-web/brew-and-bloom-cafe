import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader'

const testimonials = [
  {
    name: 'Aarav Singhania',
    role: 'Specialty Coffee Connoisseur',
    text: 'The 24-hour slow drip cold brew at Brew & Bloom ruined all other coffees for me. It is silky, with notes of dried plum and dark chocolate. Unmatched craft!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
  },
  {
    name: 'Nisha Sundaram',
    role: 'Food & Lifestyle Critic',
    text: 'From the warm bespoke interior lighting to the flaky almond croissants baked fresh at 6 AM, Brew & Bloom is a masterclass in premium hospitality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80'
  },
  {
    name: 'Vikram Malhotra',
    role: 'Remote Creative Director',
    text: 'My sanctuary for deep work. The acoustics are calm, the flat whites are consistently sublime, and the staff greets you like cherished family.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-coffee-950 text-cream-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,122,40,0.12),transparent_50%)] pointer-events-none" />
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Guest Impressions"
          title="Loved by Coffee Lovers"
          subtitle="Discover what our patrons, critics, and regulars have to say about their Brew & Bloom experience."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-coffee-900/60 border border-coffee-800/80 rounded-3xl p-8 backdrop-blur-sm hover:border-coffee-600 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote size={28} className="text-coffee-400 mb-6 opacity-80"/>
                <p className="text-cream-200 leading-relaxed mb-6 text-sm italic">
                  "{t.text}"
                </p>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={15} className="fill-amber-400 text-amber-400"/>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-coffee-800/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-coffee-500/50"
                />
                <div>
                  <h4 className="font-display font-semibold text-cream-100 text-base">{t.name}</h4>
                  <p className="text-coffee-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

