import { Schema, Types, model } from "mongoose";

interface User {
  fullName: string;
  email: string;
  password: string;
  todos: Array<Types.ObjectId>;
}

const User = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Types.ObjectId, ref: "Todo" }],
});

export default model<User>("User", User);
