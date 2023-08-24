import express from 'express';
import cors from 'cors';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from './routes/user.mjs';
import  accounts from './routes/account.mjs';

const port = process.env.port || 5050;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



//cross origin resource sharing
//cors policy


//load routes
app.use("/record", records);
app.use("/user", users);
app.use("/api/account", accounts);


//start the express server:
app.listen(port, () =>{
  console.log(`app is running on port ${port}`)
});
