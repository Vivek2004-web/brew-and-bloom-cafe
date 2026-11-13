import express from 'express'
import { getCoupons, createCoupon, validateCoupon } from '../controllers/couponController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.post('/validate', validateCoupon)
router.get('/', protect, adminOnly, getCoupons)
router.post('/', protect, adminOnly, createCoupon)

export default router

