import { takeLatest } from "redux-saga/effects";
import { TagActionTypes } from "../../../types/tag";
import { fetchTagsSaga } from "./fetchTagsSaga";

export default function* watchTagFetching() {
  yield takeLatest(TagActionTypes.FETCH_TAGS, fetchTagsSaga);
}
