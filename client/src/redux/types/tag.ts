import TagModel from "../../model/Tag";

export interface TagState {
  tags: Array<TagModel>;
  isLoading: boolean;
  error: null | string;
}

export enum TagActionTypes {
  FETCH_TAGS = "FETCH_TAGS",
  FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS",
  FETCH_TAGS_ERROR = "FETCH_TAGS_ERROR",
}

interface FetchTagsSuccessAction {
  type: TagActionTypes.FETCH_TAGS_SUCCESS;
  payload: Array<TagModel>;
}

interface FetchTagsErrorAction {
  type: TagActionTypes.FETCH_TAGS_ERROR;
  payload: string;
}

export type TagAction = FetchTagsSuccessAction | FetchTagsErrorAction;
