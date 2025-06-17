import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/authorizeRole';
const router = Router();

router.get('/', authenticate, authorizeRole(['ADMIN']), propertyController.listProperties); // list all / filtered
router.post('/:id/review', authenticate, authorizeRole(['ADMIN']), propertyController.reviewProperty); // approve/reject

export default router;
