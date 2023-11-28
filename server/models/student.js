import mongoose from 'mongoose';

const student_schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
  parents_number: { type: Number, required: true, trim: true },
  grade: { type: Number, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  birthdate: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  other_detail: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true }
});

const Student_model= mongoose.model('students', student_schema);
export default Student_model;
