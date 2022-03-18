import BaseService from "./Base";

import AuthConfigModel from "../model/AuthConfig";
import UserStatsModel from "../model/UserStats";

class Service extends BaseService {
  public login(email: string, password: string) {
    return this.requests.post<AuthConfigModel>("/auth/login", {
      email,
      password,
    });
  }

  public register(email: string, password: string, fullName: string) {
    return this.requests.post<{ message: string }>("/auth/register", {
      email,
      password,
      fullName,
    });
  }

  public getUsers() {
    return this.requests.post<UserStatsModel[]>(`/user`, {});
  }
}

const service = new Service();

export default service;
