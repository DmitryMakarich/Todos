import { put, call } from "redux-saga/effects";
import TagModel from "../../../../model/Tag";
import tagService from "../../../../service/Tag";
import { TagActionTypes } from "../../../types/tag";

export function* fetchTagsSaga(): any {
  try {
    const { tags }: { tags: Array<TagModel> } = yield call(
      tagService.getTags.bind(tagService)
    );

    yield put({
      type: TagActionTypes.FETCH_TAGS_SUCCESS,
      payload: tags,
    });
  } catch (error) {
    yield put({
      type: TagActionTypes.FETCH_TAGS_ERROR,
      payload: "Something went wrong",
    });
  }
}
