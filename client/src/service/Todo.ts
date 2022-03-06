import BaseService from "./Base";

import TodoModel from "../model/Todo";

class Service extends BaseService {
  public getTodos() {
    return this.requests
      .get<{ todos: Array<TodoModel> }>("/todo")
      .then((data) => data.todos);
  }

  public createTodo(title: string, tagId: string) {
    return this.requests
      .post<{ todo: TodoModel }>("/todo", { title, tagId })
      .then((res) => res.data.todo);
  }

  public updateTodo(todo: TodoModel) {
    return this.requests
      .put<{ todo: TodoModel }>(`/todo/${todo._id}`, {
        title: todo.title,
        isCompleted: todo.isCompleted,
        tagId: todo.tag,
      })
      .then((res) => res.todo);
  }

  public deleteTodo(id: string) {
    return this.requests.del<{ message: string }>(`/todo/${id}`);
  }
}

const service = new Service();

export default service;
