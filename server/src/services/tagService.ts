import { ObjectId } from "mongodb";
import Tag from "../models/Tag";

class TagService {
  async getTag(id: ObjectId) {
    return Tag.findById(id).lean();
  }

  async getAllTags() {
    return Tag.find().lean();
  }
}

export default new TagService();
