import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../lib/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      initAuth: async () => {
        const { token } = get()
        if (!token) return
        try {
          const res = await api.get('/auth/me')
          set({ user: res.data.user, isAuthenticated: true })
        } catch {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await api.post('/auth/login', { email, password })
          const { token, user } = res.data
          set({ token, user, isAuthenticated: true, isLoading: false })
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          return { success: true }
        } catch (err) {
          set({ isLoading: false })
          return { success: false, message: err.response?.data?.message || 'Login failed' }
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true })
        try {
          const res = await api.post('/auth/register', { name, email, password })
          const { token, user } = res.data
          set({ token, user, isAuthenticated: true, isLoading: false })
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          return { success: true }
        } catch (err) {
          set({ isLoading: false })
          return { success: false, message: err.response?.data?.message || 'Registration failed' }
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        delete api.defaults.headers.common['Authorization']
      },

      updateProfile: async (data) => {
        try {
          const res = await api.put('/auth/profile', data)
          set({ user: res.data.user })
          return { success: true }
        } catch (err) {
          return { success: false, message: err.response?.data?.message || 'Update failed' }
        }
      }
    }),
    {
      name: 'brew-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)
