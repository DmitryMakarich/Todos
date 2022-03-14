import { takeLatest } from "redux-saga/effects";
import { TodoActionTypes } from "../../../types/todo";
import { addTodoSaga } from "./addTodoSaga";
import { fetchTodoSaga } from "./fetchTodoSaga";
import { removeTodoSaga } from "./removeTodoSaga";
import { updateTodoSaga } from "./updateTodoSaga";

export default function* watchTodoActions() {
  yield takeLatest(TodoActionTypes.FETCH_TODOS, fetchTodoSaga);
  yield takeLatest(TodoActionTypes.ADD_TODO, addTodoSaga);
  yield takeLatest(TodoActionTypes.UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TodoActionTypes.REMOVE_TODO, removeTodoSaga);
}
