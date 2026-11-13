import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Menu, X, Coffee, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useTheme } from '../../hooks/useTheme'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Reservation', path: '/reservation' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartCount = useCartStore(s => s.getItemCount())
  const wishCount = useWishlistStore(s => s.items.length)
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/'); setProfileOpen(false) }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container-custom flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-coffee-600 group-hover:scale-110 transition-transform duration-300 text-2xl">☕</span>
          <div>
            <span className="font-display text-xl font-bold text-coffee-800 dark:text-cream-100 tracking-tight">
              Brew & Bloom
            </span>
            <div className="text-[10px] text-coffee-500 tracking-widest uppercase">Café</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-coffee-700 bg-coffee-50 dark:bg-coffee-900/40 dark:text-cream-200'
                      : 'text-gray-700 dark:text-gray-300 hover:text-coffee-700 hover:bg-coffee-50 dark:hover:bg-gray-800'
                  }`
                }
              >{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode */}
          <button onClick={toggle} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-coffee-50 dark:hover:bg-gray-800 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Wishlist */}
          <Link to="/profile" className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-coffee-50 dark:hover:bg-gray-800 transition-colors">
            <Heart size={18} />
            {wishCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wishCount}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-coffee-50 dark:hover:bg-gray-800 transition-colors">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-coffee-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
              >{cartCount}</motion.span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(o => !o)}
                className="hidden md:flex items-center gap-2 bg-coffee-50 dark:bg-gray-800 hover:bg-coffee-100 px-3 py-2 rounded-full transition-colors text-coffee-800 dark:text-cream-100">
                <div className="w-6 h-6 rounded-full bg-coffee-600 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-20 truncate">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50"
                  >
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-coffee-50 dark:hover:bg-gray-800"><User size={15}/>Profile</Link>
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-coffee-50 dark:hover:bg-gray-800"><Coffee size={15}/>My Orders</Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-coffee-700 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-gray-800 font-medium">Admin Dashboard</Link>
                    )}
                    <hr className="my-1 border-gray-100 dark:border-gray-800" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut size={15}/>Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block btn-primary py-2 px-5 text-sm">Sign In</Link>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-coffee-50 transition-colors">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-xl"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, path }) => (
                <NavLink key={path} to={path} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-coffee-50 text-coffee-700' : 'text-gray-700 dark:text-gray-300 hover:bg-coffee-50'}`
                  }>{label}</NavLink>
              ))}
              <hr className="my-2 border-gray-100 dark:border-gray-800"/>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">👤 {user?.name}</Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">📋 My Orders</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="px-4 py-3 text-sm text-red-600 text-left">🚪 Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-primary text-center mx-2">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
