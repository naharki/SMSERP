import '../loadEnvironment.mjs'; 
// import bcrypt from 'bcrypt'; 
import Notice_model from '../models/notice_model';


//api to add new notice 
export const add_notice = async (req, res) => {
    const {
        title, 
        notice, 
        date
    } = req.body; 
    try{
        if (title && notice && date){
            const new_notice = new Notice_model({
                title: title, 
                notice: notice, 
                date: date
            }); 
            await new_notice.save(); 
            res.status(200).send(new_notice);
        } else{
            res.send("Al filelds are required");
        }
    } catch(error){
        res.status(404).send("Error while adding notice");
    }
};