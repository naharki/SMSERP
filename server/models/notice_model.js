import mongoose from 'mongoose';

const Notice_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details:{
    type: String, required: true, trim : true
  },
  date: {
    type: Date, trim: true, required: true
  } 
});
const Notice_model = mongoose.model('notices', Notice_Schema); 
export default Notice_model;
