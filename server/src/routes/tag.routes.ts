import { Router } from "express";
import tagController from "../controllers/tagController";
import auth from "../middleware/auth";
import validation from "../middleware/validation";
import { param } from "express-validator";

const router = Router();

router.get("/tag", [auth, validation], tagController.getTags);
router.get(
  "/tag/:id",
  [auth, param("id").isMongoId(), validation],
  tagController.getTag
);

export default router;
