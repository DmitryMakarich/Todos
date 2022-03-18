import { AxiosResponse } from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import userService from "../../service/User";
import { ActionType } from "typesafe-actions";
import UserStatsModel from "../../model/UserStats";
import {
  setLoading,
  setUserStats,
  setUserStatsSuccess,
  StatsActionTypes,
} from "./stats.actions";
import { setError } from "../todo/todo.actions";

export function* getStats({
  payload: { page, limit, userName },
}: ActionType<typeof setUserStats>) {
  yield put(setLoading(true));

  try {
    const {
      data: { stats, count },
    }: AxiosResponse<{ stats: UserStatsModel[]; count: number }> = yield call(
      userService.getUsers.bind(userService),
      page,
      limit,
      userName
    );

    yield put(setUserStatsSuccess(stats, count));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export default function* watchStatsActions() {
  yield takeLatest(StatsActionTypes.SET_USERS_STATS, getStats);
}
