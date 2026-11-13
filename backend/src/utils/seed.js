import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Coupon from '../models/Coupon.js'
import { SEED_PRODUCTS, SEED_COUPONS } from './seedData.js'

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.log('Skipping remote MongoDB seed: MONGODB_URI not set in environment.')
    process.exit(0)
  }

  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB Atlas for database seed...')

    // Clear existing
    await User.deleteMany({})
    await Product.deleteMany({})
    await Coupon.deleteMany({})

    // Seed Users
    const salt = await bcrypt.genSalt(10)
    const adminPassword = await bcrypt.hash('admin123', salt)
    const demoPassword = await bcrypt.hash('demo123', salt)

    await User.create([
      {
        name: 'Café General Manager',
        email: 'admin@brew.com',
        password: adminPassword,
        role: 'admin',
        phone: '9876543210'
      },
      {
        name: 'Priya Sharma (Patron)',
        email: 'demo@brew.com',
        password: demoPassword,
        role: 'customer',
        phone: '9812345678'
      }
    ])
    console.log('✅ Users seeded: admin@brew.com / demo@brew.com')

    // Seed Products
    await Product.insertMany(SEED_PRODUCTS)
    console.log(`✅ ${SEED_PRODUCTS.length} Menu items seeded.`)

    // Seed Coupons
    await Coupon.insertMany(SEED_COUPONS)
    console.log(`✅ ${SEED_COUPONS.length} Coupons seeded.`)

    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Seeding error:', err.message)
    process.exit(1)
  }
}

seedDatabase()

