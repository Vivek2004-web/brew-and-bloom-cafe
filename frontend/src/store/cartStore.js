import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponDiscount: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get()
        const existing = items.find(i => i._id === product._id)
        if (existing) {
          set({ items: items.map(i => i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i) })
        } else {
          set({ items: [...items, { ...product, quantity }] })
        }
        toast.success(`${product.name} added to cart!`)
      },

      removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set({ items: get().items.map(i => i._id === id ? { ...i, quantity } : i) })
      },

      clearCart: () => set({ items: [], coupon: null, couponDiscount: 0 }),

      applyCoupon: (coupon, discount) => set({ coupon, couponDiscount: discount }),
      removeCoupon: () => set({ coupon: null, couponDiscount: 0 }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getTotal: () => {
        const sub = get().getSubtotal()
        const disc = get().couponDiscount
        const tax = sub * 0.05
        return sub - disc + tax
      },
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'brew-cart' }
  )
)
