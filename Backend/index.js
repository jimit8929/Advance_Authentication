import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";

import cookieParser from "cookie-parser";

//routes
import authRoutes from "./Routes/auth.routes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/" , (req , res) => {
  res.send("Hello World");
})

app.use(express.json()); //allows use to parse incoming requests from req.body
app.use(cookieParser());

//routes
app.use("/api/auth" , authRoutes);


app.listen(PORT , () => {
  connectDB();
  console.log("Server is Running on Port: ",PORT);
})

