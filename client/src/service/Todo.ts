import BaseService from "./Base";

import TodoModel from "../model/Todo";

class Service extends BaseService {
  public getTodos() {
    return this.requests
      .get<{ todos: Array<TodoModel> }>("/todo")
      .then((data) => data.todos);
  }
}

const service = new Service();

export default service;
