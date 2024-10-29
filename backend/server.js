import mongoose from "mongoose";
import express from "express";
import router from "./routes/indexRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_BASE_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
    //can try retry mechanism using setTimout
  });
