import { Schema, model } from "mongoose";

interface UserRole {
  role: string;
}

const UserRole = new Schema<UserRole>({
  role: { type: String, required: true },
});

export default model<UserRole>("UserRole", UserRole);
