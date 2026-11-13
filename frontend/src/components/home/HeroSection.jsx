import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, Coffee } from 'lucide-react'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Café interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <motion.div
        variants={container} initial="hidden" animate="visible"
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-12 bg-coffee-400"></div>
          <span className="text-coffee-400 uppercase tracking-widest text-sm font-semibold flex items-center gap-2">
            <Coffee size={14} /> Welcome to Brew &amp; Bloom
          </span>
          <div className="h-px w-12 bg-coffee-400"></div>
        </motion.div>

        <motion.h1 variants={item} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          Where Every Cup<br />
          <span className="text-coffee-400">Tells a Story</span>
        </motion.h1>

        <motion.p variants={item} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Handcrafted coffee, artisan pastries, and a warm atmosphere — all in one place.
          Come as you are, leave feeling inspired.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu" className="btn-primary text-base">
            ☕ Explore Our Menu
          </Link>
          <Link
            to="/menu"
            className="border-2 border-white text-white hover:bg-white hover:text-coffee-900 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-base"
          >
            🛒 Order Online
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <span>⭐ 4.9/5 Rating</span>
          <span>☕ 50+ Menu Items</span>
          <span>🏪 Est. 2015</span>
          <span>🚀 Fast Delivery</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  )
}
