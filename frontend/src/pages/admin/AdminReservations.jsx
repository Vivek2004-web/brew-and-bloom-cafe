import { useState, useEffect } from 'react'
import { Calendar, Users, Clock, Check, X, Phone, Mail, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const MOCK_RESERVATIONS = [
  {
    _id: 'res_101',
    name: 'Kabir & Saira',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '07:00 PM',
    guests: 2,
    phone: '9820011223',
    email: 'kabir@example.com',
    specialRequests: 'Quiet corner table near the plants for anniversary',
    status: 'confirmed'
  },
  {
    _id: 'res_102',
    name: 'Tech Founders Roundtable',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '04:00 PM',
    guests: 6,
    phone: '9930044556',
    email: 'founders@startup.in',
    specialRequests: 'Power outlets needed for laptops + pour-over flight tasting',
    status: 'confirmed'
  },
  {
    _id: 'res_103',
    name: 'Sunita Rao',
    date: new Date().toISOString().split('T')[0],
    time: '01:00 PM',
    guests: 3,
    phone: '9819988776',
    email: 'sunita@gmail.com',
    specialRequests: 'One high chair needed',
    status: 'completed'
  }
]

export default function AdminReservations() {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/reservations')
      .then(res => {
        if (res.data?.reservations?.length) setReservations(res.data.reservations)
      })
      .catch(() => {})
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/reservations/${id}/status`, { status })
    } catch {}
    setReservations(reservations.map(r => r._id === id ? { ...r, status } : r))
    toast.success(`Reservation marked as ${status}`)
  }

  const filtered = filter === 'all'
    ? reservations
    : reservations.filter(r => r.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
          Table Bookings & Floor Schedule
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage daily guest reservations and seating capacity.</p>
      </div>

      <div className="flex gap-2">
        {['all', 'confirmed', 'seated', 'completed', 'cancelled'].map(st => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl capitalize transition-all ${
              filter === st
                ? 'bg-coffee-600 text-white shadow-xs'
                : 'bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-stone-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div
            key={res._id}
            className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-coffee-700 dark:text-coffee-300">
                  #{res._id.slice(-6).toUpperCase()}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                  res.status === 'confirmed'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : res.status === 'completed' || res.status === 'seated'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}>
                  {res.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-coffee-900 dark:text-cream-100 mb-2">
                {res.name}
              </h3>

              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-coffee-600"/>
                  <span className="font-semibold">{new Date(res.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-coffee-600"/>
                  <span>{res.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-coffee-600"/>
                  <span>{res.guests} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-coffee-600"/>
                  <span>{res.phone}</span>
                </div>
              </div>

              {res.specialRequests && (
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-gray-800/50 text-xs text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{res.specialRequests}"
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => updateStatus(res._id, 'seated')}
                className="btn-primary flex-1 py-2 text-xs"
              >
                Mark Seated
              </button>
              <button
                onClick={() => updateStatus(res._id, 'cancelled')}
                className="btn-secondary py-2 px-3 text-xs text-red-600 hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

