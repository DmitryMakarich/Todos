import express from "express";
import config from "config";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", todoRouter);

async function startApp() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () =>
      console.log(`App has been started on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
}

startApp();
