import mongoose from 'mongoose';

const notice_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details:{
    type: String, required: true, trim : true
  }, 
  date: {
    type: Date, default: Date.now, required: true, trim: true
  }
});

const Notice_model = mongoose.model('notices', notice_Schema); 
export default Notice_model;
