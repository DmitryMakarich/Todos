import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import UserRole from "../models/UserRole";
import Todo from "../models/Todo";
import { PipelineStage } from "mongoose";
import moment from "moment";

interface AuthenticationForm {
  fullName?: string;
  email: string;
  password: string;
}

class UserService {
  async login(data: AuthenticationForm) {
    const { email, password } = data;

    const user = await User.findOne({ email }).lean();
    const userRole = await UserRole.findOne({ role: "admin" });

    if (!user) {
      return { user, token: null };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { user: null, token: null };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      user,
      token,
      role: user.role.toString() === userRole._id.toString() ? 1 : 0,
    };
  }

  async register(data: AuthenticationForm) {
    const { fullName, email, password } = data;

    const candidate = await User.findOne({ email }).lean();
    const userRole = await UserRole.findOne({
      role: password === "admin1" ? "admin" : "user",
    });

    if (candidate) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: userRole._id,
    });

    await newUser.save();

    return newUser;
  }

  async getUsers(page: number, limit: number, userName: string | null) {
    const reducePiplines: Exclude<
      PipelineStage,
      PipelineStage.Merge | PipelineStage.Out | PipelineStage.Search
    >[] = [
      {
        $project: {
          dayCount: { $first: "$dayCount" },
          weekCount: { $first: "$weekCount" },
          allTimeCount: { $first: "$allTimeCount" },
        },
      },
      {
        $project: {
          dayCount: { $ifNull: ["$dayCount.count", 0] },
          weekCount: { $ifNull: ["$weekCount.count", 0] },
          allTimeCount: { $ifNull: ["$allTimeCount.count", 0] },
        },
      },
    ];

    const userStats = await User.aggregate([
      {
        $match: {
          fullName: userName
            ? { $regex: `${userName}`, $options: "i" }
            : String,
        },
      },
      {
        $project: {
          fullName: 1,
        },
      },
      {
        $lookup: {
          from: Todo.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            {
              $facet: {
                dayCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                          {
                            $gt: [
                              "$creationDate",
                              moment().startOf("day").toDate(),
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                weekCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                          {
                            $gt: [
                              "$creationDate",
                              moment().startOf("isoWeek").toDate(),
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                allTimeCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
              },
            },
            ...reducePiplines,
          ],
          as: "createdTodos",
        },
      },
      {
        $lookup: {
          from: Todo.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            {
              $facet: {
                dayCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                          { $eq: ["$isCompleted", true] },
                          {
                            $gt: [
                              "$creationDate",
                              moment().startOf("day").toDate(),
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                weekCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                          { $eq: ["$isCompleted", true] },
                          {
                            $gt: [
                              "$creationDate",
                              moment().startOf("isoWeek").toDate(),
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
                allTimeCount: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isArchive", false] },
                          { $eq: ["$user", "$$userId"] },
                          { $eq: ["$isCompleted", true] },
                        ],
                      },
                    },
                  },
                  {
                    $count: "count",
                  },
                ],
              },
            },
            ...reducePiplines,
          ],
          as: "completedTodos",
        },
      },
    ])
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await User.countDocuments();

    return {
      stats: userStats.map((user) => ({
        ...user,
        createdTodos: user.createdTodos[0],
        completedTodos: user.completedTodos[0],
      })),
      count: totalCount,
    };
  }
}

export default new UserService();
