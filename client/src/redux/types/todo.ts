import TodoModel from "../../model/Todo";

export interface TodoState {
  todos: Array<TodoModel>;
  isLoading: boolean;
  totalPages: number;
  totalCount: number;
  limit: number;
  currentPage: number;
  filter: boolean | null;
  error: null | string;
}

export enum TodoActionTypes {
  FETCH_TODOS = "FETCH_TODOS",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  ADD_TODO = "ADD_TODO",
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  UPDATE_TODO = "UPDATE_TODO",
  UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS",
  REMOVE_TODO = "REMOVE_TODO",
  REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FILTER = "SET_FILTER",
}

interface FetchTodoSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: {
    todos: Array<TodoModel>;
    count: number;
    pages: number;
  };
}

interface AddTodoSuccessAction {
  type: TodoActionTypes.ADD_TODO_SUCCESS;
  payload: {
    todos: Array<TodoModel>;
    totalCount: number;
    totalPages: number;
  };
}

interface UpdateTodoSuccessAction {
  type: TodoActionTypes.UPDATE_TODO_SUCCESS;
  payload: Array<TodoModel>;
}

interface RemoveTodoSuccessAction {
  type: TodoActionTypes.REMOVE_TODO_SUCCESS;
  payload: {
    todos: Array<TodoModel>;
    totalCount: number;
    totalPages: number;
  };
}

interface SetCurrentPage {
  type: TodoActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

interface SetLoading {
  type: TodoActionTypes.SET_LOADING;
  payload: boolean;
}

interface SetError {
  type: TodoActionTypes.SET_ERROR;
  payload: string;
}

interface SetFilter {
  type: TodoActionTypes.SET_FILTER;
  payload: null | boolean;
}

export type TodoAction =
  | FetchTodoSuccessAction
  | AddTodoSuccessAction
  | UpdateTodoSuccessAction
  | RemoveTodoSuccessAction
  | SetCurrentPage
  | SetLoading
  | SetError
  | SetFilter;
