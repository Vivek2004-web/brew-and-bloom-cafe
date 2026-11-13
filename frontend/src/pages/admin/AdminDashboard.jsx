import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingBag, Users, Clock, TrendingUp, ArrowUpRight, Coffee, Calendar, Plus } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'
import { Link } from 'react-router-dom'
import api from '../../lib/api'

const SALES_DATA = [
  { day: 'Mon', sales: 14200, orders: 48 },
  { day: 'Tue', sales: 18400, orders: 62 },
  { day: 'Wed', sales: 16900, orders: 55 },
  { day: 'Thu', sales: 22100, orders: 74 },
  { day: 'Fri', sales: 28900, orders: 96 },
  { day: 'Sat', sales: 38400, orders: 132 },
  { day: 'Sun', sales: 34200, orders: 118 },
]

const CATEGORY_DATA = [
  { name: 'Hot Coffee', count: 420 },
  { name: 'Cold Brews', count: 310 },
  { name: 'Bakery', count: 280 },
  { name: 'Desserts', count: 190 },
  { name: 'Teas', count: 130 },
]

const RECENT_TRANSACTIONS = [
  { id: 'ORD-8921', customer: 'Priya Sharma', amount: 820.00, items: 3, status: 'delivered', time: '12m ago' },
  { id: 'ORD-8920', customer: 'Rohan Verma', amount: 540.00, items: 2, status: 'preparing', time: '24m ago' },
  { id: 'ORD-8919', customer: 'Meera Kapoor', amount: 1250.00, items: 4, status: 'confirmed', time: '41m ago' },
  { id: 'ORD-8918', customer: 'Kabir Das', amount: 320.00, items: 1, status: 'delivered', time: '1h ago' },
  { id: 'ORD-8917', customer: 'Sanya Mirza', amount: 960.00, items: 3, status: 'delivered', time: '2h ago' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 173100,
    totalOrders: 585,
    totalCustomers: 342,
    pendingOrders: 6
  })

  useEffect(() => {
    api.get('/admin/analytics')
      .then(res => {
        if (res.data) setStats(res.data)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            Executive Café Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Real-time revenue metrics, daily roastery volume, and order streams.</p>
        </div>
        <div className="flex gap-2.5">
          <Link to="/admin/products" className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5">
            <Plus size={15}/> New Menu Item
          </Link>
          <Link to="/admin/reservations" className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5">
            <Calendar size={15}/> Table Schedule
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Weekly Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp size={14}/> +18.4% from last week
          </div>
        </div>

        <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-coffee-100 dark:bg-coffee-950/60 text-coffee-600 dark:text-coffee-300 flex items-center justify-center">
              <ShoppingBag size={20}/>
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            {stats.totalOrders}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp size={14}/> +9.2% steady increase
          </div>
        </div>

        <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Patrons</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users size={20}/>
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            {stats.totalCustomers}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
            +24 newly registered today
          </div>
        </div>

        <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock size={20}/>
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">
            {stats.pendingOrders}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 font-semibold">
            Live kitchen queue active
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">Revenue Velocity (₹)</h3>
              <p className="text-xs text-gray-400">Daily gross revenue over past 7 calendar days</p>
            </div>
            <span className="text-xs font-semibold text-coffee-600 bg-coffee-50 dark:bg-coffee-950 px-2.5 py-1 rounded-lg">
              This Week
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c97a28" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#c97a28" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888" fontSize={12} tickLine={false}/>
                <YAxis stroke="#888" fontSize={12} tickLine={false} tickFormatter={v => `₹${v/1000}k`}/>
                <Tooltip
                  formatter={value => [`₹${value}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#c97a28" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume by Category Bar Chart */}
        <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">Orders by Category</h3>
            <p className="text-xs text-gray-400">Relative sales volume</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} layout="vertical">
                <XAxis type="number" hide/>
                <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} width={80} tickLine={false}/>
                <Tooltip
                  formatter={value => [value, 'Sold']}
                  contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#87461c" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Live Transactions */}
      <div className="card p-6 bg-white dark:bg-gray-900 border border-stone-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl font-bold text-coffee-900 dark:text-cream-100">Recent Customer Transactions</h3>
            <p className="text-xs text-gray-400">Real-time incoming orders and fulfillment state</p>
          </div>
          <Link to="/admin/orders" className="text-xs font-semibold text-coffee-600 hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-cream-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-coffee-700 dark:text-coffee-300">
                    {tx.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-800 dark:text-gray-200">
                    {tx.customer}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {tx.items} items
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-coffee-900 dark:text-cream-100">
                    ₹{tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      tx.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : tx.status === 'preparing'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-400">
                    {tx.time}
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

