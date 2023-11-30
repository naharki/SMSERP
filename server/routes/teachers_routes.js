import express from 'express'; 
const router = express.Router(); 
router.use(express.json());

//module imports 
import { teacher_registration, teachers_lists } from '../controllers/teachers_controller.js';
// import check_user_auth from '../middleware/check_auth.mjs';

//Route level middlewate - to protect route
// router.use('/add_teacher', check_user_auth)

//public_routes
router.post('/add_teacher', teacher_registration);
router.get('/teacher_list', teachers_lists);
    
export default router;