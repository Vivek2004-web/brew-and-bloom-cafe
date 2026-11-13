import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Clock, Home, Coffee, MapPin, Phone } from 'lucide-react'
import api from '../lib/api'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId && !orderId.startsWith('ORD-')) {
      api.get(`/orders/${orderId}`)
        .then(r => setOrder(r.data.order))
        .catch(() => {})
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [orderId])

  const displayId = orderId?.length > 12 ? orderId.slice(-8).toUpperCase() : orderId

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center py-20 pt-28 px-4">
      <div className="container-custom max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="w-24 h-24 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <CheckCircle size={52} className="text-emerald-600 dark:text-emerald-400"/>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-bold">
            Order Confirmed & In Progress
          </span>
          <h1 className="font-display text-4xl font-bold text-coffee-900 dark:text-cream-100 mt-1 mb-3">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 leading-relaxed text-sm">
            Our baristas are preparing your roasts with care. You will receive an SMS and email notification with live courier dispatch details.
          </p>

          <div className="inline-flex items-center gap-2 bg-coffee-100 dark:bg-coffee-950 border border-coffee-200 dark:border-coffee-900 px-5 py-2.5 rounded-full mb-8 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-coffee-700 dark:text-coffee-300 font-bold">Order Reference:</span>
            <span className="font-mono text-sm font-bold text-coffee-900 dark:text-cream-100 tracking-wider">
              #{displayId}
            </span>
          </div>

          {/* Progress track */}
          <div className="card p-6 mb-8 text-left bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
            <h3 className="font-display font-bold text-coffee-900 dark:text-cream-100 text-lg mb-5">
              Live Fulfillment Status
            </h3>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, label: 'Order Confirmed & Sent to Counter', time: 'Just now', done: true },
                { icon: Coffee, label: 'Extraction & Artisan Packaging', time: '5–10 mins', done: true },
                { icon: Package, label: 'Thermal Bag Courier Hand-off', time: '15 mins', done: false },
                { icon: Clock, label: 'Estimated Doorstep Arrival', time: '35–45 mins', done: false },
              ].map(({ icon: Icon, label, time, done }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    done
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }`}>
                    <Icon size={16}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${done ? 'text-gray-900 dark:text-cream-100' : 'text-gray-400'}`}>
                      {label}
                    </p>
                  </div>
                  <span className="text-xs text-coffee-600 dark:text-coffee-400 font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {order && (
            <div className="card p-6 mb-8 text-left bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
              <h3 className="font-display font-bold text-coffee-900 dark:text-cream-100 text-lg mb-4">
                Purchased Items
              </h3>
              <div className="space-y-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.name} <span className="text-gray-400">×{item.quantity}</span>
                    </span>
                    <span className="font-bold text-coffee-700 dark:text-coffee-300">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 flex justify-between font-bold text-base text-coffee-900 dark:text-cream-100">
                  <span>Grand Total</span>
                  <span className="text-coffee-700 dark:text-coffee-300">₹{order.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="btn-primary flex items-center justify-center gap-2">
              <Coffee size={18}/> View Order History
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
              <Home size={18}/> Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

