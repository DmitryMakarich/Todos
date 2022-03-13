import { TodoActionTypes } from "../../types/todo";

export const getTodosAction = (page: number, limit: number) => {
  return {
    type: TodoActionTypes.FETCH_TODOS,
    page,
    limit,
  };
};

export const addTodoAction = (title: string, tagId: string) => {
  return {
    type: TodoActionTypes.ADD_TODO,
    title,
    tagId,
  };
};
