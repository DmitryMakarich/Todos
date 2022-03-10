import { Schema, Types, model } from "mongoose";

interface Todo {
  title: string;
  isCompleted: boolean;
  date: Date;
  tag: Types.ObjectId;
  isArchive: boolean;
  user: Types.ObjectId;
}

const Todo = new Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  isCompleted: { type: Boolean, required: true, default: false },
  isArchive: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<Todo>("Todo", Todo);
