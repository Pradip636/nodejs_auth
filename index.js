import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import registrationRoute from "./routes/registrationRoutes.js"
import connectDb from "./config/db.js";

// intialisation 
dotenv.config() // dotenv configure
const app = express();
const port = process.env.PORT || 5000;
connectDb(); //conneting mongodb db

// middleware
app.use(morgan("dev")) // Print Request
app.use(express.json()) // parse json request body
app.use("/",registrationRoute)

// Listening 
app.listen(port, () => {
  console.log(`Listing on ${port}`.bgRed.yellow);
});
