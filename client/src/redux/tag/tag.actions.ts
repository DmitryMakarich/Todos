import { createAction } from "typesafe-actions";
import TagModel from "../../model/Tag";

export enum TagActionTypes {
  FETCH_TAGS = "FETCH_TAGS",
  FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS",
  FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR",
}

export const getTagAction = createAction(TagActionTypes.FETCH_TAGS)();

export const getTagSuccessAction = createAction(
  TagActionTypes.FETCH_TAGS_SUCCESS,
  (tags: Array<TagModel>) => tags
)();

export const getTagFailAction = createAction(
  TagActionTypes.FETCH_TAGS_ERROR,
  (error: string) => error
)();
