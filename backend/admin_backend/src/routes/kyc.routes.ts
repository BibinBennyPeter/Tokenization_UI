import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/authorizeRole';
import * as kycController from '../controllers/kyc.controller';

const router = Router();

router.get('/', authenticate, authorizeRole(['ADMIN']), kycController.listKYCs);
//approve or reject KYC
router.post('/:userId/review', authenticate, authorizeRole(['ADMIN']), kycController.reviewKYC);

export default router;
