import express from 'express'
import {
  createReservation,
  getAllReservations,
  updateReservationStatus
} from '../controllers/reservationController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createReservation)
router.get('/', protect, adminOnly, getAllReservations)
router.patch('/:id/status', protect, adminOnly, updateReservationStatus)

export default router

