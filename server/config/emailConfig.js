import '../loadEnvironment.mjs'; //this file contain calling module for .env file
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, //true for: 465 , false for others
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER, //admin
    pass: process.env.EMAIL_PASS, //admin pasword
  },
});

export default transporter;
