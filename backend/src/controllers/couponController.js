import Coupon from '../models/Coupon.js'
import { getIsConnected } from '../config/db.js'
import { SEED_COUPONS } from '../utils/seedData.js'

let inMemoryCoupons = SEED_COUPONS.map((c, i) => ({ _id: `cp_${i + 1}`, ...c }))

export const getCoupons = async (req, res) => {
  try {
    if (getIsConnected()) {
      const coupons = await Coupon.find()
      if (coupons.length > 0) return res.json({ coupons })
    }
    res.json({ coupons: inMemoryCoupons })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCoupon = async (req, res) => {
  try {
    const { code, discount, type, minOrder, expiry } = req.body

    const couponData = {
      code: code.toUpperCase(),
      discount: parseFloat(discount),
      type: type || 'percentage',
      minOrder: parseFloat(minOrder) || 0,
      expiry: expiry || '2025-12-31',
      isActive: true,
      usageCount: 0
    }

    if (getIsConnected()) {
      const coupon = await Coupon.create(couponData)
      return res.status(201).json({ coupon })
    }

    const saved = { _id: 'cp_' + Date.now(), ...couponData }
    inMemoryCoupons.unshift(saved)
    res.status(201).json({ coupon: saved })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Coupon code required' })
    }

    const upper = code.trim().toUpperCase()

    let coupon
    if (getIsConnected()) {
      coupon = await Coupon.findOne({ code: upper, isActive: true })
    } else {
      coupon = inMemoryCoupons.find(c => c.code === upper && c.isActive)
    }

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired coupon code' })
    }

    if (orderTotal < (coupon.minOrder || 0)) {
      return res.status(400).json({
        message: `This coupon requires a minimum order of ₹${coupon.minOrder}`
      })
    }

    let discountAmount = 0
    if (coupon.type === 'percentage') {
      discountAmount = (orderTotal * coupon.discount) / 100
    } else {
      discountAmount = coupon.discount
    }

    res.json({
      valid: true,
      coupon,
      discountAmount
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

