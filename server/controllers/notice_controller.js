import '../loadEnvironment.mjs'; 
import Notice_model from '../models/notice_model.js';

//api to add new notice 
export const add_notice = async (req, res) => {
    const {
        title, 
        details, 
        date,
    } = req.body; 
    try{
        if (title && details && date){
            const new_notice = new Notice_model({
                title: title, 
                details:details,
                date: date
            }); 
            await new_notice.save(); 
            res.status(200).send(new_notice);
            console.log(new_notice);
        } else{
            res.send("Al filelds are required");
        }
    } catch(error){
        res.status(404).send(error);
    }
};