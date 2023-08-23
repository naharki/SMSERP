import jwt from 'jsonwebtoken';
import '../loadEnvironment.mjs';
import db from '../config/conn.mjs';


//module exports
const check_user_auth = async (req, res, Next) => {
  const { authorization } = req.headers;
  let token
  if (authorization && authorization.startsWith('Bearer')) {
    try {
       token = authorization.split(' ')[1];

      //verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      // console.warn(userId)

      //get user from tokennp
      let connection = await db.collection('accounts');
      req.userData = await connection.findOne({ _id: userId }, { projection: { password: 0 } });
      console.warn(userData)
      Next();
    } catch (error) {
      res.status(401).send({ status: 'failed', message: 'Unauthorized user' });
    }
  } else {
    if (!token) {
      
        res.status(404)
        .send({ status: 'failed', message: 'Unauthorized user, no token' });
    }
  }
};

export default check_user_auth;
