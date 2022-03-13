import { put, call } from "redux-saga/effects";
import TodoModel from "../../../../model/Todo";
import todoService from "../../../../service/Todo";
import { TodoActionTypes } from "../../../types/todo";

interface FetchProps {
  type: TodoActionTypes;
  page: number;
  limit: number;
}

export function* fetchTodoSaga({ page, limit }: FetchProps): any {
  try {
    const { todos, count }: { todos: Array<TodoModel>; count: number } =
      yield call(todoService.getTodos.bind(todoService), page, limit);

    yield put({
      type: TodoActionTypes.FETCH_TODOS_SUCCESS,
      payload: {
        todos,
        count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.log("error", error);
  }
}