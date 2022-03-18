import { createAction } from "typesafe-actions";
import UserStatsModel from "../../model/UserStats";

export enum StatsActionTypes {
  SET_USERS_STATS = "SET_USERS_STATS",
  SET_USER_STATS_SUCCESS = "SET_USER_STATS_SUCCESS",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_USERNAME = "SET_USERNAME",
}

export const setUserStats = createAction(
  StatsActionTypes.SET_USERS_STATS,
  (page: number, limit: number, userName: string | null) => ({
    page,
    limit,
    userName,
  })
)();

export const setUserStatsSuccess = createAction(
  StatsActionTypes.SET_USER_STATS_SUCCESS,
  (stats: Array<UserStatsModel>, count: number) => ({
    stats,
    count,
  })
)();

export const setLoading = createAction(
  StatsActionTypes.SET_LOADING,
  (isLoading: boolean) => isLoading
)();

export const setPage = createAction(
  StatsActionTypes.SET_CURRENT_PAGE,
  (page: number) => page
)();

export const setUserName = createAction(
  StatsActionTypes.SET_USERNAME,
  (name: string | null) => name
)();

export const setError = createAction(
  StatsActionTypes.SET_ERROR,
  (error: string | null) => error
)();
