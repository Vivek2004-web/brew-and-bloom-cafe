import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const { items } = get()
        const exists = items.find(i => i._id === product._id)
        if (exists) {
          set({ items: items.filter(i => i._id !== product._id) })
          toast('Removed from wishlist', { icon: '💔' })
        } else {
          set({ items: [...items, product] })
          toast.success('Added to wishlist!')
        }
      },
      isWishlisted: (id) => get().items.some(i => i._id === id),
      clear: () => set({ items: [] }),
    }),
    { name: 'brew-wishlist' }
  )
)
