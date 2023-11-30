import jwt from 'jsonwebtoken';
import '../loadEnvironment.mjs';
import UserModel from '../models/User.js';

//check authentication of the user:
const check_user_auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      //verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    //   console.warn(userId)
      // console.warn(userId)
      req.user = await UserModel.findById(userId).select('-password');
        // console.warn(req.user);
      next();
    } catch (error) {
      res.status(401).send({ status: 'failed', message: 'Unauthorized user' });
    }
  } else {
    if (!token) {
      res
        .status(404)
        .send({ status: 'failed', message: 'Unauthorized user, no token' });
    }
  }
};

export default check_user_auth;
