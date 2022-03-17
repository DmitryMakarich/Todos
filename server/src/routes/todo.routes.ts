import { Router } from "express";
import todoController from "../controllers/todoController";
import auth from "../middleware/auth";
import validation from "../middleware/validation";
import todoSchemas from "../utils/todoSchemas";

const router = Router();

router.get("/todo", [auth, validation], todoController.get);
router.post(
  "/todo/:time",
  [auth, ...todoSchemas.getStatsSchema, validation],
  todoController.getStats
);
router.post(
  "/todo",
  [auth, ...todoSchemas.createTodoSchema, validation],
  todoController.create
);
router.put(
  "/todo/:id",
  [auth, ...todoSchemas.updateTodoSchema, validation],
  todoController.update
);
router.delete(
  "/todo/:id",
  [auth, ...todoSchemas.deleteTodoSchema, validation],
  todoController.delete
);

export default router;
