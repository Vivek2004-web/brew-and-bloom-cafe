import Reservation from '../models/Reservation.js'
import { getIsConnected } from '../config/db.js'

let inMemoryReservations = [
  {
    _id: 'res_101',
    name: 'Kabir & Saira',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '07:00 PM',
    guests: 2,
    phone: '9820011223',
    email: 'kabir@example.com',
    specialRequests: 'Quiet corner table near the plants for anniversary',
    status: 'confirmed'
  }
]

export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body

    if (!name || !date || !time || !guests || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    const reservationData = {
      user: req.user?._id,
      name,
      email,
      phone,
      date,
      time,
      guests: Number(guests),
      specialRequests,
      status: 'confirmed'
    }

    if (getIsConnected()) {
      // Check for overlapping reservations
      const existing = await Reservation.countDocuments({ date, time, status: 'confirmed' })
      if (existing >= 10) {
        return res.status(400).json({ message: 'Selected time slot is fully booked. Please choose another hour.' })
      }

      const reservation = await Reservation.create(reservationData)
      return res.status(201).json({ reservation })
    }

    const saved = { _id: 'res_' + Math.random().toString(36).substr(2, 6), ...reservationData }
    inMemoryReservations.unshift(saved)
    res.status(201).json({ reservation: saved })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllReservations = async (req, res) => {
  try {
    if (getIsConnected()) {
      const reservations = await Reservation.find().sort({ date: 1, time: 1 })
      if (reservations.length > 0) return res.json({ reservations })
    }
    res.json({ reservations: inMemoryReservations })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (getIsConnected()) {
      const reservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true })
      if (reservation) return res.json({ reservation })
    }

    const idx = inMemoryReservations.findIndex(r => r._id === id)
    if (idx !== -1) {
      inMemoryReservations[idx].status = status
      return res.json({ reservation: inMemoryReservations[idx] })
    }

    res.status(404).json({ message: 'Reservation not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

