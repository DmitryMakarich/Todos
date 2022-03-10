import { makeAutoObservable, runInAction } from "mobx";

import tagService from "../service/Tag";
import TagModel from "../model/Tag";

export default class TagStore {
  tags: Array<TagModel> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    tagService.getTags().then((data) => {
      runInAction(() => {
        this.tags = data.tags;
      });
    });
  }

  dispose() {
    this.tags = [];
  }
}
