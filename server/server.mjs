import express from 'express';
import cors from 'cors';
import "./loadEnvironment.mjs";
// import records from "./routes/record.mjs";
// import users from './routes/user.mjs';
import  accounts from './routes/account.mjs';
import connectDB from './config/conn.mjs';

const port = process.env.port || 5050;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connection
const connectionString = process.env.ATLAS_URI || '';
connectDB(connectionString)


//cors policy
app.use(cors());

// //load routes
// app.use("/record", records);
// app.use("/user", users);
app.use("/api/user", accounts);


//start the express server:
app.listen(port, () =>{
  console.log(`app is running on port ${port}`)
});
