import { ObjectId } from "mongodb";
import Tag from "../models/Tag";

class TagService {
  async getTag(id: ObjectId) {
    return Tag.find({ _id: id }).lean();
  }

  async getAllTags() {
    return Tag.find();
  }
}

export default new TagService();
