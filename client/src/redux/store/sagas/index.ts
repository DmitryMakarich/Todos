import { fork } from "redux-saga/effects";
import watchTagFetching from "./tag/watchers";
import watchTodoActions from "./todo/watchers";
import watchUserAuthentication from "./user/watchers";

export default function* rootAuthSaga() {
  yield fork(watchUserAuthentication);
  yield fork(watchTagFetching);
  yield fork(watchTodoActions);
}
