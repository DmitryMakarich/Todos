import { makeAutoObservable, runInAction } from "mobx";

import todoService from "../service/Todo";
import TodoModel from "../model/Todo";

export default class TodoStore {
  todos: Array<TodoModel> = [];
  isLoading: boolean = true;
  totalPages = 0;
  totalCount = 0;
  limit = 5;
  currentPage = 1;
  filter: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
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
        this.totalCount = data.count;
        this.totalPages = Math.ceil(this.totalCount / this.limit);
        this.filter = null;
        this.isLoading = false;
      });
    });
  }

  async getTodos(filter: boolean | null) {
    this.isLoading = true;

    if (filter === null) {
      this.init();
      return;
    }

    todoService
      .getFilteredTodos(this.currentPage, this.limit, filter)
      .then(({ todos, count }) => {
        runInAction(() => {
          this.todos = todos;
          this.totalCount = count;
          this.totalPages = Math.ceil(this.totalCount / this.limit);
          this.currentPage = 1;
          this.filter = filter;
          this.isLoading = false;
        });
      });
  }

  async createTodo(title: string, tagId: string) {
    this.isLoading = true;
    const { data, status } = await todoService.createTodo(title, tagId);

    runInAction(() => {
      if (status === 201) {
        this.totalCount += 1;
      }

      if (data.todo && this.todos.length < this.limit) {
        this.todos.push(data.todo);
      }

      this.totalPages = Math.ceil(this.totalCount / this.limit);

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
      if (response.status === 204) {
        this.todos = this.todos.filter((todo) => todo._id !== id);
        this.totalCount -= 1;
      }

      this.totalPages = Math.ceil(this.totalCount / this.limit);

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
