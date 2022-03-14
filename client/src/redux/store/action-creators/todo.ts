import TodoModel from "../../../model/Todo";
import { TodoActionTypes } from "../../types/todo";

export const getTodosAction = (
  page: number,
  limit: number,
  filter: null | boolean
) => {
  return {
    type: TodoActionTypes.FETCH_TODOS,
    page,
    limit,
    filter,
  };
};

export const addTodoAction = (title: string, tagId: string) => {
  return {
    type: TodoActionTypes.ADD_TODO,
    title,
    tagId,
  };
};

export const updateTodoAction = (updatedTodo: TodoModel) => {
  return {
    type: TodoActionTypes.UPDATE_TODO,
    updatedTodo,
  };
};

export const removeTodoAction = (id: string) => {
  return {
    type: TodoActionTypes.REMOVE_TODO,
    id,
  };
};
