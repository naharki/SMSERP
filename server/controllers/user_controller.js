import db from '../config/conn.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import '../loadEnvironment.mjs';

//const imports

export const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let connection = await db.collection('accounts');
    let userExisted = await connection.findOne({ email: email });

    if (userExisted) {
      res.status(400).json({ message: 'User Already existed' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    let result = await connection.insertOne(newUser);
    const saved_user = await connection.findOne({ email: email });

    //generate jwt
    const token = await jwt.sign(
      { userId: saved_user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1hr' }
    );
    res
      .status(201)
      .send({
        Status: 'success',
        message: 'Registration Success',
        Token: token,
        user: result,
      });
  } catch (error) {
    console.error('login error', error);
    res.status(500).send('Server error');
  }
};

//api for login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await db.collection('accounts');
    let user = await connection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const is_user_valid = await bcrypt.compare(password, user.password);
    if (!is_user_valid) {
      res.status(401).json({ message: 'Invalid Password' });
    }

    //generate jwt token
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).send({
      message: 'Login Successful',
      token: token,
      expiresIn: 3600,
      userId: user._id,
    });
    // res.status(200).json({ message: 'Login Successful' });
  } catch (error) {
    console.error('login error', error);
    res.status(500).json({ message: 'Internal server Error' });
  }
};

//change user password
export const change_user_password = async (req, res) => {
  const { password, confirm_password } = req.body;
  if (password && confirm_password) {
    if (password !== confirm_password) {
      res.send({
        status: 'failed',
        message: 'new password and confirm password does not match.',
      });
    } else {
//hash password
const hashedPassword = await bcrypt.hash(password, 10);
res.send({"status":"success", "message":"password changed successfully"})
    }
  } else {
    res.send({
      status: 'failed',
      message: 'All fields are required',
    });
  }
};
