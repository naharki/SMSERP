import express from 'express'; 
const router = express.Router(); 
router.use(express.json());

//module imports 
<<<<<<< HEAD
import { teacher_registration, teachers_lists, total_teachers } from '../controllers/teachers_controller.js';
=======
import { teacher_registration, teachers_lists } from '../controllers/teachers_controller.js';
>>>>>>> 12afc06c66d467de93778ca6fa2a43f4444dc116
// import check_user_auth from '../middleware/check_auth.mjs';

//Route level middlewate - to protect route
// router.use('/add_teacher', check_user_auth)

//public_routes
router.post('/add_teacher', teacher_registration);
<<<<<<< HEAD
router.get('/teacher_lists', teachers_lists); 
router.get('/total_teachers', total_teachers);
=======
router.get('/teacher_list', teachers_lists);
    
>>>>>>> 12afc06c66d467de93778ca6fa2a43f4444dc116
export default router;