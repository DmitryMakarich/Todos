import UserModel from "../../model/User";

export interface UserState {
  user: UserModel | null;
  isLogging: boolean;
  error: null | string;
}

export enum UserActionTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  REGISTER_USER = "REGISTER_USER",
  REGISTER_USER_ERROR = "REGISTER_USER_ERROR",
  LOGOUT_USER = "LOGOUT_USER",
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: UserModel;
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR;
  payload: string | null;
}

interface RegisterUserErrorAction {
  type: UserActionTypes.REGISTER_USER_ERROR;
  payload: string | null;
}

interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER;
  payload: null;
}

export type UserAction =
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | RegisterUserErrorAction
  | LogoutUserAction;
