import { AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import AuthConfigModel from "../../../../model/AuthConfig";
import userService from "../../../../service/User";
import { UserAction, UserActionTypes } from "../../../types/user";

interface PayloadProps {
  type: UserActionTypes;
  formData: {
    userName?: string;
    email: string;
    password: string;
  };
}

export function* registerSaga({ type, formData }: PayloadProps): any {
  try {
    const { status }: AxiosResponse<{ message: string }> = yield call(
      userService.register.bind(userService),
      formData.email,
      formData.password,
      formData.userName!
    );

    if (status === 201) {
      yield loginSaga({ type: UserActionTypes.LOGIN_USER, formData });
    }
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.REGISTER_USER_ERROR,
      payload: "User with this email already exists",
    });
  }
}

export function* loginSaga({ type, formData }: PayloadProps): any {
  try {
    const {
      data: { userName, userId, accessToken },
    }: AxiosResponse<AuthConfigModel> = yield call(
      userService.login.bind(userService),
      formData.email,
      formData.password
    );

    window.localStorage.setItem("accessToken", accessToken);

    yield put<UserAction>({
      type: UserActionTypes.LOGIN_USER_SUCCESS,
      payload: {
        userName,
        userId,
      },
    });
  } catch (error) {
    yield put<UserAction>({
      type: UserActionTypes.LOGIN_USER_ERROR,
      payload: "Incorrect login or password",
    });
  }
}

export function* logoutSaga(): any {
  yield window.localStorage.removeItem("accessToken");
}
