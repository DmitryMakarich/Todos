import { makeAutoObservable, runInAction } from "mobx";

import userService from "../service/User";
import UserModel from "../model/User";

export default class UserStore {
  user: UserModel | null = null;
  isLogging: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {}

  async login(email: string, password: string) {
    const result = await userService.login(email, password);

    runInAction(() => {
      this.user = result;
      this.isLogging = true;
    });
  }

  async register(email: string, password: string, fullName: string) {
    const status = await userService.register(email, password, fullName);

    if (status === 201) {
      this.login(email, password);
    }
  }

  logout() {
    userService.logout();
    this.user = null;
    this.isLogging = false;
  }
}
