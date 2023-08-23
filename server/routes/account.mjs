import express from 'express';
import cors from 'cors';



//module imports
import {change_user_password, userRegistration} from '../controllers/user_controller.js';
import { userLogin } from '../controllers/user_controller.js';
import check_user_auth from '../middleware/check_auth.mjs';

//const imports
const router = express.Router();
router.use(cors());

//Route level middlewate - to protect route.
router.post('/changepassword', check_user_auth)


// This is the api for user
//public Routes
router.post('/register', userRegistration);
router.post('/login', userLogin );

//Protected Routes
router.post('/changepassword', change_user_password);

export default router;
