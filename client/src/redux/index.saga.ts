import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { rootReducer } from "./index.reducer";
import watchTagFetching from "./tag/tag.saga";
import watchTodoActions from "./todo/todo.saga";
import watchUserAuthentication from "./user/user.saga";

export default function* rootSaga() {
  yield fork(watchUserAuthentication);
  yield fork(watchTagFetching);
  yield fork(watchTodoActions);
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
