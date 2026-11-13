import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { getIsConnected } from '../config/db.js'

export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'brew_and_bloom_jwt_secret_2025_prod_key')

    if (getIsConnected()) {
      req.user = await User.findById(decoded.id).select('-password')
    } else {
      // Mock / fallback user object
      req.user = {
        _id: decoded.id,
        name: decoded.name || 'Patron',
        email: decoded.email,
        role: decoded.role || 'customer'
      }
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User account not found' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token verification failed' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Access forbidden: administrator privileges required' })
  }
}

