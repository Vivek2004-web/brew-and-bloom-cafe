import { useState, useEffect } from 'react'
import { ShoppingBag, Search, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const MOCK_ADMIN_ORDERS = [
  {
    _id: 'ord_9812_a',
    createdAt: new Date().toISOString(),
    deliveryDetails: { name: 'Priya Sharma', phone: '9876543210', address: 'B-402, Sea Green Apts, Worli', city: 'Mumbai' },
    items: [
      { name: 'Signature Cold Brew', quantity: 2, price: 320 },
      { name: 'Almond Croissant', quantity: 1, price: 180 }
    ],
    status: 'pending',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    total: 861.00
  },
  {
    _id: 'ord_9811_b',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    deliveryDetails: { name: 'Rohan Mehra', phone: '9812345678', address: '12 Marine Vista, Marine Drive', city: 'Mumbai' },
    items: [
      { name: 'Vanilla Latte', quantity: 1, price: 280 },
      { name: 'Blueberry Cheesecake', quantity: 1, price: 380 }
    ],
    status: 'preparing',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    total: 693.00
  },
  {
    _id: 'ord_9810_c',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    deliveryDetails: { name: 'Ayesha Khan', phone: '9765432109', address: 'Flat 5, Rosewood Enclave, Bandra West', city: 'Mumbai' },
    items: [
      { name: 'Caramel Frappe', quantity: 2, price: 350 },
      { name: 'Avocado Toast', quantity: 1, price: 280 }
    ],
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    total: 1029.00
  }
]

const STATUS_OPTS = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled']

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ADMIN_ORDERS)
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    api.get('/orders')
      .then(res => {
        if (res.data?.orders?.length) setOrders(res.data.orders)
      })
      .catch(() => {})
  }, [])

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus })
    } catch {}
    setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o))
    toast.success(`Order status updated to ${newStatus}`)
  }

  const filtered = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
          Customer Orders & Dispatch
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Live order streaming, fulfillment status, and receipts.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', ...STATUS_OPTS].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl capitalize transition-all ${
              filterStatus === st
                ? 'bg-coffee-600 text-white shadow-xs'
                : 'bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-stone-50'
            }`}
          >
            {st.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 bg-stone-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer & Phone</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Update Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((order) => (
                <tr key={order._id} className="hover:bg-cream-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-coffee-700 dark:text-coffee-300">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-gray-900 dark:text-cream-100">{order.deliveryDetails?.name || 'Patron'}</p>
                    <p className="text-xs text-gray-400">{order.deliveryDetails?.phone || 'No phone'}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-coffee-900 dark:text-cream-100">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-xs">
                    <span className="uppercase font-semibold text-gray-700 dark:text-gray-300 block">{order.paymentMethod}</span>
                    <span className={`text-[10px] font-bold ${order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      ● {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800 capitalize cursor-pointer focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    >
                      {STATUS_OPTS.map(opt => (
                        <option key={opt} value={opt}>{opt.replace('-', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-coffee-600 hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors"
                      title="Inspect Order Details"
                    >
                      <Eye size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">
                  Order Invoice #{selectedOrder._id.slice(-6).toUpperCase()}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-stone-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                <p className="font-bold text-gray-800 dark:text-cream-100 text-xs uppercase tracking-wider mb-2">Customer Address</p>
                <p className="font-semibold">{selectedOrder.deliveryDetails?.name}</p>
                <p className="text-gray-500 text-xs">{selectedOrder.deliveryDetails?.address}, {selectedOrder.deliveryDetails?.city}</p>
                <p className="text-gray-500 text-xs mt-1">📞 {selectedOrder.deliveryDetails?.phone}</p>
              </div>

              <div>
                <p className="font-bold text-gray-800 dark:text-cream-100 text-xs uppercase tracking-wider mb-3">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{item.name} ×{item.quantity}</span>
                      <span className="font-bold text-coffee-700 dark:text-coffee-300">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between font-bold text-base">
                    <span>Total Amount</span>
                    <span className="text-coffee-700 dark:text-coffee-300">₹{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="btn-primary w-full mt-6 py-3 text-xs"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

