import { put, call, select } from "redux-saga/effects";
import TodoModel from "../../../../model/Todo";
import todoService from "../../../../service/Todo";
import { TodoAction, TodoActionTypes, TodoState } from "../../../types/todo";
import { RootState } from "../../reducers";

interface Props {
  type: TodoActionTypes;
  updatedTodo: TodoModel;
}

export function* updateTodoSaga({ updatedTodo }: Props): any {
  try {
    yield put<TodoAction>({ type: TodoActionTypes.SET_LOADING, payload: true });

    const { todo }: { todo: TodoModel } = yield call(
      todoService.updateTodo.bind(todoService),
      updatedTodo
    );

    const { todos, filter }: TodoState = yield select<
      (state: RootState) => TodoState
    >((state) => state.todo);

    const todoIndex = todos.findIndex((elem) => elem._id === todo._id);
    const insertItem =
      todo.isCompleted === updatedTodo.isCompleted && filter !== null
        ? []
        : [updatedTodo];

    todos.splice(todoIndex, 1, ...insertItem);

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
