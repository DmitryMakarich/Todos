import { AxiosResponse } from "axios";
import { put, call, select } from "redux-saga/effects";
import todoService from "../../../../service/Todo";
import { TodoAction, TodoActionTypes, TodoState } from "../../../types/todo";
import { RootState } from "../../reducers";
import { fetchTodoSaga } from "./fetchTodoSaga";

interface Props {
  type: TodoActionTypes;
  id: string;
}

export function* removeTodoSaga({ id }: Props): any {
  try {
    yield put<TodoAction>({ type: TodoActionTypes.SET_LOADING, payload: true });

    const response: AxiosResponse<{
      message: string;
    }> = yield call(todoService.deleteTodo.bind(todoService), id);

    const { todos, totalCount, limit, currentPage, filter }: TodoState =
      yield select<(state: RootState) => TodoState>((state) => state.todo);

    let updateTodos = [...todos];
    let count = totalCount;

    if (response.status === 204) {
      // yield fetchTodoSaga({
      //   type: TodoActionTypes.FETCH_TODOS,
      //   page: currentPage,
      //   limit: limit,
      //   filter: filter,
      // });
      updateTodos = todos.filter((todo) => todo._id !== id);
      count -= 1;
    }

    const totalPages = Math.ceil(count / limit);

    if (totalPages < currentPage && totalPages !== 0) {
      yield put<TodoAction>({
        type: TodoActionTypes.SET_CURRENT_PAGE,
        payload: currentPage - 1,
      });
    }

    yield put<TodoAction>({
      type: TodoActionTypes.REMOVE_TODO_SUCCESS,
      payload: {
        todos: updateTodos,
        totalCount: count,
        totalPages,
      },
    });

    yield put<TodoAction>({
      type: TodoActionTypes.SET_LOADING,
      payload: false,
    });
  } catch (error) {
    yield put<TodoAction>({
      type: TodoActionTypes.SET_ERROR,
      payload: "Something went wrong",
    });
  }
}
