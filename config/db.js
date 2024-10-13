import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`db connected ${mongoose.connection.host}`.bgBlue.bgBlack);
  } catch (error) {
    console.log(`db connect error ${error}`.bgCyan.white);
  }
};


export default connectDb