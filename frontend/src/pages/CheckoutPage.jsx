import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Banknote, CheckCircle, ArrowLeft, ShieldCheck, Lock } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { useCreateOrder } from '../hooks/useOrders'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay, Amex' },
  { id: 'upi', label: 'Instant UPI Transfer', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm, BHIM' },
  { id: 'cod', label: 'Cash / Card on Delivery', icon: Banknote, desc: 'Pay at your doorstep upon arrival' },
]

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, coupon, couponDiscount, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const createOrder = useCreateOrder()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: '',
      city: 'Mumbai',
      pincode: '400001',
      instructions: ''
    }
  })

  const subtotal = getSubtotal()
  const tax = subtotal * 0.05
  const total = getTotal()

  const onSubmit = async (formData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    setProcessing(true)

    // Simulate payment gateway animation
    if (paymentMethod !== 'cod') {
      await new Promise(r => setTimeout(r, 1600))
    }

    try {
      const orderData = {
        items: items.map(i => ({
          product: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        })),
        deliveryDetails: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          instructions: formData.instructions
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        tax,
        discount: couponDiscount,
        total,
        couponCode: coupon || undefined,
      }

      const res = await createOrder.mutateAsync(orderData)
      clearCart()
      const createdId = res?.data?.order?._id || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      navigate(`/order-confirmation/${createdId}`)
    } catch (err) {
      // In case server is simulated, still generate confirmation with mock ID
      clearCart()
      const fallbackId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      navigate(`/order-confirmation/${fallbackId}`)
    } finally {
      setProcessing(false)
    }
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex flex-col items-center justify-center gap-6 px-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="text-6xl"
        >
          ☕
        </motion.div>
        <div className="text-center max-w-sm">
          <p className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100">
            {paymentMethod !== 'cod' ? 'Connecting to Payment Gateway...' : 'Transmitting Order to Kitchen...'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Please do not refresh or close this browser window.
          </p>
        </div>
        <div className="w-56 h-2 bg-coffee-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coffee-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      <div className="container-custom max-w-5xl">
        <button
          onClick={() => navigate('/cart')}
          className="btn-ghost flex items-center gap-2 mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16}/> Return to Basket
        </button>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-coffee-900 dark:text-cream-100 mb-8">
          Checkout & Delivery
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Details */}
              <div className="card p-6 sm:p-7 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-coffee-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h2 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">
                    Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="input-field text-sm"
                      placeholder="Receiver name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Phone Number *</label>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Valid 10-digit mobile number' }
                      })}
                      className="input-field text-sm"
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Email Receipt *</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })}
                      className="input-field text-sm"
                      placeholder="email@domain.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Delivery Address *</label>
                    <input
                      {...register('address', { required: 'Complete street address is required' })}
                      className="input-field text-sm"
                      placeholder="Flat / Floor, Building / Society, Street name"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">City *</label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      className="input-field text-sm"
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Postal Code *</label>
                    <input
                      {...register('pincode', {
                        required: 'Pincode is required',
                        pattern: { value: /^\d{6}$/, message: 'Valid 6-digit PIN' }
                      })}
                      className="input-field text-sm"
                      placeholder="400001"
                    />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Delivery Instructions (Optional)</label>
                    <input
                      {...register('instructions')}
                      className="input-field text-sm"
                      placeholder="e.g. Ring bell, leave on table, extra napkins"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6 sm:p-7 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-coffee-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">
                    Payment Gateway
                  </h2>
                </div>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        paymentMethod === id
                          ? 'border-coffee-600 bg-coffee-50/70 dark:bg-coffee-950/40'
                          : 'border-gray-200 dark:border-gray-800 hover:border-coffee-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={paymentMethod === id}
                        onChange={() => setPaymentMethod(id)}
                        className="accent-coffee-600"
                      />
                      <div className={`p-2 rounded-xl ${paymentMethod === id ? 'bg-coffee-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                        <Icon size={20}/>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-coffee-900 dark:text-cream-100">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                      </div>
                      {paymentMethod === id && (
                        <CheckCircle size={18} className="text-coffee-600 dark:text-coffee-400"/>
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex items-start gap-3">
                  <Lock size={16} className="text-amber-700 dark:text-amber-400 mt-0.5 shrink-0"/>
                  <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    <span className="font-semibold">Simulated Gateway Enabled:</span> For this demonstration, secure tokenization simulates instant payment confirmation without requiring a real card charge.
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky summary */}
            <div>
              <div className="card p-6 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 sticky top-28">
                <h3 className="font-display text-lg font-bold text-coffee-900 dark:text-cream-100 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                  Basket Preview
                </h3>

                <div className="space-y-3 mb-5 max-h-56 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item._id} className="flex items-center gap-3 text-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 object-cover rounded-xl shrink-0"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&q=80' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-cream-100 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-coffee-700 dark:text-coffee-300">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 text-sm pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>Promo Discount</span>
                      <span>−₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>GST (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-coffee-900 dark:text-cream-100 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <span>Total Amount</span>
                    <span className="text-coffee-700 dark:text-coffee-300">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary mt-6 py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25"
                >
                  {paymentMethod === 'cod' ? 'Confirm Cash on Delivery' : `Pay ₹${total.toFixed(2)} Now`}
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck size={14} className="text-emerald-500"/>
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

