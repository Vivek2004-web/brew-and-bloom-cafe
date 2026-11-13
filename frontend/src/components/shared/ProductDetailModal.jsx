import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ShoppingCart, Heart, Check, Coffee, Sparkles, MessageSquare } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()
  const { isAuthenticated, user } = useAuthStore()

  const [selectedSize, setSelectedSize] = useState('Regular')
  const [selectedMilk, setSelectedMilk] = useState('Standard Whole Milk')
  const [selectedSweetness, setSelectedSweetness] = useState('Standard')
  const [extraShot, setExtraShot] = useState(false)
  const [activeTab, setActiveTab] = useState('customize') // 'customize' | 'reviews'

  // Review state
  const [userRating, setUserRating] = useState(5)
  const [userComment, setUserComment] = useState('')
  const [reviewsList, setReviewsList] = useState([
    { name: 'Kavita Iyer', rating: 5, date: '2 days ago', comment: 'Spectacular depth of flavor. The floral aroma is distinct and unforced.' },
    { name: 'Sameer Joshi', rating: 5, date: '1 week ago', comment: 'Consistently the highlight of my morning ritual. Highly recommended!' },
  ])

  if (!isOpen || !product) return null

  const sizePrice = selectedSize === 'Large' ? 50 : selectedSize === 'Small' ? -30 : 0
  const milkPrice = selectedMilk.includes('Oat') || selectedMilk.includes('Almond') ? 40 : 0
  const extraShotPrice = extraShot ? 45 : 0
  const computedPrice = Math.max(0, product.price + sizePrice + milkPrice + extraShotPrice)

  const handleAddToCart = () => {
    const customizedItem = {
      ...product,
      _id: `${product._id}_${selectedSize}_${extraShot ? 'shot' : ''}`,
      name: `${product.name} (${selectedSize})`,
      price: computedPrice,
      customizations: {
        size: selectedSize,
        milk: selectedMilk,
        sweetness: selectedSweetness,
        extraShot
      }
    }
    addItem(customizedItem)
    onClose()
  }

  const handlePostReview = (e) => {
    e.preventDefault()
    if (!userComment.trim()) return
    const newRev = {
      name: user?.name || 'Anonymous Patron',
      rating: userRating,
      date: 'Just now',
      comment: userComment
    }
    setReviewsList([newRev, ...reviewsList])
    setUserComment('')
    toast.success('Thank you for rating this harvest! ⭐')
  }

  const wishlisted = isWishlisted(product._id)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Top Header */}
        <div className="relative h-60 sm:h-72 shrink-0 overflow-hidden bg-stone-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={e => e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close & Wishlist */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={18}/>
          </button>
          <button
            onClick={() => toggle(product)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}/>
          </button>

          {/* Bottom Title Bar on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-coffee-600/90 backdrop-blur-md px-2.5 py-1 rounded-full inline-block mb-1">
              {product.category?.replace('-', ' ')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-cream-200">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-current"/>)}
              </div>
              <span>({reviewsList.length + (product.reviewCount || 10)} verified reviews)</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 bg-stone-50 dark:bg-gray-800/50 px-6 pt-3">
          <button
            onClick={() => setActiveTab('customize')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 mr-6 ${
              activeTab === 'customize'
                ? 'border-coffee-600 text-coffee-700 dark:text-coffee-300'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Artisan Customization
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'reviews'
                ? 'border-coffee-600 text-coffee-700 dark:text-coffee-300'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Ratings & Reviews ({reviewsList.length})
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>

          {activeTab === 'customize' ? (
            <div className="space-y-5">
              {/* Size */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Serving Size</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Small', extra: '−₹30' },
                    { label: 'Regular', extra: 'Standard' },
                    { label: 'Large', extra: '+₹50' }
                  ].map(sz => (
                    <button
                      key={sz.label}
                      type="button"
                      onClick={() => setSelectedSize(sz.label)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedSize === sz.label
                          ? 'border-coffee-600 bg-coffee-50 dark:bg-coffee-950/40 text-coffee-900 dark:text-cream-100 font-bold'
                          : 'border-stone-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{sz.label}</span>
                      <span className="text-[10px] text-gray-400">{sz.extra}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Choice (only if coffee or tea) */}
              {(product.category === 'hot-coffee' || product.category === 'cold-coffee' || product.category === 'tea' || product.category === 'frappes') && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Milk Option</label>
                  <select
                    value={selectedMilk}
                    onChange={e => setSelectedMilk(e.target.value)}
                    className="input-field text-sm cursor-pointer appearance-none"
                  >
                    <option value="Standard Whole Milk">Organic Farm Whole Milk (Standard)</option>
                    <option value="Oat Milk">Barista Silk Oat Milk (+₹40)</option>
                    <option value="Almond Milk">Roasted Californian Almond Milk (+₹40)</option>
                    <option value="Soy Milk">Non-GMO Light Soy Milk (+₹30)</option>
                  </select>
                </div>
              )}

              {/* Extra Shot checkbox */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream-50 dark:bg-gray-800/40 border border-cream-200 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                  <Coffee size={18} className="text-coffee-600"/>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-cream-100">Add Extra Ristretto Shot</p>
                    <p className="text-[11px] text-gray-400">Extra bold extraction for a rich boost</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setExtraShot(!extraShot)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    extraShot
                      ? 'bg-coffee-600 text-white'
                      : 'bg-stone-200 text-stone-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {extraShot ? 'Added (+₹45)' : '+₹45'}
                </button>
              </div>
            </div>
          ) : (
            /* Reviews Tab */
            <div className="space-y-5">
              {/* Write Review Form */}
              <form onSubmit={handlePostReview} className="p-4 rounded-2xl bg-stone-50 dark:bg-gray-800/50 border border-stone-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Your Experience</span>
                  <div className="flex gap-1 text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button type="button" key={star} onClick={() => setUserRating(star)}>
                        <Star size={16} className={star <= userRating ? 'fill-current' : 'text-gray-300'}/>
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={userComment}
                  onChange={e => setUserComment(e.target.value)}
                  placeholder="Share tasting impressions, aroma notes, pairing..."
                  rows={2}
                  className="input-field text-xs resize-none"
                />
                <button type="submit" className="btn-primary text-xs py-2 px-4 w-full">
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviewsList.map((rev, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900 dark:text-cream-100">{rev.name}</span>
                      <span className="text-gray-400 text-[10px]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 mb-1.5">
                      {[...Array(rev.rating)].map((_, s) => <Star key={s} size={11} className="fill-current"/>)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Price and Add to Basket */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-stone-50 dark:bg-gray-900 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 uppercase font-semibold block">Item Total</span>
            <span className="font-display text-2xl font-bold text-coffee-800 dark:text-cream-100">
              ₹{computedPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary py-3.5 px-8 text-sm font-semibold flex items-center gap-2 shadow-lg"
          >
            <ShoppingCart size={16}/> Add to Basket
          </button>
        </div>
      </motion.div>
    </div>
  )
}

