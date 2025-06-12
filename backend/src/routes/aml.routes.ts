import express from 'express';
import * as controller from '../controllers/aml.controller';

const router = express.Router();

// ✅ POST = Add AML Record
router.post('/', controller.addAMLRecord);

// ✅ GET = Fetch all AML Records
router.get('/', controller.getAMLRecords);

export default router;
