import { AxiosResponse } from "axios";
import { put, call, select } from "redux-saga/effects";
import TodoModel from "../../../../model/Todo";
import todoService from "../../../../service/Todo";
import { TodoAction, TodoActionTypes, TodoState } from "../../../types/todo";
import { RootState } from "../../reducers";

interface Props {
  type: TodoActionTypes;
  title: string;
  tagId: string;
}

export function* addTodoSaga({ title, tagId }: Props): any {
  try {
    yield put({ type: TodoActionTypes.SET_LOADING, payload: true });

    const {
      data,
    }: AxiosResponse<{
      todo: TodoModel;
    }> = yield call(todoService.createTodo.bind(todoService), title, tagId);

    const { todos, totalCount, limit }: TodoState = yield select<
      (state: RootState) => TodoState
    >((state) => state.todo);

    const newTodos = todos.length < limit ? [...todos, data.todo] : [...todos];

    yield put<TodoAction>({
      type: TodoActionTypes.ADD_TODO_SUCCESS,
      payload: {
        todos: newTodos,
        totalCount: totalCount + 1,
        totalPages: Math.ceil((totalCount + 1) / limit),
      },
    });
  } catch (error) {
    yield put<TodoAction>({
      type: TodoActionTypes.SET_ERROR,
      payload: "Something went wrong",
    });
  }
}
