import { motion } from 'framer-motion'
export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && <span className="text-coffee-500 uppercase tracking-widest text-sm font-semibold">{eyebrow}</span>}
      <h2 className="section-title mt-2">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </motion.div>
  )
}
