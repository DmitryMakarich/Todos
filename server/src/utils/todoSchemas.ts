import Joi from "joi";

const createTodoSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    tagId: Joi.string().required(),
  }),
};

const updateTodoSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
    tagId: Joi.string().required(),
  }),
};

const deleteTodoSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

export default {
  POST: createTodoSchema,
  PUT: updateTodoSchema,
  DELETE: deleteTodoSchema,
};
