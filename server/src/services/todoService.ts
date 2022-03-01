import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Todo from "../models/Todo";
import User from "../models/User";

interface TodoData {
  title: string;
  isCompleted?: boolean;
  tagId: ObjectId;
}

class TodoService {
  async getTodos(userId: ObjectId) {
    return Todo.find({ user: userId });
  }

  async create(data: TodoData, userId: ObjectId) {
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      const user = await User.findOne({ _id: userId }).session(session);

      const todo = new Todo({
        title: data.title,
        tag: data.tagId,
        user: userId,
      });

      await todo.save({ session });

      user.todos.push(todo._id);

      await user.save({ session });

      return todo;
    });

    session.endSession();

    return Todo.findOne({
      title: data.title,
      tag: data.tagId,
      user: userId,
    }).lean();
  }

  async update(id: ObjectId, data: TodoData) {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: data.title,
        isCompleted: data.isCompleted,
        tag: data.tagId,
      },
      { returnDocument: "after" }
    ).lean();

    return updatedTodo;
  }

  async delete(id: ObjectId) {
    const deleted = await Todo.findByIdAndDelete(id);

    return deleted;
  }
}

export default new TodoService();
