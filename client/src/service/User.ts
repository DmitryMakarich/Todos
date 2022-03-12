import BaseService from "./Base";

import AuthConfigModel from "../model/AuthConfig";

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
}

const service = new Service();

export default service;
