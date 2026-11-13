import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import ProductDetailModal from './ProductDetailModal'

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()
  const [modalOpen, setModalOpen] = useState(false)
  const wishlisted = isWishlisted(product._id)

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    if (product.isAvailable !== false) {
      addItem(product)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => setModalOpen(true)}
        className="card overflow-hidden group cursor-pointer bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        {/* Image Container */}
        <div>
          <div className="relative overflow-hidden h-52 bg-stone-100 dark:bg-gray-800">
            <img
              src={product.image || `https://source.unsplash.com/400x300/?coffee,${product.category}`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80' }}
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isNew && <span className="badge bg-emerald-600 text-white shadow-xs">New Release</span>}
              {product.isBestSeller && <span className="badge bg-coffee-600 text-white shadow-xs">★ Best Seller</span>}
              {!product.isAvailable && <span className="badge bg-stone-600 text-white shadow-xs">Sold Out</span>}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => { e.stopPropagation(); toggle(product) }}
              className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black/70 transition-colors shadow-xs"
              title="Add to Wishlist"
            >
              <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'} />
            </button>

            {/* Quick View Pill on Hover */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="bg-white/90 text-coffee-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <Eye size={13}/> Customize & Details
              </span>
            </div>

            {/* Category Chip */}
            <div className="absolute bottom-3 left-3">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-cream-100 px-2.5 py-1 rounded-full">
                {product.category?.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5">
            <h3 className="font-display font-bold text-coffee-900 dark:text-cream-100 text-lg leading-tight mb-1 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={13} className={s <= Math.round(product.avgRating || 4.8) ? 'fill-current' : 'text-gray-200 dark:text-gray-700'} />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {(product.avgRating || 4.8).toFixed(1)}
              </span>
              <span className="text-[11px] text-gray-400">({product.reviewCount || 42})</span>
            </div>
          </div>
        </div>

        {/* Price & Add to Cart footer */}
        <div className="px-5 pb-5 pt-0 flex items-center justify-between">
          <span className="text-xl font-display font-bold text-coffee-700 dark:text-coffee-300">
            ₹{product.price?.toFixed(2)}
          </span>
          <button
            onClick={handleQuickAdd}
            disabled={product.isAvailable === false}
            className="flex items-center gap-1.5 bg-coffee-600 hover:bg-coffee-700 disabled:bg-stone-300 dark:disabled:bg-stone-800 text-white px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:shadow-md active:scale-95"
          >
            <ShoppingCart size={13}/> Add
          </button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
