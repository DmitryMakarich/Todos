import { Request, Response } from "express";
import todoService from "../services/todoService";

interface AuthorizationRequest extends Request {
  user: string;
}

class TodoController {
  async get(req: AuthorizationRequest, res: Response) {
    try {
      const todos = await todoService.getTodos(req.user);

      res.status(200).json({ todos });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req: AuthorizationRequest, res: Response) {
    try {
      const { title, tagId } = req.body;

      const todo = await todoService.create({ title, tagId }, req.user);

      if (todo) {
        return res.status(200).json({ message: "todo was created" });
      }

      return res.status(400).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { title, isCompleted, tagId } = req.body;

      const todo = await todoService.update(req.params.id, {
        title,
        isCompleted,
        tagId,
      });

      if (todo) {
        return res.status(200).json({ message: "todo was updated" });
      }

      return res.status(400).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const todo = await todoService.delete(req.params.id);

      if (todo) {
        return res.status(200).json({ message: "todo was deleted" });
      }

      return res.status(400).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoController();
