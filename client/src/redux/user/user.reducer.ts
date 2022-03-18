import { createReducer } from "typesafe-actions";
import UserModel from "../../model/User";
import UserStatsModel from "../../model/UserStats";
import { RootActions } from "../index.actions";
import {
  loginUserFailAction,
  loginUserSuccessAction,
  logoutUserAction,
  registerUserFailAction,
  setLoading,
  setUserStatsSuccess,
} from "./user.actions";

interface IUserReducer {
  user: UserModel | null;
  usersStats: Array<UserStatsModel> | null;
  isLogging: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserReducer = {
  user: null,
  usersStats: null,
  isLogging: false,
  isLoading: false,
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
  }))
  .handleAction(setUserStatsSuccess, (state, { payload }) => ({
    ...state,
    usersStats: [...payload],
    isLoading: false,
  }))
  .handleAction(setLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }));
