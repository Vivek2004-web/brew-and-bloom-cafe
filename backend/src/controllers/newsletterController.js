import Newsletter from '../models/Newsletter.js'
import { getIsConnected } from '../config/db.js'

let inMemorySubscribers = []

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email' })
    }

    const lower = email.toLowerCase()

    if (getIsConnected()) {
      const exists = await Newsletter.findOne({ email: lower })
      if (exists) {
        return res.status(400).json({ message: 'You are already subscribed to our newsletter' })
      }
      await Newsletter.create({ email: lower })
      return res.status(201).json({ message: 'Subscribed successfully! Welcome gift voucher sent.' })
    }

    if (inMemorySubscribers.includes(lower)) {
      return res.status(400).json({ message: 'You are already subscribed to our newsletter' })
    }

    inMemorySubscribers.push(lower)
    res.status(201).json({ message: 'Subscribed successfully! Welcome to the Brew & Bloom society.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

