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

// list all the notices: 
export const Notice_list = async(req, res) => {
    try {
        const notice = await Notice_model.find() ; 
        res.status(200).send(notice); 
        console.log(notice);
    } catch (error) {
        res.send("something went wrong while getting notice lists");
    }
}; 

//total notices 
export const Total_list = async (req, res) => {
    try {
        const notice = await Notice_model.find(); 
        const total_notice = Object.keys(notice).length; 
        res.status(200).send(total_notice.toString());
        console.log(total_notice);
    } catch (error) {
       res.send("somehting went wrong while getting total notice number"); 
    }
};