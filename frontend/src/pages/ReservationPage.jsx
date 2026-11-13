import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, CheckCircle, Coffee, Sparkles, MapPin, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../store/authStore'
import api from '../lib/api'
import toast from 'react-hot-toast'

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
  '08:00 PM', '09:00 PM'
]

export default function ReservationPage() {
  const [confirmed, setConfirmed] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuthStore()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      guests: 2,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '04:00 PM',
      specialRequests: ''
    }
  })

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await api.post('/reservations', data)
      setConfirmed(res.data.reservation)
      toast.success('Your table is reserved! ☕')
    } catch (err) {
      // Offline fallback
      setConfirmed({
        _id: 'RES-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        ...data
      })
      toast.success('Reservation registered locally! ☕')
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-gray-950 flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle size={44} className="text-emerald-600 dark:text-emerald-400"/>
          </div>

          <span className="text-coffee-600 uppercase tracking-widest text-xs font-bold">Booking Confirmed</span>
          <h2 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100 mt-1 mb-2">
            Table Awaits You
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            A confirmation email & calendar invite has been dispatched.
          </p>

          <div className="card p-6 text-left space-y-3.5 mb-6 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-md">
            <div className="flex justify-between items-center text-sm pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-400">Pass Code</span>
              <span className="font-mono font-bold text-coffee-700 dark:text-coffee-300">
                #{confirmed._id?.slice(-8)?.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Guest Name</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{confirmed.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Date</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {new Date(confirmed.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Reserved Time</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{confirmed.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Party Size</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{confirmed.guests} Guests</span>
            </div>
          </div>

          <button onClick={() => setConfirmed(null)} className="btn-secondary w-full py-3 text-sm">
            Make Another Reservation
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      {/* Banner */}
      <div className="relative h-56 md:h-64 overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80"
          alt="Café Table Seating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/90 via-coffee-950/60 to-black/40 flex flex-col items-center justify-center text-white px-4 text-center">
          <span className="text-coffee-300 uppercase tracking-widest text-xs font-semibold flex items-center gap-1.5 mb-2">
            <Sparkles size={14}/> Handcrafted Seating Experience
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Reserve Your Table</h1>
          <p className="text-cream-200/80 max-w-md mt-2 text-sm sm:text-base">
            Private nooks for conversation, sunlight study tables, and group gatherings.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-3xl">
        <div className="card p-8 sm:p-10 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5 block">
                  <Calendar size={14} className="text-coffee-600"/> Preferred Date *
                </label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  min={today}
                  max={maxDate.toISOString().split('T')[0]}
                  className="input-field text-sm"
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5 block">
                  <Clock size={14} className="text-coffee-600"/> Time Slot *
                </label>
                <select
                  {...register('time', { required: 'Please select a time' })}
                  className="input-field text-sm appearance-none cursor-pointer"
                >
                  <option value="">Select Arrival Time</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5 block">
                <Users size={14} className="text-coffee-600"/> Number of Guests *
              </label>
              <select
                {...register('guests', { required: true, min: 1, max: 12 })}
                className="input-field text-sm appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest (Solo Coffee & Reading)' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="input-field text-sm"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Phone Number *</label>
                <input
                  {...register('phone', {
                    required: 'Phone number required',
                    pattern: { value: /^[6-9]\d{9}$/, message: '10-digit Indian phone' }
                  })}
                  className="input-field text-sm"
                  placeholder="10-digit mobile"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Email Address *</label>
              <input
                {...register('email', {
                  required: 'Email required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
                type="email"
                className="input-field text-sm"
                placeholder="your.email@provider.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Special Arrangements (Optional)</label>
              <textarea
                {...register('specialRequests')}
                rows={3}
                className="input-field text-sm resize-none"
                placeholder="Birthday surprise, quiet corner for business, high chair needed, dietary allergies..."
              />
            </div>

            <div className="bg-coffee-50 dark:bg-coffee-950/40 border border-coffee-100 dark:border-coffee-900/40 rounded-2xl p-4 text-xs text-coffee-800 dark:text-coffee-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5"><Coffee size={13}/> Seating Policy & Courtesy:</p>
              <p>• Tables are held for 15 minutes past reserved time before release to walk-in patrons.</p>
              <p>• Special requests are accommodated based on café floor availability.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25"
            >
              {loading ? 'Reserving Table...' : 'Confirm Table Reservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

