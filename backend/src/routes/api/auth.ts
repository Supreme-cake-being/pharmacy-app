import express from 'express';
import { authController } from '@controllers';

const router = express.Router();

router.get('/verify/:verificationToken', authController.verify);

router.post('/verify', authController.resendVerification);

export default router;
