import express from 'express';
import * as controller from '../controllers/audit.controller';

const router = express.Router();

router.post('/', controller.addAuditLog);
router.get('/', controller.getAuditLogs);

export default router;
