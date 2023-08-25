// import express from 'express';
// import db from '../config/conn.mjs';
// import { ObjectId } from 'mongodb';
// import auth from '../middleware/check_auth.mjs';

// const router = express.Router();

// //This section will help you to create new user records:
// router.post("/", async (req, res)=> {
//     let newUser = {
//         name : req.body.name, 
//         age: req.body.age,
//         sex: req.body.sex,
//         phone: req.body.phone,
//     };

//     let  connection = await db.collection("users");
//     let result = await connection.insertOne(newUser);
//     res.send(result).status(204);
// });

// //This section will help you to get a list of all the records:
// router.get('/',  async(req, res)=> {
//     let collection = await db.collection("users");
//     let results = await collection.find({}).toArray();
//     res.send(results).status(200);
// });

// //This section will help you delete a record.
// router.delete("/:id", async (req, res) => {
//     const query = {_id: new ObjectId(req.params.id)};
    
//     const collection = db.collection("users");
//     let result = await collection.deleteOne(query);
    
//     res.send(result).status(200);
// });

// //This section will delete all the records from the list:
// router.delete('/', async (req, res) => {
//     const collection = db.collection("users");
//     let result = await collection.deleteMany({});
//     res.send(result).status(200);
// });

// // This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("users");
//     let query = {_id: new ObjectId(req.params.id)};
//     let result = await collection.findOne(query);
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });
  

// // This section will help you update a record by id. 
// router.patch("/:id", async (req, res) => {
//     const query = {_id: new ObjectId(req.params.id)};
//     const updates = {
//         $set: {
//             name: req.body.name,
//             age : req.body.age,
//             sex: req.body.sex,
//             phone: req.body.phone,
//         }
//     };

//     let collection = await db.collection("users");
//     let result  = await collection.updateOne(query, updates);
//     res.send(result).status(200);
// });

// export default router;