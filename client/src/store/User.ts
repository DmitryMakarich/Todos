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
    userService.login(email, password).then((result) => {
      window.localStorage.setItem("accessToken", result.data.accessToken);

      runInAction(() => {
        this.user = {
          userId: result.data.userId,
          userName: result.data.userName,
        };
        this.isLogging = true;
      });
    });
  }

  async register(email: string, password: string, fullName: string) {
    const { status } = await userService.register(email, password, fullName);

    if (status === 201) {
      this.login(email, password);
    }
  }

  logout() {
    window.localStorage.removeItem("accessToken");
    this.user = null;
    this.isLogging = false;
  }
}
