import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../shared/ProductCard'
import SkeletonCard from '../shared/SkeletonCard'
import SectionHeader from '../shared/SectionHeader'

const FALLBACK_PRODUCTS = [
  { _id: '1', name: 'Signature Cold Brew', category: 'cold-coffee', price: 320, description: 'Slow-steeped 24 hours for a smooth, chocolatey finish.', isAvailable: true, isBestSeller: true, avgRating: 4.9, reviewCount: 128, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  { _id: '2', name: 'Vanilla Latte', category: 'hot-coffee', price: 280, description: 'Velvety espresso meets house-made vanilla syrup.', isAvailable: true, isBestSeller: true, avgRating: 4.8, reviewCount: 95, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80' },
  { _id: '3', name: 'Blueberry Cheesecake', category: 'desserts', price: 380, description: 'Rich NY-style cheesecake with fresh blueberry compote.', isAvailable: true, avgRating: 4.9, reviewCount: 74, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80' },
  { _id: '4', name: 'Caramel Frappe', category: 'frappes', price: 350, description: 'Blended espresso, milk, ice & rich caramel drizzle.', isAvailable: true, isBestSeller: true, avgRating: 4.7, reviewCount: 112, image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80' },
  { _id: '5', name: 'Almond Croissant', category: 'bakery', price: 180, description: 'Buttery, flaky, filled with frangipane almond cream.', isAvailable: true, avgRating: 4.8, reviewCount: 67, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { _id: '6', name: 'Matcha Latte', category: 'tea', price: 260, description: 'Ceremonial-grade matcha whisked into silky oat milk.', isAvailable: true, isNew: true, avgRating: 4.6, reviewCount: 43, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80' },
]

export default function FeaturedSection() {
  const { data, isLoading } = useProducts({ isBestSeller: true, limit: 6 })
  const products = data?.products?.length ? data.products : FALLBACK_PRODUCTS

  return (
    <section className="py-24 bg-cream-50 dark:bg-gray-950">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Most Loved"
          title="Our Best Sellers"
          subtitle="Handpicked favourites that keep our guests coming back — crafted with the finest ingredients."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))
          }
        </div>
        <div className="text-center">
          <Link to="/menu" className="btn-secondary">View Full Menu →</Link>
        </div>
      </div>
    </section>
  )
}
