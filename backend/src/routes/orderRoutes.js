import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createOrder)
router.get('/my', protect, getMyOrders)
router.get('/:id', getOrderById)

// Admin order routes
router.get('/', protect, adminOnly, getAllOrders)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

export default router

