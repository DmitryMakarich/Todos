import { AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import TodoModel from "../../../../model/Todo";
import todoService from "../../../../service/Todo";
import { TodoActionTypes } from "../../../types/todo";

interface FetchProps {
  type: TodoActionTypes;
  title: string;
  tagId: string;
}

export function* addTodoSaga({ title, tagId }: FetchProps): any {
  try {
    yield put({ type: TodoActionTypes.SET_LOADING, payload: true });

    const {
      data,
    }: AxiosResponse<{
      todo: TodoModel;
    }> = yield call(todoService.createTodo.bind(todoService), title, tagId);

    yield put({
      type: TodoActionTypes.ADD_TODO_SUCCESS,
      payload: data.todo,
    });
  } catch (error) {
    console.log(error);
  }
}
