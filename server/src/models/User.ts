import { Schema, Types, model } from "mongoose";

interface User {
  fullName: string;
  email: string;
  password: string;
  todos: Array<Types.ObjectId>;
  role: Types.ObjectId;
}

const User = new Schema<User>({
  fullName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Types.ObjectId, ref: "Todo" }],
  role: { type: Schema.Types.ObjectId, ref: "UserRole", required: true },
});

export default model<User>("User", User);
