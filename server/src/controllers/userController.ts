import { Request, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

import userService from "../services/userService";

interface IAuthorizedRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

class UserController {
  async login(
    req: Request<null, null, { email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      const { user, token, role } = await userService.login({
        email,
        password,
      });

      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      res.json({
        accessToken: token,
        userId: user._id,
        userName: user.fullName,
        userRole: role,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }

  async register(
    req: Request<
      null,
      null,
      { fullName: string; email: string; password: string }
    >,
    res: Response
  ) {
    try {
      const { fullName, email, password } = req.body;

      const user = await userService.register({ fullName, email, password });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }

  async getUsers(req: IAuthorizedRequest, res: Response) {
    try {
      const val = await userService.getUsers();

      res.json(val);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
