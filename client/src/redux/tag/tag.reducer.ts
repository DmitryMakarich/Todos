import { createReducer } from "typesafe-actions";
import TagModel from "../../model/Tag";
import { RootActions } from "../index.actions";
import {
  getTagFailAction,
  getTagSuccessAction,
  setSelectedTags,
} from "./tag.actions";

interface ITagReducer {
  tags: Array<TagModel>;
  selectedTags: Array<string>;
  isLoading: boolean;
  error: null | string;
}

const initialState: ITagReducer = {
  tags: [],
  selectedTags: [],
  isLoading: true,
  error: null,
};

export const tagReducer = createReducer<ITagReducer, RootActions>(initialState)
  .handleAction(getTagSuccessAction, (state, { payload }) => ({
    ...state,
    tags: payload,
    isLoading: false,
  }))
  .handleAction(getTagFailAction, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
  .handleAction(setSelectedTags, (state, { payload }) => ({
    ...state,
    selectedTags: payload,
  }));
