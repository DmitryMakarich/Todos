import { put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getTagAction,
  getTagFailAction,
  getTagSuccessAction,
  TagActionTypes,
} from "./tag.actions";
import TagModel from "../../model/Tag";
import tagService from "../../service/Tag";

export function* fetchTagsSaga({}: ActionType<typeof getTagAction>) {
  try {
    const { tags }: { tags: Array<TagModel> } = yield call(
      tagService.getTags.bind(tagService)
    );

    yield put(getTagSuccessAction(tags));
  } catch (error) {
    yield put(getTagFailAction("Something went wrong"));
  }
}

export default function* watchTagFetching() {
  yield takeLatest(TagActionTypes.FETCH_TAGS, fetchTagsSaga);
}
