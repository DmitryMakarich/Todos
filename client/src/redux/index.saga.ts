import { fork } from "redux-saga/effects";

import watchTagFetching from "./tag/tag.saga";
import watchTodoActions from "./todo/todo.saga";
import watchUserAuthentication from "./user/user.saga";

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
  yield fork(watchTagFetching);
  yield fork(watchTodoActions);
}


