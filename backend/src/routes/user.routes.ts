import { Router } from 'express';
import { UserController} from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/profile/:id', userController.updateBasicProfile.bind(userController));
router.post('/register', userController.registerUser.bind(userController));
router.post("/verify/:id", userController.submitKyc.bind(userController));
router.post("/account/:id", userController.submitBankDetails.bind(userController));
router.post("/image/:id", userController.uploadSelfie.bind(userController));
router.get("user/:id", userController.getUserWithDetails.bind(userController));
router.patch("user/:id", userController.patchFullUserProfile.bind(userController));
router.get("/verify/:id", userController.getKyc.bind(userController));

export default router;
