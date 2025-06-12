import { Router } from 'express';
import { UserController,submitKyc,submitBankDetails,uploadSelfie,getUserWithDetails,patchFullUserProfile,getKycByUserId } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/profile/:id', userController.updateBasicProfile.bind(userController));
router.post("/verify/:id", submitKyc);
router.post("/account/:id", submitBankDetails);
router.post("/image/:id", uploadSelfie);
router.get("user/:id", getUserWithDetails);
router.patch("user/:id", patchFullUserProfile);
router.get("/verify/:id", getKycByUserId);

export default router;
