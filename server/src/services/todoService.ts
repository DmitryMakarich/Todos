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
  async getTodos(
    userId: ObjectId,
    limit: number,
    page: number,
    filter?: boolean
  ) {
    const isCompleted = !filter ? [true, false] : filter;

    const todos = await Todo.find({
      user: userId,
      isArchive: false,
      isCompleted,
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Todo.countDocuments({
      user: userId,
      isArchive: false,
      isCompleted,
    });

    return { todos, count };
  }

  async create(data: TodoData, userId: ObjectId) {
    const session = await mongoose.startSession();

    let todo;

    await session.withTransaction(async () => {
      const user = await User.findOne({ _id: userId }).session(session);

      todo = new Todo({
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

    return todo.toObject();
  }

  async update(id: ObjectId, data: TodoData) {
    return Todo.findByIdAndUpdate(
      id,
      {
        title: data.title,
        isCompleted: data.isCompleted,
        tag: data.tagId,
      },
      { returnDocument: "after" }
    ).lean();
  }

  async delete(id: ObjectId) {
    const todo = await Todo.findByIdAndUpdate(id, {
      $set: {
        isArchive: true,
      },
    });

    return todo;
  }
}

export default new TodoService();
