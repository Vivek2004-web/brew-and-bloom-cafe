import { useState, useEffect } from 'react'
import { Tag, Plus, Trash2, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const INITIAL_COUPONS = [
  { _id: 'cp_1', code: 'BLOOM20', discount: 20, type: 'percentage', minOrder: 300, expiry: '2025-12-31', isActive: true },
  { _id: 'cp_2', code: 'PAIR399', discount: 15, type: 'percentage', minOrder: 400, expiry: '2025-08-30', isActive: true },
  { _id: 'cp_3', code: 'EARLYBIRD', discount: 20, type: 'percentage', minOrder: 250, expiry: '2025-10-31', isActive: true },
  { _id: 'cp_4', code: 'WELCOME100', discount: 100, type: 'flat', minOrder: 500, expiry: '2025-06-30', isActive: false },
]

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    minOrder: '300',
    expiry: '2025-12-31',
    isActive: true
  })

  useEffect(() => {
    api.get('/coupons')
      .then(res => {
        if (res.data?.coupons?.length) setCoupons(res.data.coupons)
      })
      .catch(() => {})
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newCoupon.code || !newCoupon.discount) {
      toast.error('Code and discount amount required')
      return
    }

    const payload = {
      ...newCoupon,
      code: newCoupon.code.toUpperCase(),
      discount: parseFloat(newCoupon.discount),
      minOrder: parseFloat(newCoupon.minOrder) || 0
    }

    try {
      await api.post('/coupons', payload)
    } catch {}

    setCoupons([{ _id: 'cp_' + Math.random().toString(36).substr(2, 6), ...payload }, ...coupons])
    toast.success(`Coupon ${payload.code} activated!`)
    setIsModalOpen(false)
  }

  const toggleStatus = (id) => {
    setCoupons(coupons.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c))
    toast.success('Coupon status toggled')
  }

  const handleDelete = (id) => {
    setCoupons(coupons.filter(c => c._id !== id))
    toast.success('Coupon deleted')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            Promotional Coupons & Deals
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Create vouchers, percentage discounts, and minimum order rules.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs py-3 px-5 flex items-center gap-2 shadow-md w-fit"
        >
          <Plus size={16}/> Create Promotional Code
        </button>
      </div>

      <div className="card bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 bg-stone-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Min Order</th>
                <th className="py-3.5 px-4">Valid Through</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {coupons.map((c) => (
                <tr key={c._id} className="hover:bg-cream-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-sm bg-coffee-50 dark:bg-coffee-950 text-coffee-800 dark:text-cream-100 px-3 py-1 rounded-xl border border-coffee-200 dark:border-coffee-900">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-coffee-900 dark:text-cream-100">
                    {c.type === 'percentage' ? `${c.discount}% OFF` : `₹${c.discount} OFF`}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-xs text-gray-500">
                    {c.type}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    ₹{c.minOrder}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-400">
                    {c.expiry}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(c._id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}
                    >
                      {c.isActive ? <Check size={12}/> : <X size={12}/>}
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100 mb-5">
              Create Promotional Coupon
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Coupon Code *</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="input-field uppercase font-mono text-sm"
                  placeholder="e.g. MONSOON25"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Discount Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="input-field text-sm appearance-none cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Value *</label>
                  <input
                    type="number"
                    value={newCoupon.discount}
                    onChange={e => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                    className="input-field text-sm"
                    placeholder="20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min Order (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrder}
                    onChange={e => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                    className="input-field text-sm"
                    placeholder="300"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Expiry Date</label>
                  <input
                    type="date"
                    value={newCoupon.expiry}
                    onChange={e => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary flex-1 py-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-3 text-xs"
                >
                  Create & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

