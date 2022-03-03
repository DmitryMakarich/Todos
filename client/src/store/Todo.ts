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

  dispose() {
    this.todos = [];
  }
}
