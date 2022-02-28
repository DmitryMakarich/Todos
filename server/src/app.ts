import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", todoRouter);

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
