import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import { notFound, errorHandler } from './middleware/error.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Connect to Database
connectDB()

// Security & Utility Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Brew & Bloom Café API',
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes)

// Serve Frontend in Production or if build exists
const frontendDist = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendDist))

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }
  res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) next()
  })
})

// Error Handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
  console.log(`☕ Brew & Bloom Café Server active on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})

export default app
