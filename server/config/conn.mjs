import mongoose from 'mongoose';

const connectDB = async (connectionString) => {
  try {
    const DB_OPTIONS = {
      dbName : "sample_training",
    };
    await mongoose.connect(connectionString, DB_OPTIONS);
    console.warn('Db connect successfully');
  } catch (e) {
    console.error(e, 'error while connecting to database');
  }
};
 export default connectDB;