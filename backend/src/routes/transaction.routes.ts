import express from 'express';
import * as controller from '../controllers/aml.controller';

const router = express.Router();

// Correct handlers
router.post('/', controller.addAMLRecord);       // ✅ POST: Create AML Record
router.get('/', controller.getAMLRecords);       // ✅ GET: Get All AML Records

export default router;
