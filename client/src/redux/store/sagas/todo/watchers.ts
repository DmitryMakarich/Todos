import { takeLatest } from "redux-saga/effects";
import { TodoActionTypes } from "../../../types/todo";
import { addTodoSaga } from "./addTodoSaga";
import { fetchTodoSaga } from "./fetchTodoSaga";

export default function* watchTodoActions() {
  yield takeLatest(TodoActionTypes.FETCH_TODOS, fetchTodoSaga);
  yield takeLatest(TodoActionTypes.ADD_TODO, addTodoSaga);
}
