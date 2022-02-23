import { Router } from "express";
import todoController from "../controllers/todoController";
import auth from "../middleware/auth";

const router = Router();

router.get("/todo", auth, todoController.get);
router.post("/todo", auth, todoController.create);
router.put("/todo/:id", auth, todoController.update);
router.delete("/todo/:id", auth, todoController.delete);

export default router;
