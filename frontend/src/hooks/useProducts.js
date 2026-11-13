import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export const useProducts = (params = {}) =>
  useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await api.get('/products', { params })
      return res.data
    },
  })

export const useProduct = (id) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: async () => { const res = await api.get(`/products/${id}`); return res.data },
    enabled: !!id,
  })

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => { const res = await api.get('/products/categories'); return res.data },
  })
