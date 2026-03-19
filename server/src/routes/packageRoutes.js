import express from 'express';
import {
  createPackage,
  getPackageById,
  getPackages,
} from '../controllers/packageController.js';
import { ROLES } from '../constants/roles.js';
import { protect } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post(
  '/',
  protect,
  allowRoles(ROLES.ADMIN, ROLES.MARKETING_MANAGER),
  createPackage
);

export default router;
