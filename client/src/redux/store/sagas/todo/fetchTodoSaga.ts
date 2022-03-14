import { put, call } from "redux-saga/effects";
import TodoModel from "../../../../model/Todo";
import todoService from "../../../../service/Todo";
import { TodoAction, TodoActionTypes } from "../../../types/todo";

interface Props {
  type: TodoActionTypes;
  page: number;
  limit: number;
  filter: null | boolean;
}

export function* fetchTodoSaga({ page, limit, filter }: Props): any {
  try {
    yield put<TodoAction>({ type: TodoActionTypes.SET_LOADING, payload: true });

    const { todos, count }: { todos: Array<TodoModel>; count: number } =
      yield call(todoService.getTodos.bind(todoService), page, limit, filter);

    if (filter !== null) {
      yield put<TodoAction>({
        type: TodoActionTypes.SET_CURRENT_PAGE,
        payload: 1,
      });
    }

    yield put<TodoAction>({
      type: TodoActionTypes.FETCH_TODOS_SUCCESS,
      payload: {
        todos,
        count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    yield put<TodoAction>({
      type: TodoActionTypes.SET_ERROR,
      payload: "Something went wrong",
    });
  }
}
