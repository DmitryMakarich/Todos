import { createAction } from "typesafe-actions";
import TodoModel from "../../model/Todo";
import { FilterOptions } from "../../utils/FilterOptions";
import { TimeOptions } from "../../utils/TimeOptions";

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
  SET_STATS = "SET_STATS",
  SET_STATS_SUCCESS = "SET_STATS_SUCCESS",
  SET_PERIOD = "SET_PERIOD",
}

export const getTodosAction = createAction(
  TodoActionTypes.FETCH_TODOS,
  (page: number, limit: number, filter: FilterOptions) => ({
    page,
    limit,
    filter,
  })
)();

export const getStatsAction = createAction(
  TodoActionTypes.SET_STATS,
  (period: TimeOptions, tags: Array<string>) => ({
    period,
    tags,
  })
)();

export const getStatsSuccessAction = createAction(
  TodoActionTypes.SET_STATS_SUCCESS,
  (completed: number, created: number) => ({
    completed,
    created,
  })
)();

export const setPeriod = createAction(
  TodoActionTypes.SET_PERIOD,
  (period: TimeOptions) => ({
    period,
  })
)();

export const getTodosSuccess = createAction(
  TodoActionTypes.FETCH_TODOS_SUCCESS,
  (todos: Array<TodoModel>, count: number, pages: number) => ({
    todos,
    count,
    pages,
  })
)();

export const addTodoAction = createAction(
  TodoActionTypes.ADD_TODO,
  (title: string, tagId: string) => ({
    title,
    tagId,
  })
)();

export const addTodoSuccessAction = createAction(
  TodoActionTypes.ADD_TODO_SUCCESS,
  (todo: TodoModel) => todo
)();

export const updateTodoAction = createAction(
  TodoActionTypes.UPDATE_TODO,
  (updatedTodo: TodoModel) => updatedTodo
)();

export const updateTodoSuccessAction = createAction(
  TodoActionTypes.UPDATE_TODO_SUCCESS,
  (updatedTodo: TodoModel) => updatedTodo
)();

export const removeTodoAction = createAction(
  TodoActionTypes.REMOVE_TODO,
  (id: string) => id
)();

export const removeTodoSuccessAction = createAction(
  TodoActionTypes.REMOVE_TODO_SUCCESS
)();

export const SetCurrentPage = createAction(
  TodoActionTypes.SET_CURRENT_PAGE,
  (page: number) => page
)();

export const setLoading = createAction(
  TodoActionTypes.SET_LOADING,
  (isLoading: boolean) => isLoading
)();

export const setError = createAction(
  TodoActionTypes.SET_ERROR,
  (error: string) => error
)();

export const setFilter = createAction(
  TodoActionTypes.SET_FILTER,
  (filter: FilterOptions) => filter
)();
