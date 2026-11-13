import express from 'express'

const router = express.Router()

router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }
  // In a production app, trigger an email via SendGrid or Azure Communication Services
  res.status(200).json({ success: true, message: 'Message sent to café concierge.' })
})

export default router

