import { createAction } from "typesafe-actions";
import UserModel from "../../model/User";

export enum UserActionTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  REGISTER_USER = "REGISTER_USER",
  REGISTER_USER_ERROR = "REGISTER_USER_ERROR",
  LOGOUT_USER = "LOGOUT_USER",
}

export const loginUserAction = createAction(
  UserActionTypes.LOGIN_USER,
  (email: string, password: string) => ({ email, password })
)();

export const loginUserSuccessAction = createAction(
  UserActionTypes.LOGIN_USER_SUCCESS,
  (user: UserModel) => user
)();

export const loginUserFailAction = createAction(
  UserActionTypes.LOGIN_USER_ERROR,
  (error: string | null) => error
)();

export const registerUserAction = createAction(
  UserActionTypes.REGISTER_USER,
  (userName: string, email: string, password: string) => ({
    userName,
    email,
    password,
  })
)();

export const registerUserFailAction = createAction(
  UserActionTypes.REGISTER_USER_ERROR,
  (error: string | null) => error
)();

export const logoutUserAction = createAction(
  UserActionTypes.LOGOUT_USER
)();
