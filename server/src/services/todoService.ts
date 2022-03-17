import moment, { unitOfTime } from "moment";
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

  async getStats(userId: ObjectId, time: string, tags: Array<ObjectId>) {
    let searchingTime: unitOfTime.StartOf;

    switch (time) {
      case "day":
        searchingTime = "day";
        break;
      case "week":
        searchingTime = "isoWeek";
        break;
      default:
        searchingTime = null;
        break;
    }

    let completed;
    let created;

    const session = await Todo.startSession();

    await session.withTransaction(async () => {
      completed = await Todo.aggregate([
        {
          $match: {
            user: userId,
            completedDate: searchingTime
              ? {
                  $gt: moment().startOf(searchingTime).toDate(),
                  $lte: moment().endOf(searchingTime).toDate(),
                }
              : Date,
            isCompleted: true,
            isArchive: false,
            tag: tags.length ? { $in: [...tags] } : ObjectId,
          },
        },
        { $count: "count" },
      ]).session(session);

      created = await Todo.aggregate([
        {
          $match: {
            user: userId,
            creationDate: searchingTime
              ? {
                  $gt: moment().startOf(searchingTime).toDate(),
                  $lte: moment().endOf(searchingTime).toDate(),
                }
              : Date,
            isArchive: false,
            tag: tags.length ? { $in: [...tags] } : ObjectId,
          },
        },
        { $count: "count" },
      ]).session(session);
    });

    const completedCount = completed.length ? completed[0].count : 0;
    const createdCount = created.length ? created[0].count : 0;

    return {
      completedCount,
      createdCount,
    };
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
    const session = await Todo.startSession();

    let todo;

    await session.withTransaction(async () => {
      const updatedTodo = await Todo.findById(id);

      if (updatedTodo.isCompleted && !data.isCompleted) {
        todo = await Todo.findByIdAndUpdate(
          id,
          {
            title: data.title,
            isCompleted: data.isCompleted,
            tag: data.tagId,
            $unset: {
              completedDate: "",
            },
          },
          { returnDocument: "after" }
        ).lean();

        return;
      }

      todo = await Todo.findByIdAndUpdate(
        id,
        {
          title: data.title,
          isCompleted: data.isCompleted,
          tag: data.tagId,
          completedDate: Date.now(),
        },
        { returnDocument: "after" }
      ).lean();
    });

    return todo;
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
