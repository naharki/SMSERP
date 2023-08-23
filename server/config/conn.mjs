import {MongoClient} from 'mongodb';


//database connection
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try{
   conn =await client.connect();
} catch(e){
  console.error(e, 'error while connecting to database');
}

let db = conn.db("sample_training");
export default db;