import TodoModel from "../../model/Todo";

export interface TodoState {
  todos: Array<TodoModel>;
  isLoading: boolean;
  totalPages: number;
  totalCount: number;
  limit: number;
  currentPage: number;
  filter: boolean | null;
}

export enum TodoActionTypes {
  FETCH_TODOS = "FETCH_TODOS",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  FILTERED_TODOS = "FILTERED_TODOS",
  ADD_TODO = "ADD_TODO",
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  UPDATE_TODO = "UPDATE_TODO",
  UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS",
  REMOVE_TODO = "REMOVE_TODO",
  REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS",
  SET_LOADING = "SET_LOADING",
}

interface FetchTodoSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: { todos: Array<TodoModel>; count: number; pages: number };
}

interface AddTodoSuccessAction {
  type: TodoActionTypes.ADD_TODO_SUCCESS;
  payload: TodoModel;
}

interface UpdateTodoSuccessAction {
  type: TodoActionTypes.UPDATE_TODO_SUCCESS;
  payload: TodoModel;
}

interface RemoveTodoSuccessAction {
  type: TodoActionTypes.REMOVE_TODO_SUCCESS;
  payload: { id: string };
}

interface SetCurrentPage {
  type: TodoActionTypes.SET_CURRENT_PAGE;
  payload: { page: number };
}

interface SetLoading {
  type: TodoActionTypes.SET_LOADING;
  payload: boolean;
}

export type TodoAction =
  | FetchTodoSuccessAction
  | AddTodoSuccessAction
  | UpdateTodoSuccessAction
  | RemoveTodoSuccessAction
  | SetCurrentPage
  | SetLoading;
