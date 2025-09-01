import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connectDB.js";
import cors from "cors";

dotenv.config();

import cookieParser from "cookie-parser";
import "./Config/passport.js";

//routes
import userRoutes from "./Routes/user.routes.js";
import authRoutes from "./Routes/auth.routes.js";

const app = express();


const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json()); //allows use to parse incoming requests from req.body
app.use(cookieParser());

//routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is Running on Port: ", PORT);
});
