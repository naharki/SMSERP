import '../loadEnvironment.mjs';
import Teacher_model from '../models/addTeacher.js';
import bcrypt from 'bcrypt';

//api for new teacher registration
export const teacher_registration = async (req, res) => {
  const {
    name,
    age,
    emergency_number,
    email,
    gender,
    subject,
    birthdate,
    address,
    education,
    password,
    confirm_password,
    other_detail,
  } = req.body;
  try {
    if (
      name &&
      age &&
      emergency_number &&
      email &&
      gender &&
      gender &&
      subject &&
      birthdate &&
      address &&
      education &&
      other_detail &&
      password &&
      confirm_password
    ) {
      let teacher_existed = await Teacher_model.findOne({ email: email });
      if (teacher_existed) {
        res.status(404).json({ message: 'Teacher Already Existed' });
      } else {
        //check if password and password confirmation is matched
        if (password === confirm_password) {
          const hashed_password = await bcrypt.hash(password, 10);
          const new_teacher = new Teacher_model({
            name: name,
            age: age,
            emergency_number: emergency_number,
            email: email,
            gender: gender,
            subject: subject,
            birthdate: birthdate,
            address: address,
            education: education,
            password: hashed_password,
            other_detail: other_detail,
          });

          await new_teacher.save();
          res.status(200).send({
            Status: 'success',
            message: 'Registration Success',
            teacher: new_teacher,
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

//this is the controller to list all the registered 
//teachers from the backend
export const teachers_lists = async (req, res) => {
  try {
    const teacher_lists = await Teacher_model.find(); 
    res.status(200).send(teacher_lists); 

  } catch (error) {
    res.status(404).send("Error while getting teachers lists"); 
  }
}; 

//display total teachers 
export const total_teachers = async (req, res) => {
  try {
    const teacher_lists = await Teacher_model.find(); 
  const teacher_number = Object.keys(teacher_lists).length; 
  res.status(200).send(teacher_number.toString()); 
  // console.log(teacher_number);
  } catch (error) {
    res.status(404).send("Error while getting teachers numbers"); 
  }
}
