import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronDown, ChevronUp, RefreshCw, ShoppingBag, Clock } from 'lucide-react'
import { useOrders } from '../hooks/useOrders'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  preparing: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
  'out-for-delivery': 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
  delivered: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
}

const MOCK_PAST_ORDERS = [
  {
    _id: 'ord_demo_9821',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'delivered',
    total: 682.50,
    items: [
      { product: 'c1', name: 'Signature Cold Brew', price: 320, quantity: 1, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&q=80' },
      { product: 'd1', name: 'Blueberry Cheesecake', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=100&q=80' }
    ]
  },
  {
    _id: 'ord_demo_4412',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: 'delivered',
    total: 441.00,
    items: [
      { product: 'h3', name: 'Vanilla Latte', price: 280, quantity: 1, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=100&q=80' },
      { product: 'b1', name: 'Almond Croissant', price: 180, quantity: 1, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&q=80' }
    ]
  }
]

export default function OrderHistoryPage() {
  const { data, isLoading } = useOrders()
  const addItem = useCartStore(s => s.addItem)
  const [expanded, setExpanded] = useState(null)

  const orders = (data?.orders && data.orders.length > 0) ? data.orders : MOCK_PAST_ORDERS

  const handleReorder = (items) => {
    items.forEach(i => addItem({ _id: i.product || i._id, name: i.name, price: i.price, image: i.image, isAvailable: true }))
    toast.success('Items transferred to your basket! ☕')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-gray-950">
        <div className="animate-spin text-5xl">☕</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-semibold">Account Dashboard</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-coffee-900 dark:text-cream-100">
            Past Orders & Invoices
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
            <Package size={56} className="text-gray-300 dark:text-gray-700 mx-auto mb-4"/>
            <h3 className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100 mb-2">No Past Orders Found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">You haven't placed any orders yet. Discover our seasonal harvests and treat yourself!</p>
            <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
              <ShoppingBag size={18}/> Browse Our Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order._id}
                className="card overflow-hidden bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-coffee-50 dark:bg-coffee-950 flex items-center justify-center text-coffee-700 dark:text-coffee-300 font-bold">
                      ☕
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-coffee-900 dark:text-cream-100">
                        #{order._id?.slice(-8)?.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12}/> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status?.replace('-', ' ')}
                    </span>
                    <span className="font-display font-bold text-lg text-coffee-900 dark:text-cream-100">
                      ₹{order.total?.toFixed(2)}
                    </span>
                    <button
                      onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-coffee-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label="Expand order details"
                    >
                      {expanded === order._id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 dark:border-gray-800 bg-cream-50/50 dark:bg-gray-950/40 p-5 sm:p-6"
                    >
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">Items Ordered</h4>
                      <div className="space-y-3 mb-6">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {item.name} <span className="text-gray-400">×{item.quantity}</span>
                            </span>
                            <span className="font-semibold text-coffee-700 dark:text-coffee-300">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() => handleReorder(order.items)}
                          className="btn-primary py-2 px-5 text-xs inline-flex items-center gap-1.5"
                        >
                          <RefreshCw size={14}/> Reorder These Items
                        </button>
                        <span className="text-xs text-gray-400">Payment: {order.paymentMethod || 'Prepaid'} ({order.paymentStatus || 'completed'})</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

