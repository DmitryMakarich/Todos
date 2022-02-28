import { Router } from "express";
import todoController from "../controllers/todoController";
import auth from "../middleware/auth";
import schemaValidator from "../middleware/schemaValidator";

const router = Router();

router.get("/todo", [auth, schemaValidator], todoController.get);
router.post("/todo", [auth, schemaValidator], todoController.create);
router.put("/todo/:id", [auth, schemaValidator], todoController.update);
router.delete("/todo/:id", [auth, schemaValidator], todoController.delete);

export default router;
