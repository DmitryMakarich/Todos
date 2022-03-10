import { makeAutoObservable, runInAction } from "mobx";

import todoService from "../service/Todo";
import TodoModel from "../model/Todo";

export default class TodoStore {
  todos: Array<TodoModel> = [];
  isLoading: boolean = true;
  totalPages = 0;
  limit = 5;
  currentPage = 1;

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

  setCurrentPage(value: number) {
    this.currentPage = value;
  }

  isEmptyTodos() {
    return this.todos.length === 0;
  }

  async init() {
    todoService.getTodos(this.currentPage, this.limit).then((data) => {
      runInAction(() => {
        this.todos = data.todos;
        this.isLoading = false;
        this.totalPages = Math.ceil(data.count / this.limit);
      });
    });
  }

  async createTodo(title: string, tagId: string) {
    this.isLoading = true;
    const result = (await todoService.createTodo(title, tagId)).data;

    runInAction(() => {
      if (result.todo && this.todos.length < this.limit) {
        this.todos.push(result.todo);
      }

      this.totalPages = Math.ceil(result.count / this.limit);

      this.isLoading = false;
    });
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
    const response = await todoService.deleteTodo(id);

    runInAction(() => {
      if (response.status === 200) {
        this.todos = this.todos.filter((todo) => todo._id !== id);
      }

      this.totalPages = Math.ceil(response.data.count / this.limit);

      if (this.totalPages === 0) {
        this.setCurrentPage(1);
        return;
      }

      if (this.totalPages < this.currentPage) {
        this.setCurrentPage(this.currentPage - 1);
        return;
      }

      this.init();
    });

    return response.data.message;
  }

  dispose() {
    this.todos = [];
    this.isLoading = true;
    this.totalPages = 0;
  }
}
