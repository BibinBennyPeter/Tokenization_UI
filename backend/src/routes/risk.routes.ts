import express from 'express';
import * as controller from '../controllers/risk.controller';

const router = express.Router();

router.get('/', controller.getAllRiskProfiles);
router.post('/:userId/calculate', controller.recalculateRisk);
router.patch('/:userId/freeze', controller.freezeUser);
router.patch('/:userId/unfreeze', controller.unfreezeUser);

export default router;
