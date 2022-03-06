import { makeAutoObservable, runInAction } from "mobx";

import todoService from "../service/Todo";
import TodoModel from "../model/Todo";

export default class TodoStore {
  todos: Array<TodoModel> = [];
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    todoService.getTodos().then((data) => {
      runInAction(() => {
        this.todos = data;
        this.isLoading = false;
      });
    });
  }

  async createTodo(title: string, tagId: string) {
    const todo = await todoService.createTodo(title, tagId);

    if (todo) {
      runInAction(() => {
        this.todos.push(todo);
      });
    }
  }

  async updateTodo(todo: TodoModel) {
    const updatedTodo = await todoService.updateTodo(todo);
    const todoIndex = this.todos.findIndex((elem) => elem._id === todo._id);
    
    runInAction(() => {
      if (updatedTodo) {
        this.todos.splice(todoIndex, 1, updatedTodo);
      }
    });
  }

  async deleteTodo(id: string) {
    this.isLoading = true;
    const response = await todoService.deleteTodo(id);

    runInAction(() => {
      if (response.status === 200) {
        this.todos = this.todos.filter((todo) => todo._id !== id);
      }
      this.isLoading = false;
    });

    return response.data.message;
  }

  dispose() {
    this.todos = [];
    this.isLoading = true;
  }
}
