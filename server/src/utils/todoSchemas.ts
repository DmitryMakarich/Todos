import { body, param } from "express-validator";
import { ObjectId } from "mongodb";

const getStatsSchema = [
  body("tags")
    .isArray()
    .custom((value) => {
      if (!value.every(ObjectId.isValid))
        throw new Error("Array does not contain mogodb id");
      return true;
    }),
  param("time").isString(),
];

const createTodoSchema = [
  body("title").isString().notEmpty(),
  body("tagId").isMongoId().withMessage("not valid id"),
];

const updateTodoSchema = [
  body("title").isString().notEmpty(),
  body("isCompleted").isBoolean(),
  body("tagId").isMongoId().withMessage("not valid id"),
  param("id").isMongoId().withMessage("not valid id"),
];

const deleteTodoSchema = [param("id").isMongoId().withMessage("not valid id")];

export default {
  getStatsSchema,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
};
