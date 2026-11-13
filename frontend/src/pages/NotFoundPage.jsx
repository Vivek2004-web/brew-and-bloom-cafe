import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Coffee, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center py-20 px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
        <span className="text-8xl block mb-4">☕</span>
        <span className="text-coffee-600 dark:text-coffee-400 font-mono text-sm font-bold tracking-widest uppercase">
          404 Error • Page Not Found
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-coffee-900 dark:text-cream-100 mt-2 mb-4">
          Spilled Roast!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
          The page you are looking for has been moved, brewed away, or never existed in our roastery.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2 text-sm py-3 px-6">
            <Home size={16}/> Back to Homepage
          </Link>
          <Link to="/menu" className="btn-secondary inline-flex items-center justify-center gap-2 text-sm py-3 px-6">
            <Coffee size={16}/> View Our Menu
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

