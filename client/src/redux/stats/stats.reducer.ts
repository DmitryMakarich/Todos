import { createReducer } from "typesafe-actions";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import UserStatsModel from "../../model/UserStats";
import { RootActions } from "../index.actions";
import {
  setLoading,
  setPage,
  setUserName,
  setUserStatsSuccess,
} from "./stats.actions";

interface IStatsReducer {
  userStats: Array<UserStatsModel> | null;
  userName: string | null;
  isLoading: boolean;
  totalPages: number;
  totalCount: number;
  currentPage: number;
  error: string | null;
}

const initialState: IStatsReducer = {
  userStats: null,
  userName: null,
  isLoading: false,
  totalPages: 0,
  totalCount: 0,
  currentPage: 1,
  error: null,
};

export const statsReducer = createReducer<IStatsReducer, RootActions>(
  initialState
)
  .handleAction(setUserStatsSuccess, (state, { payload }) => ({
    ...state,
    userStats: [...payload.stats],
    totalCount: payload.count,
    totalPages: Math.ceil(payload.count / LIMIT_COUNT),
    isLoading: false,
  }))
  .handleAction(setLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }))
  .handleAction(setUserName, (state, { payload }) => ({
    ...state,
    userName: payload,
  }))
  .handleAction(setPage, (state, { payload }) => ({
    ...state,
    currentPage: payload,
  }));
