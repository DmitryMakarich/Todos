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
}

interface LoginUserAction {
  type: UserActionTypes.LOGIN_USER;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: UserModel;
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR;
  payload: string;
}

export type UserAction =
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserErrorAction;
