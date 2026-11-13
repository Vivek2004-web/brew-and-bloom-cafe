import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const { register: registerUser, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password', '')

  const onSubmit = async ({ name, email, password }) => {
    const result = await registerUser(name, email, password)
    if (result.success) {
      toast.success('Welcome to Brew & Bloom! Your membership is active. ☕')
      navigate('/')
    } else {
      toast.error(result.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex bg-cream-50 dark:bg-gray-950">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1000&q=80"
          alt="Barista at Brew & Bloom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex flex-col justify-end p-16 text-white">
          <blockquote className="font-display text-4xl font-bold leading-tight mb-4 text-cream-50">
            "Become a part of our artisanal coffee community."
          </blockquote>
          <ul className="space-y-2.5 text-sm text-cream-200/90 font-medium">
            <li className="flex items-center gap-2"><Check size={16} className="text-coffee-400"/> Complimentary 15% discount on your first order</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-coffee-400"/> Earn Bloom Points with every espresso & pastry</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-coffee-400"/> Priority weekend table reservations & cupping invites</li>
          </ul>
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
            <h1 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Unlock exclusive roast previews & rewards</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                  className="input-field pl-10 text-sm"
                  placeholder="Your Name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

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
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'At least 6 characters' }
                  })}
                  type={showPass ? 'text' : 'password'}
                  className="input-field pl-10 pr-10 text-sm"
                  placeholder="Create password"
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

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: v => v === password || 'Passwords do not match'
                  })}
                  type={showPass ? 'text' : 'password'}
                  className="input-field pl-10 text-sm"
                  placeholder="Repeat password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25 disabled:opacity-60"
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'} <ArrowRight size={16}/>
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have a Brew & Bloom account?{' '}
            <Link to="/login" className="text-coffee-600 dark:text-coffee-400 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

