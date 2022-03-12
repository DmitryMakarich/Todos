import { fork } from "redux-saga/effects";
import watchUserAuthentication from "./watchers";

export default function* rootAuthSaga() {
  yield fork(watchUserAuthentication);
}
