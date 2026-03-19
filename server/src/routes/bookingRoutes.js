import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  getMyBookings,
  updateBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getBookings);
router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
