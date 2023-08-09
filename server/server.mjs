import express from 'express';
import cors from 'cors';
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from './routes/user.mjs';

const port = process.env.port || 5050;
const app = express();

//cross origin resource sharing
app.use(cors());
app.use(express.json());


app.use("/record", records);
app.use("/user", users);

//start the express server:
app.listen(port, () =>{
  console.log(`app is running on port ${port}`)
});
