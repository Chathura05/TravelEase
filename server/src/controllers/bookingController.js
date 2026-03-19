import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import { ROLES } from '../constants/roles.js';

const canManageAllBookings = (role) =>
  [ROLES.ADMIN, ROLES.FINANCE_MANAGER, ROLES.SUPPORT_AGENT].includes(role);

export const createBooking = async (req, res) => {
  try {
    const { packageId, travelersCount, travelDate } = req.body;

    if (!packageId || !travelDate || !travelersCount) {
      return res
        .status(400)
        .json({ message: 'Package, traveler count, and travel date are required' });
    }

    const travelPackage = await Package.findById(packageId);

    if (!travelPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      travelPackage: travelPackage._id,
      travelersCount,
      totalPrice: travelersCount * travelPackage.price,
      travelDate,
    });

    const populatedBooking = await booking.populate('travelPackage', 'title destination price');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('travelPackage', 'title destination price duration')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const filters = canManageAllBookings(req.user.role) ? {} : { user: req.user._id };
    const bookings = await Booking.find(filters)
      .populate('travelPackage', 'title destination price duration')
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('travelPackage', 'title destination price duration')
      .populate('user', 'name email role');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (
      booking.user._id.toString() !== req.user._id.toString() &&
      !canManageAllBookings(req.user.role)
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('travelPackage', 'price');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const isOwner = booking.user.toString() === req.user._id.toString();
    const isManager = canManageAllBookings(req.user.role);

    if (!isOwner && !isManager) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (typeof req.body.travelersCount !== 'undefined') {
      booking.travelersCount = Number(req.body.travelersCount);
      booking.totalPrice = booking.travelersCount * booking.travelPackage.price;
    }

    if (req.body.travelDate) {
      booking.travelDate = req.body.travelDate;
    }

    if (isManager && req.body.status) {
      booking.status = req.body.status;
    }

    if (isManager && req.body.paymentStatus) {
      booking.paymentStatus = req.body.paymentStatus;
    }

    await booking.save();
    const updated = await booking.populate('travelPackage', 'title destination price duration');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const isOwner = booking.user.toString() === req.user._id.toString();
    const isManager = canManageAllBookings(req.user.role);

    if (!isOwner && !isManager) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
