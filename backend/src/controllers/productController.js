import Product from '../models/Product.js'
import { getIsConnected } from '../config/db.js'
import { SEED_PRODUCTS } from '../utils/seedData.js'

let inMemoryProducts = SEED_PRODUCTS.map((p, idx) => ({ _id: `p_${idx + 1}`, ...p }))

export const getProducts = async (req, res) => {
  try {
    const { category, search, isBestSeller, sort } = req.query

    if (getIsConnected()) {
      let query = {}
      if (category && category !== 'all') query.category = category
      if (isBestSeller === 'true') query.isBestSeller = true
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ]
      }

      let sortOptions = { createdAt: -1 }
      if (sort === 'price-asc') sortOptions = { price: 1 }
      if (sort === 'price-desc') sortOptions = { price: -1 }
      if (sort === 'rating') sortOptions = { avgRating: -1 }

      const products = await Product.find(query).sort(sortOptions)
      if (products.length > 0) {
        return res.json({ products })
      }
    }

    // In-memory fallback
    let list = [...inMemoryProducts]
    if (category && category !== 'all') list = list.filter(p => p.category === category)
    if (isBestSeller === 'true') list = list.filter(p => p.isBestSeller)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))

    res.json({ products: list })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    if (getIsConnected()) {
      const product = await Product.findById(id)
      if (product) return res.json({ product })
    }

    const found = inMemoryProducts.find(p => p._id === id)
    if (found) return res.json({ product: found })

    res.status(404).json({ message: 'Product not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, image, isAvailable, isBestSeller } = req.body

    const newProd = {
      name,
      category,
      price: parseFloat(price),
      description,
      image: image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
      isAvailable: isAvailable ?? true,
      isBestSeller: isBestSeller ?? false,
      avgRating: 5.0,
      reviewCount: 1,
    }

    if (getIsConnected()) {
      const product = await Product.create(newProd)
      return res.status(201).json({ product })
    }

    const saved = { _id: `p_${Date.now()}`, ...newProd }
    inMemoryProducts.unshift(saved)
    res.status(201).json({ product: saved })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    if (getIsConnected()) {
      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
      if (updated) return res.json({ product: updated })
    }

    const idx = inMemoryProducts.findIndex(p => p._id === id)
    if (idx !== -1) {
      inMemoryProducts[idx] = { ...inMemoryProducts[idx], ...req.body }
      return res.json({ product: inMemoryProducts[idx] })
    }

    res.status(404).json({ message: 'Product not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    if (getIsConnected()) {
      await Product.findByIdAndDelete(id)
    }
    inMemoryProducts = inMemoryProducts.filter(p => p._id !== id)
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCategories = (req, res) => {
  const categories = [
    { id: 'hot-coffee', label: 'Hot Coffee' },
    { id: 'cold-coffee', label: 'Cold Coffee' },
    { id: 'tea', label: 'Tea' },
    { id: 'frappes', label: 'Frappes' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'snacks', label: 'Snacks & Sandwiches' },
  ]
  res.json({ categories })
}

