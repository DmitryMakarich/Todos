import { AxiosResponse } from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import AuthConfigModel from "../../model/AuthConfig";
import userService from "../../service/User";
import { ActionType } from "typesafe-actions";
import {
  loginUserAction,
  loginUserFailAction,
  loginUserSuccessAction,
  registerUserAction,
  registerUserFailAction,
  UserActionTypes,
} from "./user.actions";

export function* registerSaga({
  payload: { userName, email, password },
}: ActionType<typeof registerUserAction>) {
  try {
    const { status }: AxiosResponse<{ message: string }> = yield call(
      userService.register.bind(userService),
      email,
      password,
      userName
    );

    if (status === 201) {
      yield loginSaga(loginUserAction(email, password));
    }
  } catch (error) {
    yield put(registerUserFailAction("User with this email exists"));
  }
}

export function* loginSaga({
  payload: { email, password },
}: ActionType<typeof loginUserAction>): any {
  try {
    const {
      data: { userName, userId, accessToken },
    }: AxiosResponse<AuthConfigModel> = yield call(
      userService.login.bind(userService),
      email,
      password
    );

    window.localStorage.setItem("accessToken", accessToken);

    yield put(
      loginUserSuccessAction({
        userId,
        userName,
      })
    );
  } catch (error) {
    yield put(loginUserFailAction("Incorrect password or email"));
  }
}

export function* logoutSaga() {
  yield window.localStorage.removeItem("accessToken");
}

export default function* watchUserAuthentication() {
  yield takeLatest(UserActionTypes.REGISTER_USER, registerSaga);
  yield takeLatest(UserActionTypes.LOGIN_USER, loginSaga);
  yield takeLatest(UserActionTypes.LOGOUT_USER, logoutSaga);
}
