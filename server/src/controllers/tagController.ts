import { Request, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { ObjectId } from "mongodb";

import tagService from "../services/tagService";

interface IAuthorizedRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

class TagController {
  async getTags(req: IAuthorizedRequest, res: Response) {
    try {
      const tags = await tagService.getAllTags();

      res.json({ tags });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTag(req: IAuthorizedRequest<{ id: string }>, res: Response) {
    try {
      const tag = await tagService.getTag(new ObjectId(req.params.id));

      res.json({ tag });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TagController();
