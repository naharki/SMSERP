import express from 'express';
const router = express.Router();
router.use(express.json());

// //module imports
import {
  change_user_password,
  userRegistration,
  userLogin,
  loggedUser,
  resetPassword,
  resetPasswordSendEmail,
} from '../controllers/user_controller.js';
import check_user_auth from '../middleware/check_auth.mjs';

// //Route level middlewate - to protect route.
router.use('/changepassword', check_user_auth);
router.use('/loggeduser', check_user_auth);

// //public Routes
router.post('/register', userRegistration);
router.post('/login', userLogin);
router.post('/reset-password-email', resetPasswordSendEmail);
router.post('/reset-password/:id/:token', resetPassword);

// //Protected Routes
router.post('/changepassword', change_user_password);
router.get('/loggeduser', loggedUser);

export default router;
