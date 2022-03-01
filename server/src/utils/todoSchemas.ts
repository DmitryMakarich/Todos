import { body, param } from "express-validator";

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

const deleteTodoSchema = [
  param("id").isMongoId().withMessage("not valid id"),
];

export default {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
};
