import { makeAutoObservable, runInAction } from "mobx";

import todoService from "../service/Todo";
import TodoModel from "../model/Todo";

export default class TodoStore {
  todos: Array<TodoModel> = [];
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  getTodos(isCompleted: boolean | null) {
    return this.todos.filter((todo) => {
      if (isCompleted === null) {
        return todo;
      }

      return todo.isCompleted === isCompleted;
    });
  }

  isEmptyTodos() {
    return this.todos.length === 0;
  }

  async init() {
    todoService.getTodos().then((data) => {
      runInAction(() => {
        this.todos = data.todos;
        this.isLoading = false;
      });
    });
  }

  async createTodo(title: string, tagId: string) {
    const result = (await todoService.createTodo(title, tagId)).data;

    if (result.todo) {
      runInAction(() => {
        this.todos.push(result.todo);
      });
    }
  }

  async updateTodo(todo: TodoModel) {
    const updatedTodo = (await todoService.updateTodo(todo)).todo;
    const todoIndex = this.todos.findIndex((elem) => elem._id === todo._id);

    runInAction(() => {
      if (updatedTodo) {
        this.todos.splice(todoIndex, 1, updatedTodo);
      }
    });
  }

  async deleteTodo(id: string) {
    // this.isLoading = true;
    const response = await todoService.deleteTodo(id);

    runInAction(() => {
      if (response.status === 200) {
        this.todos = this.todos.filter((todo) => todo._id !== id);
      }
      // this.isLoading = false;
    });

    return response.data.message;
  }

  dispose() {
    this.todos = [];
    this.isLoading = true;
  }
}
