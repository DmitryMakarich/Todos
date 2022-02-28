import { Request, Response } from "express";
import todoService from "../services/todoService";
import { ParamsDictionary, Query } from "express-serve-static-core";

interface IAuthorizedRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

class TodoController {
  async get(req: IAuthorizedRequest, res: Response) {
    try {
      const todos = await todoService.getTodos(req.userId);

      res.json({ todos });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(
    req: IAuthorizedRequest<null, null, { title: string; tagId: string }>,
    res: Response
  ) {
    try {
      const { title, tagId } = req.body;

      const todo = await todoService.create({ title, tagId }, req.userId);

      if (todo) {
        return res.json({ message: "todo was created" });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(
    req: Request<
      { id: string },
      null,
      { title: string; isCompleted: boolean; tagId: string }
    >,
    res: Response
  ) {
    try {
      const { title, isCompleted, tagId } = req.body;

      const todo = await todoService.update(req.params.id, {
        title,
        isCompleted,
        tagId,
      });

      if (todo) {
        return res.json({ message: "todo was updated" });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const todo = await todoService.delete(req.params.id);

      if (todo) {
        return res.json({ message: "todo was deleted" });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoController();
