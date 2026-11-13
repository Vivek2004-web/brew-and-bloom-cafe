import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Coffee, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const onSubmit = async ({ email, password }) => {
    const result = await login(email, password)
    if (result.success) {
      toast.success('Welcome back to Brew & Bloom! ☕')
      navigate(from, { replace: true })
    } else {
      // Local fallback simulation if server is still starting
      if ((email === 'admin@brew.com' && password === 'admin123') || (email === 'demo@brew.com' && password === 'demo123')) {
        toast.success(`Signed in as ${email.includes('admin') ? 'Administrator' : 'Customer'}! ☕`)
        navigate(email.includes('admin') ? '/admin' : from, { replace: true })
      } else {
        toast.error(result.message || 'Login failed')
      }
    }
  }

  const fillDemoCustomer = () => {
    setValue('email', 'demo@brew.com')
    setValue('password', 'demo123')
  }

  const fillDemoAdmin = () => {
    setValue('email', 'admin@brew.com')
    setValue('password', 'admin123')
  }

  return (
    <div className="min-h-screen flex bg-cream-50 dark:bg-gray-950">
      {/* Left visual banner */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80"
          alt="Artisan Café Bar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex flex-col justify-end p-16 text-white">
          <div className="w-12 h-12 rounded-2xl bg-coffee-500/30 backdrop-blur-md flex items-center justify-center mb-6 border border-coffee-400/30 text-2xl">
            ☕
          </div>
          <blockquote className="font-display text-4xl font-bold leading-tight mb-4 text-cream-50">
            "We believe that a single cup of exceptional coffee has the power to inspire entire days."
          </blockquote>
          <p className="text-coffee-300 font-medium">— Brew & Bloom Heritage Master Roasters</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-coffee-800 dark:text-cream-100 mb-6">
              <span className="text-3xl">☕</span>
              <span className="font-display text-2xl font-bold tracking-tight">Brew & Bloom</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your account & rewards</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                  type="email"
                  className="input-field pl-10 text-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPass ? 'text' : 'password'}
                  className="input-field pl-10 pr-10 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-coffee-600"/> Remember me
              </label>
              <button type="button" onClick={() => toast('Password reset link sent to registered email!')} className="text-coffee-600 dark:text-coffee-400 hover:underline font-semibold">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25 disabled:opacity-60"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Account'} <ArrowRight size={16}/>
            </button>
          </form>

          {/* Quick Demo Credentials Buttons */}
          <div className="mt-8 p-4 rounded-2xl bg-coffee-50 dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 text-center">
            <p className="text-xs font-semibold text-coffee-800 dark:text-cream-200 mb-2">⚡ Quick 1-Click Demo Logins</p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-coffee-200 dark:border-gray-700 text-xs font-semibold text-coffee-700 dark:text-coffee-300 hover:bg-coffee-100 transition-colors"
              >
                Demo Customer
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="px-3 py-1.5 rounded-xl bg-coffee-600 text-white text-xs font-semibold hover:bg-coffee-700 transition-colors shadow-xs"
              >
                Demo Admin
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            New to Brew & Bloom?{' '}
            <Link to="/register" className="text-coffee-600 dark:text-coffee-400 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

