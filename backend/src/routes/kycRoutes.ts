// routes/kycRoutes.ts
import { Router } from 'express';
import { getAllKyc, updateKycStatus ,createKyc} from '../controllers/kycController';

const router = Router();

router.get('/', getAllKyc);
router.put('/:id/status', updateKycStatus);
router.post('/', createKyc);

export default router;
