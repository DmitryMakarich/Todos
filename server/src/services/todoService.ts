import moment, { unitOfTime } from "moment";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { PipelineStage } from "mongoose";
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

  async getStats(userId: ObjectId, tags: Array<ObjectId>) {
    const reducePiplines: Array<PipelineStage> = [
      {
        $project: {
          dayCount: {
            $reduce: {
              input: "$dayCount",
              initialValue: { count: 0 },
              in: { $first: "$dayCount" },
            },
          },
          weekCount: {
            $reduce: {
              input: "$weekCount",
              initialValue: { count: 0 },
              in: { $first: "$weekCount" },
            },
          },
          allTimeCount: {
            $reduce: {
              input: "$allTimeCount",
              initialValue: { count: 0 },
              in: { $first: "$allTimeCount" },
            },
          },
        },
      },
      {
        $project: {
          initialValues: "$values",
          dayCount: "$dayCount.count",
          weekCount: "$weekCount.count",
          allTimeCount: "$allTimeCount.count",
        },
      },
    ];

    const completed = await Todo.aggregate([
      {
        $facet: {
          dayCount: [
            {
              $match: {
                user: userId,
                completedDate: {
                  $gt: moment().startOf("day").toDate(),
                },
                isCompleted: true,
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
          weekCount: [
            {
              $match: {
                user: userId,
                completedDate: {
                  $gt: moment().startOf("isoWeek").toDate(),
                },
                isCompleted: true,
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
          allTimeCount: [
            {
              $match: {
                user: userId,
                isCompleted: true,
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
        },
      },
      ...reducePiplines,
    ]);

    const created = await Todo.aggregate([
      {
        $facet: {
          dayCount: [
            {
              $match: {
                user: userId,
                creationDate: {
                  $gt: moment().startOf("day").toDate(),
                },
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
          weekCount: [
            {
              $match: {
                user: userId,
                creationDate: {
                  $gt: moment().startOf("isoWeek").toDate(),
                },
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
          allTimeCount: [
            {
              $match: {
                user: userId,
                isArchive: false,
                tag: tags.length ? { $in: [...tags] } : ObjectId,
              },
            },
            { $count: "count" },
          ],
        },
      },
      ...reducePiplines,
    ]);

    return {
      completed: completed[0],
      created: created[0],
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
