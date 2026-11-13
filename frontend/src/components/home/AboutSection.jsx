import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Award, Clock } from 'lucide-react'

const features = [
  { icon: Leaf, title: 'Ethically Sourced', desc: 'Direct-trade beans from family-owned farms across Ethiopia, Colombia, and Chikmagalur.' },
  { icon: Award, title: 'Expert Baristas', desc: 'Every barista undergoes 200+ hours of craft brew training and latte art certification.' },
  { icon: Clock, title: 'Daily Fresh Roasts', desc: 'Small-batch roasted in-house daily to capture peak floral aromatics and chocolate notes.' },
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80"
              alt="Brew & Bloom Café ambiance"
              className="w-full h-72 object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80"
              alt="Master barista pouring latte art"
              className="w-full h-72 object-cover rounded-3xl shadow-lg mt-8 hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-4 text-center shadow-xl min-w-64 border border-coffee-100 dark:border-coffee-900/50">
            <p className="font-display text-3xl font-bold text-coffee-700 dark:text-coffee-300">10+ Years</p>
            <p className="text-xs text-coffee-600 dark:text-coffee-400 font-medium">of Brewing Excellence</p>
            <div className="mt-2 flex justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>☕ 50k+ Cups Served</span>
              <span>•</span>
              <span>⭐ 4.9 Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-6 lg:pt-0"
        >
          <span className="text-coffee-500 uppercase tracking-widest text-sm font-semibold">Our Story & Heritage</span>
          <h2 className="section-title mt-2 text-left">More Than Coffee,<br/><span className="text-coffee-600">A Ritual of Joy</span></h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-base">
            Born from an obsession with single-origin beans and artisanal slow-bakes, Brew & Bloom Café
            is where craftsmanship meets serene hospitality. We slow down the clock so you can savor
            every aromatic note, heartfelt conversation, and golden moment.
          </p>
          <div className="space-y-5 mb-10">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coffee-100 dark:bg-coffee-900/40 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={22} className="text-coffee-700 dark:text-coffee-300"/>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-lg mb-1">{title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2">
            Discover Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

