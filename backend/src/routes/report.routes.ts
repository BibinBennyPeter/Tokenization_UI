import express from 'express';
import * as controller from '../controllers/report.controller';

const router = express.Router();

router.get('/', controller.getComplianceReport);

export default router;
