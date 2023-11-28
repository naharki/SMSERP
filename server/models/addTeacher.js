import mongoose from 'mongoose';

const teacher_schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
  emergency_number: { type: Number, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  birthdate: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  education: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  other_detail: { type: String, required: true, trim: true },
  
});

const Teacher_model= mongoose.model('teachers', teacher_schema);
export default Teacher_model;
