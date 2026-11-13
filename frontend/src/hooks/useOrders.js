import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'
import toast from 'react-hot-toast'

export const useOrders = () =>
  useQuery({ queryKey: ['orders'], queryFn: async () => { const res = await api.get('/orders/my'); return res.data } })

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/orders', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['orders'] }); toast.success('Order placed!') },
    onError: (err) => toast.error(err.response?.data?.message || 'Order failed'),
  })
}
