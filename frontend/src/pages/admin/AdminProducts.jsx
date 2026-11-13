import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Check, X, Image as ImageIcon, Coffee } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const INITIAL_PRODUCTS = [
  { _id: 'h1', name: 'Signature Espresso', category: 'hot-coffee', price: 160, description: 'Pure, intense double shot of our house blend.', isAvailable: true, isBestSeller: true, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
  { _id: 'h2', name: 'Velvet Cappuccino', category: 'hot-coffee', price: 220, description: 'Equal parts espresso, steamed milk, and silky microfoam.', isAvailable: true, isBestSeller: true, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80' },
  { _id: 'c1', name: 'Signature Cold Brew', category: 'cold-coffee', price: 320, description: 'Slow-steeped 24 hours for a smooth, chocolatey finish.', isAvailable: true, isBestSeller: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
  { _id: 'b1', name: 'Artisanal Almond Croissant', category: 'bakery', price: 180, description: 'Buttery flaky croissant filled with frangipane almond cream.', isAvailable: true, isBestSeller: false, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { _id: 'd1', name: 'NY Blueberry Cheesecake', category: 'desserts', price: 380, description: 'Rich NY-style cheesecake with fresh blueberry compote.', isAvailable: true, isBestSeller: true, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&q=80' },
]

export default function AdminProducts() {
  const { data } = useProducts()
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'hot-coffee',
    price: '',
    description: '',
    image: '',
    isAvailable: true,
    isBestSeller: false
  })

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'hot-coffee',
      price: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
      isAvailable: true,
      isBestSeller: false
    })
    setIsModalOpen(true)
  }

  const openEditModal = (p) => {
    setEditingProduct(p)
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      image: p.image || '',
      isAvailable: p.isAvailable ?? true,
      isBestSeller: p.isBestSeller ?? false
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      toast.error('Name and price are required')
      return
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    }

    if (editingProduct) {
      try {
        await api.put(`/products/${editingProduct._id}`, payload)
      } catch {}
      setProducts(products.map(p => p._id === editingProduct._id ? { ...p, ...payload } : p))
      toast.success('Product updated successfully!')
    } else {
      const newId = 'prod_' + Math.random().toString(36).substr(2, 6)
      try {
        await api.post('/products', payload)
      } catch {}
      setProducts([{ _id: newId, ...payload }, ...products])
      toast.success('New product added to menu!')
    }
    setIsModalOpen(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return
    try {
      await api.delete(`/products/${id}`)
    } catch {}
    setProducts(products.filter(p => p._id !== id))
    toast.success('Product removed from menu')
  }

  const toggleAvailability = (id) => {
    setProducts(products.map(p => p._id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    toast.success('Inventory availability toggled')
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            Menu & Inventory Management
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Control pricing, seasonal releases, and counter availability.</p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary text-xs py-3 px-5 flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
        >
          <Plus size={16}/> Add New Menu Item
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 flex items-center gap-3">
        <Search size={18} className="text-gray-400 ml-2"/>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products by name or category..."
          className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-800 dark:text-cream-100 placeholder-gray-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 text-xs px-2">Clear</button>
        )}
      </div>

      {/* Products Table */}
      <div className="card bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 bg-stone-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4">Tags</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((product) => (
                <tr key={product._id} className="hover:bg-cream-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-xs"
                        onError={e => e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=80'}
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-cream-100">{product.name}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs capitalize font-medium text-coffee-700 dark:text-coffee-300 bg-coffee-50 dark:bg-coffee-950 px-2.5 py-1 rounded-full">
                      {product.category?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-coffee-900 dark:text-cream-100">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleAvailability(product._id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 transition-colors ${
                        product.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}
                    >
                      {product.isAvailable ? <Check size={12}/> : <X size={12}/>}
                      {product.isAvailable ? 'In Stock' : 'Sold Out'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    {product.isBestSeller && (
                      <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px]">
                        ★ Best Seller
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 rounded-lg text-gray-400 hover:text-coffee-600 hover:bg-coffee-50 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 size={16}/>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
                <h3 className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100">
                  {editingProduct ? 'Edit Menu Product' : 'Add New Menu Product'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20}/>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="input-field text-sm"
                    placeholder="e.g. Ethiopian Yirgacheffe Pour-Over"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="input-field text-sm appearance-none cursor-pointer"
                    >
                      <option value="hot-coffee">Hot Coffee</option>
                      <option value="cold-coffee">Cold Coffee</option>
                      <option value="tea">Tea</option>
                      <option value="frappes">Frappes</option>
                      <option value="desserts">Desserts</option>
                      <option value="bakery">Bakery</option>
                      <option value="snacks">Snacks & Sandwiches</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="input-field text-sm"
                      placeholder="280.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="input-field text-sm"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="input-field text-sm resize-none"
                    placeholder="Tasting notes, provenance, ingredients..."
                  />
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAvailable}
                      onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                      className="accent-coffee-600 scale-110"
                    />
                    Available for Ordering
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={e => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="accent-coffee-600 scale-110"
                    />
                    Best Seller Highlight
                  </label>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
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
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

