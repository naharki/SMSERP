import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

//This section will help you to create new user records:
router.post("/", async (req, res)=> {
    let newUser = {
        name : req.body.name, 
        age: req.body.age,
        sex: req.body.sex, 
        phone: req.body.phone,
    };

    let  connection = await db.collection("users");
    let result = await connection.insertOne(newUser);
    res.send(result).status(204);
});

//This section will help you to get a list of all the records:
router.get('/', async(req, res)=> {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//This section will help you delete a record.
router.delete("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    
    const collection = db.collection("users");
    let result = await collection.deleteOne(query);
    
    res.send(result).status(200);
});

//This section will delete all the records from the list:
router.delete('/', async (req, res) => {
    const collection = db.collection("users");
    let result = await collection.deleteMany({});
    res.send(result).status(200);
})
export default router;