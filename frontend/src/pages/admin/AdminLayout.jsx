import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Calendar,
  Users,
  Tag,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Bell,
  Sun,
  Moon
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useTheme } from '../../hooks/useTheme'

const ADMIN_LINKS = [
  { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard, end: true },
  { path: '/admin/products', label: 'Menu & Inventory', icon: Coffee },
  { path: '/admin/orders', label: 'Orders & Receipts', icon: ShoppingBag },
  { path: '/admin/reservations', label: 'Table Bookings', icon: Calendar },
  { path: '/admin/customers', label: 'Patrons & Guests', icon: Users },
  { path: '/admin/coupons', label: 'Coupons & Discounts', icon: Tag },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-gray-950 flex flex-col md:flex-row text-gray-900 dark:text-gray-100">
      {/* Mobile top bar */}
      <header className="md:hidden bg-coffee-950 text-white p-4 flex items-center justify-between border-b border-coffee-900">
        <div className="flex items-center gap-2">
          <span className="text-xl">☕</span>
          <span className="font-display font-bold text-lg">Brew & Bloom Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-300 hover:text-white">
          {sidebarOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-coffee-950 text-cream-100 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-coffee-900">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-2xl">☕</span>
              <div>
                <span className="font-display text-lg font-bold text-cream-100 tracking-tight">Brew & Bloom</span>
                <span className="block text-[10px] text-coffee-400 font-bold tracking-widest uppercase">Management Suite</span>
              </div>
            </Link>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1.5">
            {ADMIN_LINKS.map(({ path, label, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-coffee-600 text-white shadow-md'
                    : 'text-coffee-300 hover:bg-coffee-900/60 hover:text-cream-100'
                }`}
              >
                <Icon size={18}/> {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-coffee-900 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-coffee-300 hover:text-white hover:bg-coffee-900/50 transition-colors"
          >
            <ArrowLeft size={15}/> Live Website View
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut size={15}/> Sign Out of Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="hidden md:flex bg-white dark:bg-gray-900 h-16 border-b border-stone-200 dark:border-gray-800 px-8 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-coffee-600 bg-coffee-50 dark:bg-coffee-950 px-3 py-1 rounded-full">
              Production Admin Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18}/> : <Moon size={18}/>}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
              <div className="w-8 h-8 rounded-full bg-coffee-600 text-white font-bold text-xs flex items-center justify-center">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-gray-900 dark:text-cream-100">{user?.name || 'Administrator'}</p>
                <p className="text-gray-400">{user?.role === 'admin' ? 'Root Admin' : 'Manager'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

