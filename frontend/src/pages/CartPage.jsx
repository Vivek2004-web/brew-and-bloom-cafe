import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, Tag, X, ArrowRight, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, coupon, couponDiscount, applyCoupon, removeCoupon } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const subtotal = getSubtotal()
  const tax = subtotal * 0.05
  const total = getTotal()

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    try {
      const res = await api.post('/coupons/validate', { code: couponCode, orderTotal: subtotal })
      applyCoupon(res.data.coupon.code, res.data.discountAmount)
      toast.success(`Coupon applied! Saved ₹${res.data.discountAmount.toFixed(2)}`)
      setCouponCode('')
    } catch (err) {
      // Fallback local coupon check if backend is offline
      const upper = couponCode.trim().toUpperCase()
      if (upper === 'BLOOM20' || upper === 'EARLYBIRD') {
        const disc = subtotal * 0.20
        applyCoupon(upper, disc)
        toast.success(`Coupon applied! Saved ₹${disc.toFixed(2)}`)
        setCouponCode('')
      } else if (upper === 'PAIR399' || upper === 'COMBO399') {
        const disc = Math.min(subtotal * 0.15, 100)
        applyCoupon(upper, disc)
        toast.success(`Combo deal applied! Saved ₹${disc.toFixed(2)}`)
        setCouponCode('')
      } else {
        toast.error(err.response?.data?.message || 'Invalid coupon code')
      }
    } finally {
      setCouponLoading(false)
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast('Please sign in to complete checkout', { icon: '☕' })
      navigate('/login', { state: { from: { pathname: '/checkout' } } })
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex flex-col items-center justify-center py-24 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md">
          <div className="text-7xl mb-6">☕</div>
          <h2 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100 mb-3">Your Basket is Empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Discover our freshly roasted single-origin brews, artisan pastries, and seasonal treats.
          </p>
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
            Explore Menu & Order
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-semibold">Your Selection</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-coffee-900 dark:text-cream-100">Shopping Cart</h1>
          </div>
          <Link to="/menu" className="text-sm font-medium text-coffee-700 dark:text-coffee-400 hover:underline flex items-center gap-1">
            <ArrowLeft size={16}/> Continue browsing
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="card p-4 sm:p-5 flex gap-4 items-center bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&q=80'}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl shrink-0 shadow-sm"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&q=80' }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-coffee-500 bg-coffee-50 dark:bg-coffee-950 px-2 py-0.5 rounded-full inline-block mb-1">
                      {item.category?.replace('-', ' ')}
                    </span>
                    <h3 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-base sm:text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-coffee-700 dark:text-coffee-300 font-bold text-sm sm:text-base mt-1">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1 bg-cream-100 dark:bg-gray-800 rounded-full p-1 border border-cream-200 dark:border-gray-700">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-coffee-100 text-gray-700 dark:text-gray-200 transition-colors shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12}/>
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-coffee-100 text-gray-700 dark:text-gray-200 transition-colors shadow-xs"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12}/>
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="text-right min-w-[70px]">
                    <p className="font-bold text-coffee-900 dark:text-cream-100 text-base">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Remove item"
                  >
                    <Trash2 size={16}/>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <div className="card p-6 sm:p-7 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
              <h2 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900 dark:text-cream-100">₹{subtotal.toFixed(2)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon ({coupon})</span>
                    <span>−₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-bold text-xl text-coffee-900 dark:text-cream-100">
                  <span>Grand Total</span>
                  <span className="text-coffee-700 dark:text-coffee-300">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon input */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                {coupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-2.5">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-sm font-medium">
                      <Tag size={15}/> Code: <span className="font-mono font-bold">{coupon}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-emerald-700 hover:text-red-500 transition-colors">
                      <X size={15}/>
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Promo Code (e.g. BLOOM20)"
                      className="input-field text-xs uppercase font-mono py-2.5"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mt-6 py-4 text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25"
              >
                Proceed to Checkout <ArrowRight size={18}/>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-500 dark:text-gray-400">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs">
                <ShieldCheck size={20} className="mx-auto mb-1 text-coffee-600"/>
                <span>Encrypted Pay</span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs">
                <Truck size={20} className="mx-auto mb-1 text-coffee-600"/>
                <span>Fast Thermal Bag</span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs">
                <RefreshCw size={20} className="mx-auto mb-1 text-coffee-600"/>
                <span>Fresh Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

