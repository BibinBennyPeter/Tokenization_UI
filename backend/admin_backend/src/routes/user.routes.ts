import { Router } from 'express';
import { getUsers, createUser,getUserById,deactivateUser,reactivateUser,getUserByRole } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/authorizeRole';
const router = Router();
//get all user
router.get('/',authenticate,authorizeRole(['ADMIN']), getUsers);
//get user by status
router.get('/role/:id',authenticate,authorizeRole(['ADMIN']),getUserByRole)
//create a new user
router.post('/',authenticate,authorizeRole(['ADMIN']), createUser);
//get user by id
router.get('/:id',authenticate,authorizeRole(['ADMIN']), getUserById)
//deactivate user with reason
router.patch('/:id/deactivate', authenticate, authorizeRole(['ADMIN']), deactivateUser);
//reactivate user
router.patch('/:id/activate', authenticate, authorizeRole(['ADMIN']), reactivateUser);
export default router;
