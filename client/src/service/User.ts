import BaseService from "./Base";

import AuthConfigModel from "../model/AuthConfig";

class Service extends BaseService {
  public login(email: string, password: string) {
    return this.requests
      .post<AuthConfigModel>("/auth/login", {
        email,
        password,
      })
      .then((value) => {
        window.localStorage.setItem("accessToken", value.data.accessToken);

        return {
          userId: value.data.userId,
          userName: value.data.userName,
        };
      });
  }

  public register(email: string, password: string, fullName: string) {
    return this.requests
      .post<any>("/auth/register", {
        email,
        password,
        fullName,
      })
      .then((value) => value.status);
  }

  public logout() {
    window.localStorage.removeItem("accessToken");
  }
}

const service = new Service();

export default service;
