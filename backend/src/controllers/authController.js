import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { getIsConnected } from '../config/db.js'

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET || 'brew_and_bloom_jwt_secret_2025_prod_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' })
    }

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() })
      if (userExists) {
        return res.status(400).json({ message: 'An account with this email already exists' })
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phone,
        role: 'customer'
      })

      const token = generateToken(user)
      return res.status(201).json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
      })
    } else {
      // In-memory fallback
      const mockUser = {
        _id: 'usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        role: 'customer',
        phone: phone || ''
      }
      const token = generateToken(mockUser)
      return res.status(201).json({ token, user: mockUser })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Direct check for demo credentials
    if (email === 'admin@brew.com' && password === 'admin123') {
      const adminUser = {
        _id: 'admin_root_1',
        name: 'Café General Manager',
        email: 'admin@brew.com',
        role: 'admin'
      }
      const token = generateToken(adminUser)
      return res.json({ token, user: adminUser })
    }

    if (email === 'demo@brew.com' && password === 'demo123') {
      const demoUser = {
        _id: 'customer_demo_1',
        name: 'Priya Sharma',
        email: 'demo@brew.com',
        role: 'customer'
      }
      const token = generateToken(demoUser)
      return res.json({ token, user: demoUser })
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }

      const token = generateToken(user)
      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
      })
    } else {
      return res.status(401).json({ message: 'Invalid credentials. You can use demo accounts: admin@brew.com or demo@brew.com' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    res.json({ user: req.user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body
    if (getIsConnected()) {
      const user = await User.findById(req.user._id)
      if (user) {
        user.name = name || user.name
        user.phone = phone || user.phone
        await user.save()
        return res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone } })
      }
    }

    // Mock update
    const updated = { ...req.user, name: name || req.user.name, phone: phone || req.user.phone }
    res.json({ user: updated })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

