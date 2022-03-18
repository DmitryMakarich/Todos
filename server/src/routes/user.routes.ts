import { Router } from "express";
import userController from "../controllers/userController";
import auth from "../middleware/auth";
import validation from "../middleware/validation";

const router = Router();

router.post("/", [auth, validation], userController.getUsers);

export default router;
