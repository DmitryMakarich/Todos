import BaseService from "./Base";

import TodoModel from "../model/Todo";

class Service extends BaseService {
  public getTodos(page: number, limit: number) {
    return this.requests.get<{ todos: Array<TodoModel>; count: number }>(
      "/todo",
      { page, limit }
    );
  }

  public getFilteredTodos(page: number, limit: number, isCompleted: boolean) {
    return this.requests.get<{ todos: Array<TodoModel>; count: number }>(
      "/todo",
      { page, limit, isCompleted }
    );
  }

  public createTodo(title: string, tagId: string) {
    return this.requests.post<{ todo: TodoModel }>("/todo", {
      title,
      tagId,
    });
  }

  public updateTodo(todo: TodoModel) {
    return this.requests.put<{ todo: TodoModel }>(`/todo/${todo._id}`, {
      title: todo.title,
      isCompleted: todo.isCompleted,
      tagId: todo.tag,
    });
  }

  public deleteTodo(id: string) {
    return this.requests.del<{ message: string }>(`/todo/${id}`);
  }
}

const service = new Service();

export default service;
