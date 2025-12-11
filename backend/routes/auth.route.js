import { Router } from 'express';
import validate from '../middleware/validate.middleware.js';
import {
  signIn,
  signUpSchema,
  verify,
  validateResetPassword,
  validateEmail,
  validateChangePassword,
  validateUpdateProfile,
} from '../validators/user.validator.js';
import {
  basicInfo,
  changePassword,
  forgotPassword,
  login,
  mailDeleteAccount,
  me,
  resendVerifyEmail,
  resetPassword,
  signUp,
  updateProfileAvatar,
  userAccountDeleted,
  verifyEmail,
} from '../controllers/auth.controller.js';
import { uploadMul } from '../middleware/multer.middleware.js';
import isLogged from '../middleware/isLogged.middleware.js';
const auth = Router();

auth.post('/signUp', uploadMul.single('avatar'), validate(signUpSchema), signUp);
auth.patch('/verify-email/:token', validate(verify), verifyEmail);
auth.post('/signIn', validate(signIn), login);
auth.post('/forgot-password', validate(validateEmail), forgotPassword);
auth.patch('/reset-password/:token', validate(validateResetPassword), resetPassword);
auth.patch('/resend-verify-email', validate(validateEmail), resendVerifyEmail);
auth.patch('/change-password', isLogged, validate(validateChangePassword), changePassword);
auth.patch('/update-avatar', isLogged, uploadMul.single('avatar'), updateProfileAvatar);

auth.get('/mail-delete-account', isLogged, mailDeleteAccount);
auth.delete('/delete-account', isLogged, userAccountDeleted);
auth.patch('/update-profile', isLogged, validate(validateUpdateProfile), basicInfo);
auth.get('/me', isLogged, me);

export default auth;
