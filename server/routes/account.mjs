import express from 'express';
const router = express.Router();
router.use(express.json());

//module imports
import {
  change_user_password,
  userRegistration,
} from '../controllers/user_controller.js';
import { userLogin } from '../controllers/user_controller.js';
import check_user_auth from '../middleware/check_auth.mjs';

//Route level middlewate - to protect route.
router.post('/changepassword', check_user_auth);

//public Routes
router.post('/register', userRegistration);
router.post('/login', userLogin);

//Protected Routes
router.post('/changepassword', change_user_password);

export default router;
