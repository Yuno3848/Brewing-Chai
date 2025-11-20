import { Router } from 'express';
import validate from '../middleware/validate.middleware.js';
import { signUpSchema } from '../validators/user.validator.js';
import { signUp } from '../controllers/auth.controller.js';
import { uploadMul } from '../middleware/multer.middleware.js';
const auth = Router();

auth.post('/signUp', uploadMul.single('avatar'), validate(signUpSchema), signUp);

export default auth;
