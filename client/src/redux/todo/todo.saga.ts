import { AxiosResponse } from "axios";
import { put, call, select, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import { StatsModel } from "../../model/Stats";
import TodoModel from "../../model/Todo";
import todoService from "../../service/Todo";
import { FilterOptions } from "../../utils/FilterOptions";
import { RootState } from "../index.reducer";
import {
  addTodoAction,
  getStatsAction,
  addTodoSuccessAction,
  getTodosAction,
  getTodosSuccess,
  removeTodoAction,
  removeTodoSuccessAction,
  SetCurrentPage,
  setError,
  setLoading,
  TodoActionTypes,
  updateTodoAction,
  updateTodoSuccessAction,
  getStatsSuccessAction,
  setModal,
} from "./todo.actions";
import { ITodoReducer } from "./todo.reducer";

export function* fetchTodoSaga({
  payload: { page, filter },
}: ActionType<typeof getTodosAction>) {
  try {
    yield put(setLoading(true));

    const { todos, count }: { todos: Array<TodoModel>; count: number } =
      yield call(
        todoService.getTodos.bind(todoService),
        page,
        LIMIT_COUNT,
        filter
      );

    if (filter !== FilterOptions.All) {
      yield put(SetCurrentPage(1));
    }

    yield put(getTodosSuccess(todos, count, Math.ceil(count / LIMIT_COUNT)));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export function* getStatsSaga({ payload }: ActionType<typeof getStatsAction>) {
  try {
    const { data }: AxiosResponse<StatsModel> = yield call(
      todoService.getStats.bind(todoService),
      payload.tags
    );

    yield put(getStatsSuccessAction(data.completed, data.created));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export function* addTodoSaga({
  payload: { title, tagId },
}: ActionType<typeof addTodoAction>) {
  try {
    yield put(setLoading(true));

    const {
      data,
    }: AxiosResponse<{
      todo: TodoModel;
    }> = yield call(todoService.createTodo.bind(todoService), title, tagId);

    yield put(addTodoSuccessAction(data.todo));
    yield put(setModal(false));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export function* updateTodoSaga({
  payload,
}: ActionType<typeof updateTodoAction>) {
  try {
    yield put(setLoading(true));

    const { todo }: { todo: TodoModel } = yield call(
      todoService.updateTodo.bind(todoService),
      payload
    );

    yield put(updateTodoSuccessAction(todo));
    yield put(setModal(false));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export function* removeTodoSaga({
  payload,
}: ActionType<typeof removeTodoAction>) {
  try {
    yield put(setLoading(true));

    const response: AxiosResponse<{
      message: string;
    }> = yield call(todoService.deleteTodo.bind(todoService), payload);

    if (response.status === 204) {
      yield put(removeTodoSuccessAction());
    }

    const { currentPage, filter }: ITodoReducer = yield select<
      (state: RootState) => ITodoReducer
    >((state) => state.todo);

    yield fetchTodoSaga(getTodosAction(currentPage, LIMIT_COUNT, filter));

    yield put(setLoading(false));
    yield put(setModal(false));
  } catch (error) {
    yield put(setError("Something went wrong"));
  }
}

export default function* watchTodoActions() {
  yield takeLatest(TodoActionTypes.FETCH_TODOS, fetchTodoSaga);
  yield takeLatest(TodoActionTypes.ADD_TODO, addTodoSaga);
  yield takeLatest(TodoActionTypes.UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TodoActionTypes.REMOVE_TODO, removeTodoSaga);
  yield takeLatest(TodoActionTypes.SET_STATS, getStatsSaga);
}
