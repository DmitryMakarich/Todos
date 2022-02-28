import { Router } from "express";
import { check } from "express-validator";
import userController from "../controllers/userController";
import validation from "../middleware/validation";

const router = Router();

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
    validation,
  ],
  userController.register
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
    validation,
  ],
  userController.login
);

export default router;
