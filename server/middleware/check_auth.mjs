import jwt from 'jsonwebtoken';
import '../loadEnvironment.mjs';
import db from '../config/conn.mjs';
import { ObjectId } from 'mongodb';

//check authentication of the user:
const check_user_auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      //verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      // console.warn(userId)
      let collection = await db.collection('accounts');
      let query = { _id: new ObjectId(userId) };
      req.result = await collection.findOne(query);
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
