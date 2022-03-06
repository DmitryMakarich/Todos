import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";
import tagRouter from "./routes/tag.routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api", todoRouter, tagRouter);

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`App has been started on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();

