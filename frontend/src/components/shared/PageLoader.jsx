import { motion } from 'framer-motion'
export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-cream-50 dark:bg-gray-950 flex flex-col items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="text-5xl mb-6"
      >☕</motion.div>
      <motion.div
        initial={{ width: 0 }} animate={{ width: '160px' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-1 bg-gradient-to-r from-coffee-400 to-coffee-700 rounded-full"
      />
      <p className="mt-4 text-coffee-500 text-sm font-medium tracking-wider">Brewing something nice…</p>
    </div>
  )
}
