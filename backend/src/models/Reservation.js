import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 20 },
  specialRequests: { type: String },
  status: {
    type: String,
    enum: ['confirmed', 'seated', 'completed', 'cancelled'],
    default: 'confirmed',
  },
}, {
  timestamps: true,
})

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema)
export default Reservation

