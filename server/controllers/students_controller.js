import '../loadEnvironment.mjs';
import bcrypt from 'bcrypt';
import student_model from '../models/student.js';

//api for new teacher registration
export const student_registration = async (req, res) => {
  const {
    name,
    age,
    parents_number,
    gender,
    birthdate,
    grade,
    address,
    other_detail,
    password,
    confirm_password,
  } = req.body;
  try {
    if (
      name &&
      age &&
      parents_number &&
      grade &&
      gender &&
      birthdate &&
      address &&
      other_detail &&
      password &&
    confirm_password
    ) {
      let student_existed = await student_model.findOne({ name: name });
      if (student_existed) {
        res.status(404).json({ message: 'Student Already Existed' });
      } else {
        //check if password and password confirmation is matched
        if (password === confirm_password) {
          const hashed_password = await bcrypt.hash(password, 10);
          const new_student = new student_model({
            name: name,
            age: age,
            parents_number: parents_number,
            grade: grade,
            gender: gender,

            birthdate: birthdate,
            address: address,

            password: hashed_password,
            other_detail: other_detail,
          });

          await new_student.save();
          res.status(200).send({
            Status: 'success',
            message: 'Registration Success',
            student: new_student,
          });
        } else {
          res.status(404).send({
            status: 'Failed',
            message: 'password and confirm_password doesnot matched.',
          });
        }
      }
    } else {
      res.status(404).send({
        status: 'Failed',
        message: 'All fields are required.',
      });
    }
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).send('Server error');
  }
};
