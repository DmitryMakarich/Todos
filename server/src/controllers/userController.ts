import { Request, Response } from "express";
import { validationResult } from "express-validator";

import userService from "../services/userService";

class UserController {
  async login(
    req: Request<null, null, { email: string; password: string }>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      const { user, token } = await userService.login({
        email,
        password,
      });

      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }

      res.json({ token, userId: user.id });
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
}

export default new UserController();
