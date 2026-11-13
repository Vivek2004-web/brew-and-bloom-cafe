import Order from '../models/Order.js'
import { getIsConnected } from '../config/db.js'

let inMemoryOrders = [
  {
    _id: 'ord_demo_9821',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    deliveryDetails: { name: 'Priya Sharma', phone: '9876543210', address: 'B-402, Worli Sea Face', city: 'Mumbai', pincode: '400018' },
    items: [
      { product: 'c1', name: '24-Hour Kyoto Slow Drip Cold Brew', price: 320, quantity: 1, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&q=80' },
      { product: 'd1', name: 'Wild Blueberry NY Cheesecake', price: 380, quantity: 1, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=100&q=80' }
    ],
    status: 'delivered',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    subtotal: 700.00,
    tax: 35.00,
    discount: 52.50,
    total: 682.50
  }
]

export const createOrder = async (req, res) => {
  try {
    const { items, deliveryDetails, paymentMethod, paymentStatus, subtotal, tax, discount, total, couponCode } = req.body

    const orderData = {
      user: req.user?._id,
      items,
      deliveryDetails,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentStatus || (paymentMethod === 'cod' ? 'pending' : 'paid'),
      subtotal,
      tax,
      discount: discount || 0,
      total,
      couponCode,
      status: 'pending'
    }

    if (getIsConnected()) {
      const order = await Order.create(orderData)
      return res.status(201).json({ order })
    }

    const saved = { _id: 'ord_' + Math.random().toString(36).substr(2, 8), createdAt: new Date().toISOString(), ...orderData }
    inMemoryOrders.unshift(saved)
    res.status(201).json({ order: saved })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyOrders = async (req, res) => {
  try {
    if (getIsConnected()) {
      const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
      if (orders.length > 0) return res.json({ orders })
    }
    res.json({ orders: inMemoryOrders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params
    if (getIsConnected()) {
      const order = await Order.findById(id)
      if (order) return res.json({ order })
    }

    const found = inMemoryOrders.find(o => o._id === id)
    if (found) return res.json({ order: found })

    res.status(404).json({ message: 'Order not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    if (getIsConnected()) {
      const orders = await Order.find().sort({ createdAt: -1 })
      if (orders.length > 0) return res.json({ orders })
    }
    res.json({ orders: inMemoryOrders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (getIsConnected()) {
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      if (order) return res.json({ order })
    }

    const idx = inMemoryOrders.findIndex(o => o._id === id)
    if (idx !== -1) {
      inMemoryOrders[idx].status = status
      return res.json({ order: inMemoryOrders[idx] })
    }

    res.status(404).json({ message: 'Order not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

