import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['percentage', 'flat'],
    default: 'percentage',
  },
  minOrder: {
    type: Number,
    default: 0,
  },
  expiry: {
    type: String,
    default: '2025-12-31',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
})

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema)
export default Coupon

