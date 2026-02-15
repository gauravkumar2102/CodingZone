import mongoose from 'mongoose';

// Connect to MongoDB using the connection string in MONGO_URL
const main = async () => {
   try {
      if (!process.env.MONGO_URL) {
         throw new Error('MONGO_URL is not set');
      }

      await mongoose.connect(process.env.MONGO_URL);
      console.log('Database connected');
   } catch (error) {
      console.error('Error in DB connection', error);
      throw error; // surface the error so the caller can handle it
   }
}; 

export default main;