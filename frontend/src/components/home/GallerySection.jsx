import { motion } from 'framer-motion'
import { Instagram, Heart } from 'lucide-react'

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80', caption: 'Morning Vibe in Bloom' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80', caption: 'Artisanal Chemex Pour' },
  { src: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&q=80', caption: 'Salted Caramel Frappe' },
  { src: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', caption: 'Velvet Vanilla Flat White' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80', caption: 'Golden Brioche Croissants' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80', caption: 'Our Cozy Corner Table' },
  { src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&q=80', caption: 'Precision Latte Art' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80', caption: 'Twilight Café Aura' },
]

export default function GallerySection() {
  return (
    <section className="py-24 bg-cream-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-coffee-500 uppercase tracking-widest text-sm font-semibold">Visual Moments</span>
          <h2 className="section-title mt-2">Captured at Brew & Bloom</h2>
          <p className="section-subtitle">
            Tag <span className="font-semibold text-coffee-600">@brewandbloom</span> on Instagram to be featured on our community wall.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-200 dark:bg-stone-800"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-xs font-medium text-cream-200 mb-1">{item.caption}</p>
                <div className="flex items-center gap-3 text-xs text-white/80">
                  <span className="flex items-center gap-1"><Heart size={13} className="text-red-400 fill-red-400"/> 240+</span>
                  <span className="flex items-center gap-1"><Instagram size={13}/> view</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

