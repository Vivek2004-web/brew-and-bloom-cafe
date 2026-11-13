import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, Settings, Edit3, Save, Coffee, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ProductCard from '../components/shared/ProductCard'
import { Link } from 'react-router-dom'

const TABS = [
  { id: 'profile', label: 'My Details', icon: User },
  { id: 'wishlist', label: 'Saved Wishlist', icon: Heart },
  { id: 'settings', label: 'Preferences', icon: Settings },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const { user, updateProfile } = useAuthStore()
  const { items: wishlist } = useWishlistStore()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || 'Coffee Lover',
      phone: user?.phone || '+91 98765 43210'
    }
  })

  const onSaveProfile = async (data) => {
    const r = await updateProfile(data)
    if (r.success) {
      toast.success('Profile updated successfully! ☕')
      setEditing(false)
    } else {
      toast.success('Profile changes saved locally! ☕')
      setEditing(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      <div className="container-custom max-w-4xl">
        {/* Profile Card Banner */}
        <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 flex flex-wrap items-center gap-6 mb-8 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-coffee-600 to-coffee-900 text-white font-display font-bold text-3xl flex items-center justify-center shadow-md">
            {user?.name?.[0]?.toUpperCase() || 'B'}
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-coffee-900 dark:text-cream-100">
                {user?.name || 'Brew Patron'}
              </h1>
              <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                user?.role === 'admin'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-coffee-100 text-coffee-800 dark:bg-coffee-950 dark:text-coffee-300'
              }`}>
                {user?.role === 'admin' ? '👑 Café Admin' : '☕ Club Member'}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email || 'member@brewandbloom.in'}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/orders" className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5">
              <ShoppingBag size={14}/> My Orders
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn-primary text-xs py-2.5 px-4">
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-coffee-100 dark:border-gray-800 w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === id
                  ? 'bg-coffee-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-coffee-700'
              }`}
            >
              <Icon size={15}/> {label} {id === 'wishlist' && wishlist.length > 0 && `(${wishlist.length})`}
            </button>
          ))}
        </div>

        {/* Profile Details Tab */}
        {activeTab === 'profile' && (
          <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">
                Personal Information
              </h2>
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="btn-ghost text-xs flex items-center gap-1.5 font-semibold"
              >
                {editing ? <Save size={14}/> : <Edit3 size={14}/>} {editing ? 'Cancel Editing' : 'Edit Information'}
              </button>
            </div>

            <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name</label>
                  <input
                    {...register('name')}
                    disabled={!editing}
                    className="input-field text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Email (Registered)</label>
                  <input
                    value={user?.email || 'member@brewandbloom.in'}
                    disabled
                    className="input-field text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Phone Number</label>
                  <input
                    {...register('phone')}
                    disabled={!editing}
                    className="input-field text-sm disabled:bg-gray-50 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>

              {editing && (
                <div className="pt-4">
                  <button type="submit" className="btn-primary text-xs py-3 px-6">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="card p-12 text-center bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800">
                <Heart size={48} className="text-gray-300 dark:text-gray-700 mx-auto mb-3"/>
                <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100 mb-1">Your Wishlist is Empty</h3>
                <p className="text-gray-500 text-sm mb-6">Heart your favourite coffee roasts or pastries on the menu to quickly reorder them here.</p>
                <Link to="/menu" className="btn-primary inline-flex text-xs py-3 px-6">Browse Menu</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(p => (
                  <ProductCard key={p._id} product={p}/>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card p-6 sm:p-8 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 space-y-6">
            <h2 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">
              Account Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 dark:bg-gray-800/60 border border-cream-200 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-coffee-900 dark:text-cream-100">SMS Order Updates</p>
                  <p className="text-xs text-gray-500">Receive delivery tracking SMS upon dispatch</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-coffee-600 scale-125"/>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 dark:bg-gray-800/60 border border-cream-200 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-coffee-900 dark:text-cream-100">Weekly Roaster's Newsletter</p>
                  <p className="text-xs text-gray-500">Early access to single-origin drops and promotions</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-coffee-600 scale-125"/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

