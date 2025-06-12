import express from 'express';
import * as controller from '../controllers/regulatory.controller';

const router = express.Router();

router.post('/', controller.uploadRegulatoryDoc);
router.get('/', controller.getRegulatoryDocs);

export default router;
