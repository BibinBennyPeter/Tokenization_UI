import { Router } from 'express';
import { UserController} from '../controllers/user.controller';

const router = Router();
const userController = new UserController();
router.get("/check-email", userController.checkUserExistsByEmail.bind(userController));
router.get("/", userController.getUser.bind(userController));
router.post('/', userController.registerUser.bind(userController));

router.post("/profile/:id", userController.updateBasicProfile.bind(userController));

router.patch("/:id", userController.patchFullUserProfile.bind(userController));

router.post("/verify/:id", userController.submitKyc.bind(userController));
router.post("/account/:id", userController.submitBankDetails.bind(userController));
router.post("/image/:id", userController.uploadSelfie.bind(userController));

router.get("/verify/:id", userController.getKyc.bind(userController));

export default router;
