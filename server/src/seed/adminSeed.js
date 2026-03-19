import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import { ROLES } from '../constants/roles.js';

dotenv.config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
});

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@travelease.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.findOneAndUpdate(
      { email },
      {
        name: 'TravelEase Admin',
        email,
        password: hashedPassword,
        phone: '+94 11 555 0110',
        role: ROLES.ADMIN,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin ready: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
