import { useState, useEffect } from 'react'
import { Users, Search, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react'
import api from '../../lib/api'

const MOCK_CUSTOMERS = [
  { _id: 'usr_1', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '9876543210', role: 'customer', totalOrders: 14, totalSpent: 9420.00, joined: '2024-03-12' },
  { _id: 'usr_2', name: 'Rohan Mehra', email: 'rohan.m@example.com', phone: '9812345678', role: 'customer', totalOrders: 8, totalSpent: 5120.00, joined: '2024-06-01' },
  { _id: 'usr_3', name: 'Admin Root', email: 'admin@brew.com', phone: '9999900000', role: 'admin', totalOrders: 0, totalSpent: 0, joined: '2023-01-01' },
  { _id: 'usr_4', name: 'Ayesha Khan', email: 'ayesha.k@example.com', phone: '9765432109', role: 'customer', totalOrders: 5, totalSpent: 3400.00, joined: '2024-08-15' },
  { _id: 'usr_5', name: 'Kabir Varma', email: 'demo@brew.com', phone: '9820011223', role: 'customer', totalOrders: 21, totalSpent: 16800.00, joined: '2023-11-20' },
]

export default function AdminCustomers() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/admin/customers')
      .then(res => {
        if (res.data?.customers?.length) setCustomers(res.data.customers)
      })
      .catch(() => {})
  }, [])

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
          Patrons & Registered Guests
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Directory of registered coffee club members and lifetime loyalty metrics.</p>
      </div>

      <div className="card p-4 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 flex items-center gap-3">
        <Search size={18} className="text-gray-400 ml-2"/>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter guests by name or email address..."
          className="w-full bg-transparent border-0 focus:outline-none text-sm text-gray-800 dark:text-cream-100 placeholder-gray-400"
        />
      </div>

      <div className="card bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 bg-stone-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Lifetime Spent</th>
                <th className="py-3.5 px-4">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((c) => (
                <tr key={c._id} className="hover:bg-cream-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-cream-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-coffee-950 text-coffee-700 dark:text-coffee-300 font-bold text-xs flex items-center justify-center">
                        {c.name[0]?.toUpperCase()}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500 dark:text-gray-400">
                    {c.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                      c.role === 'admin'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-coffee-50 text-coffee-700 dark:bg-coffee-950 dark:text-coffee-300'
                    }`}>
                      {c.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-coffee-700 dark:text-coffee-300">
                    {c.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-cream-100">
                    ₹{c.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-400">
                    {c.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

