import { Request, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { ObjectId } from "mongodb";

import todoService from "../services/todoService";

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
  async get(
    req: IAuthorizedRequest<
      null,
      null,
      null,
      { page: number; limit: number; isCompleted?: boolean }
    >,
    res: Response
  ) {
    try {
      const { limit, page, isCompleted } = req.query;

      const { todos, count } = await todoService.getTodos(
        new ObjectId(req.userId),
        limit,
        page,
        isCompleted
      );

      res.json({ todos, count });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getStats(
    req: IAuthorizedRequest<{ time: string }, null, { tags: Array<string> }>,
    res: Response
  ) {
    try {
      const { time } = req.params;
      const { tags } = req.body;

      const val = await todoService.getStats(
        new ObjectId(req.userId),
        time,
        tags.map((tag) => new ObjectId(tag))
      );

      res.json(val);
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

      const todo = await todoService.create(
        { title, tagId: new ObjectId(tagId) },
        new ObjectId(req.userId)
      );

      if (todo) {
        return res.status(201).json({ todo });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(
    req: IAuthorizedRequest<
      { id: string },
      null,
      { title: string; isCompleted: boolean; tagId: string }
    >,
    res: Response
  ) {
    try {
      const { title, isCompleted, tagId } = req.body;

      const todo = await todoService.update(new ObjectId(req.params.id), {
        title,
        isCompleted,
        tagId: new ObjectId(tagId),
      });

      if (todo) {
        return res.status(201).json({ todo });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req: IAuthorizedRequest<{ id: string }>, res: Response) {
    try {
      const todo = await todoService.delete(new ObjectId(req.params.id));

      if (todo) {
        return res.status(204).json({
          message: `todo with id-${req.params.id} was deleted`,
        });
      }

      return res.status(500).json({ message: "something went wrong" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoController();
