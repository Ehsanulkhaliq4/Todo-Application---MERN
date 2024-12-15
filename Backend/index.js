import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../Backend/routes/todo.route.js";
import userRoute from "../Backend/routes/user.route.js";
import cors from "cors";
import cookieParser from 'cookie-parser'
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.MONOGODB_URI;

//cors
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
  })
)

// database configuration
try {
  await mongoose.connect(DB_URI);
  console.log("DB Connect");
} catch (error) {
  console.log(error);
}
//route use
app.use("/todo", todoRoute);
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
