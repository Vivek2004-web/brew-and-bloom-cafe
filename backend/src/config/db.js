import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.warn('⚠️  MONGODB_URI not provided. Running in memory / mock fallback mode for database operations.')
    return false
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    isConnected = true
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`)
    return true
  } catch (error) {
    console.warn(`⚠️  MongoDB Atlas connection failed (${error.message}). Running with in-memory resilient fallback so server stays operational.`)
    return false
  }
}

export const getIsConnected = () => isConnected

