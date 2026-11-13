import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category required'],
    enum: ['hot-coffee', 'cold-coffee', 'tea', 'frappes', 'desserts', 'bakery', 'snacks'],
  },
  price: {
    type: Number,
    required: [true, 'Price required'],
    min: 0,
  },
  description: {
    type: String,
    required: [true, 'Description required'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isNewItem: {
    type: Boolean,
    default: false,
  },
  avgRating: {
    type: Number,
    default: 4.8,
  },
  reviewCount: {
    type: Number,
    default: 12,
  },
  reviews: [reviewSchema]
}, {
  timestamps: true,
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product

