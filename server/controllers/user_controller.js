import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import '../loadEnvironment.mjs';
import UserModel from '../models/User.js';
import mongoose from 'mongoose';
import transporter from '../config/emailConfig.js';

//api for new user registration
export const userRegistration = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  try {
    let userExisted = await UserModel.findOne({ email: email });

    if (userExisted) {
      res.status(400).json({ message: 'User Already existed' });
    } else {
      //check if password & password confirmation is matched
      if (password === password_confirmation) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          name: name,
          email: email,
          password: hashedPassword,
        });

        //save inserted data in the database
        await newUser.save();
        // console.warn(newUser._id.toString());

        // generate jwt
        // .toString() return only string part,
        //if newUser._id => new ObjectId("64e775f788673405d2ec3bdc")
        //if newUser._id.toString() => 64e776e0bfd81e83e9a5e8f1

        //genereate token based on userId of the inserted user
        const token = await jwt.sign(
          { userId: newUser._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: '1hr' }
        );

        res.status(201).send({
          Status: 'success',
          message: 'Registration Success',
          Token: token,
          user: newUser,
        });
      } else {
        res.status().send({
          status: 'failed',
          message: 'Password and confirm password doesnot match',
        });
      }
    }
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).send('Server error');
  }
};

//api for login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user != null) {
        const is_user_valid = await bcrypt.compare(password, user.password);
        if (!is_user_valid) {
          return res.status(401).json({ message: 'Invalid Password' });
        } else {
          //generate jwt token
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );

          return res.status(200).send({
            message: 'Login Successful',
            token: token,
            expiresIn: 3600,
            userId: user._id,
          });
        }
      } else {
        return res
          .status(404)
          .send({ status: 'failed', message: 'User not registered' });
      }
    } else {
      return res.status(404).send({
        status: 'failed',
        message: 'All field are required',
      });
    }
  } catch (error) {
    console.error('login error', error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// //change user password
export const change_user_password = async (req, res) => {
  try {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        return res.send({
          status: 'failed',
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: {
            password: hashedPassword,
          },
        });
        return res.send({
          status: 'ok',
          message: 'Password Changed successfully.',
        });
      }
    } else {
      res.send({ status: 'failed', message: 'All Fields are Required' });
    }
  } catch (error) {
    res.send({ status: 'failed', message: 'problem while setting password' });
  }
};

//logged user
export const loggedUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.send({ status: 'failed', message: 'Error while getting user details' });
  }
};

/// Reset password//
///Send email link to reset password//
//This will create a link and send to the frontend
export const resetPasswordSendEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET;

      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: '15min',
      });

      //link this is frontend link not backend link
      const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
      // console.warn(link);

      // Send Email
      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: ' - Password Reset Link',
        html: `<a href=${link}>Click Here</a> to Reset Your Password`,
      });
      res.status(200).send({
        status: 'Success',
        message: 'Reset password email sent, check your email',
        info: info,
      });
    } else {
      res.status(401).send({
        status: 'Failed',
        message: 'Email doesnot exit.',
      });
    }
  } else {
    res.status(401).send({
      status: 'Failed',
      message: 'Email required',
    });
  }
};

///user password reset method this will work when user click on the generated link
export const resetPassword = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { id, token } = req.params;
  const user = await UserModel.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET;

  try {
    jwt.verify(token, new_secret);
    if (password && password_confirmation) {
      if (password === password_confirmation) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.findByIdAndUpdate(user._id, {
          $set: {
            password: hashedPassword,
          },
        });
        res
          .status(200)
          .send({ status: 'success', message: 'Password Reset Successfully' });
      } else {
        res.status(404).send({
          status: 'Failed',
          message: 'Password and confirm password must be matched',
        });
      }
    } else {
      res.status(401).send({
        status: 'Failed',
        message: 'All fields are required',
      });
    }
  } catch (error) {
    res.status(404).send({ status: 'Failed', message: 'Invalid token' });
  }
};
