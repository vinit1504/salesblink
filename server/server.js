import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { DataBaseConnect } from "./database/dataBaseConnection.js";
import sequenceRoutes from "./routes/sequence/sequence.Routes.js";
import authRoutes from "./routes/auth/auth.Routes.js";

dotenv.config();
DataBaseConnect();

const app = express();

const PORT = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/email", sequenceRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
