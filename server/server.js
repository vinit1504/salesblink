import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { DataBaseConnect } from "./database/dataBaseConnection.js";

import authRoutes from "./routes/auth/auth.Routes.js";

dotenv.config();
DataBaseConnect();

const app = express();

const Port = process.env.PORT || 8000;

const corsOptions = {
  origin:"http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoutes);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
