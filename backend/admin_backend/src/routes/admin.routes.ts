import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/authorizeRole';
const router = Router();

// Public routes (no authentication required)

router.post('/login', adminController.loginAdmin);

// Protected routes (authentication required)
router.post('/',authenticate,authorizeRole(['ADMIN']), adminController.createAdmin);
router.get('/', authenticate,authorizeRole(['ADMIN']), adminController.getAdmins);

export default router;