import BaseService from "./Base";

import TagModel from "../model/Tag";

class Service extends BaseService {
  public getTags() {
    return this.requests.get<{ tags: Array<TagModel> }>("/tag");
  }
}

const service = new Service();

export default service;
