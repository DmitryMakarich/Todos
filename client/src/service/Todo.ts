import BaseService from "./Base";

import TodoModel from "../model/Todo";
import { FilterOptions } from "../utils/FilterOptions";
import { TimeOptions } from "../utils/TimeOptions";

class Service extends BaseService {
  public getTodos(page: number, limit: number, isCompleted: FilterOptions) {
    return this.requests.get<{ todos: Array<TodoModel>; count: number }>(
      "/todo",
      isCompleted === FilterOptions.All
        ? { page, limit }
        : { page, limit, isCompleted }
    );
  }

  public getStats(time: TimeOptions, tags: Array<string>) {
    return this.requests.post<{
      completedCount: number;
      createdCount: number;
    }>(`/todo/${time}`, { tags });
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
