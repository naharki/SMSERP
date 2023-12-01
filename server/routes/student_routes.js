import express from 'express'; 
const router = express.Router(); 
router.use(express.json());

//module imports 
import { student_lists, student_registration, total_students } from '../controllers/students_controller.js';
import check_user_auth from '../middleware/check_auth.mjs';


//Route level middlewate - to protect route
router.use('/add_student', check_user_auth)

//public_routes
router.post('/add_student', student_registration);
router.get('/student_lists', student_lists);
router.get('/total_students', total_students);
export default router;