import { Router } from 'express';
import validate from '../middleware/validate.middleware.js';
import {
  signIn,
  signUpSchema,
  verify,
  validateResetPassword,
  validateEmail,
} from '../validators/user.validator.js';
import {
  forgotPassword,
  login,
  resendVerifyEmail,
  resetPassword,
  signUp,
  verifyEmail,
} from '../controllers/auth.controller.js';
import { uploadMul } from '../middleware/multer.middleware.js';
const auth = Router();

auth.post('/signUp', uploadMul.single('avatar'), validate(signUpSchema), signUp);
auth.patch('/verify-email/:token', validate(verify), verifyEmail);
auth.post('/signIn', validate(signIn), login);
auth.post('/forgot-password', validate(validateEmail), forgotPassword);
auth.patch('/reset-password/:token', validate(validateResetPassword), resetPassword);
auth.patch('/resend-verify-email', validate(validateEmail), resendVerifyEmail);
export default auth;
