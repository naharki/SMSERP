import express from 'express'; 
const router = exprees.Router(); 
router.use(express.json()); 


//module imports
import { add_notice } from '../controllers/notice_controller';

//routes
router.post('/add_notice', add_notice);
export default router;