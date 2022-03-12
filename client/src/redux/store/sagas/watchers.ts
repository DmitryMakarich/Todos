import { takeLatest } from "redux-saga/effects";
import { UserActionTypes } from "../../types/user";
import { loginSaga, registerSaga } from "./authenticationSaga";

export default function* watchUserAuthentication() {
  yield takeLatest(UserActionTypes.REGISTER_USER, registerSaga);
  yield takeLatest(UserActionTypes.LOGIN_USER, loginSaga);
}
