import { createReducer } from "typesafe-actions";
import UserModel from "../../model/User";
import { RootActions } from "../index.actions";
import {
  loginUserFailAction,
  loginUserSuccessAction,
  logoutUserAction,
  registerUserFailAction,
} from "./user.actions";

interface IUserReducer {
  user: UserModel | null;
  isLogging: boolean;
  error: string | null;
}

const initialState: IUserReducer = {
  user: null,
  isLogging: false,
  error: null,
};

export const userReducer = createReducer<IUserReducer, RootActions>(
  initialState
)
  .handleAction(loginUserSuccessAction, (state, { payload }) => ({
    ...state,
    isLogging: true,
    user: payload,
    error: null,
  }))
  .handleAction(loginUserFailAction, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
  .handleAction(registerUserFailAction, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
  .handleAction(logoutUserAction, (state, {}) => ({
    ...state,
    isLogging: false,
    user: null,
    error: null,
  }));
