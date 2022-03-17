import { createReducer } from "typesafe-actions";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import { TimePeriod } from "../../model/Stats";
import TodoModel from "../../model/Todo";
import { FilterOptions } from "../../utils/FilterOptions";
import { RootActions } from "../index.actions";
import {
  addTodoSuccessAction,
  getStatsSuccessAction,
  getTodosSuccess,
  removeTodoSuccessAction,
  SetCurrentPage,
  setError,
  setFilter,
  setLoading,
  setModal,
  updateTodoSuccessAction,
} from "./todo.actions";

export interface ITodoReducer {
  todos: Array<TodoModel>;
  isLoading: boolean;
  totalPages: number;
  totalCount: number;
  isModalOpen: boolean;
  currentPage: number;
  created: TimePeriod;
  completed: TimePeriod;
  filter: FilterOptions;
  error: null | string;
}

const initialState: ITodoReducer = {
  todos: [],
  isLoading: true,
  totalPages: 0,
  totalCount: 0,
  created: {
    dayCount: 0,
    weekCount: 0,
    allTimeCount: 0,
  },
  completed: {
    dayCount: 0,
    weekCount: 0,
    allTimeCount: 0,
  },
  isModalOpen: false,
  currentPage: 1,
  filter: FilterOptions.All,
  error: null,
};

export const todoReducer = createReducer<ITodoReducer, RootActions>(
  initialState
)
  .handleAction(getTodosSuccess, (state, { payload }) => ({
    ...state,
    todos: [...payload.todos],
    totalCount: payload.count,
    totalPages: payload.pages,
    isLoading: false,
    error: null,
  }))
  .handleAction(getStatsSuccessAction, (state, { payload }) => ({
    ...state,
    completed: payload.completed,
    created: payload.created,
    error: null,
  }))
  .handleAction(addTodoSuccessAction, (state, { payload }) => ({
    ...state,
    todos:
      state.todos.length < LIMIT_COUNT
        ? [...state.todos, payload]
        : [...state.todos],
    totalCount: state.totalCount + 1,
    totalPages: Math.ceil((state.totalCount + 1) / LIMIT_COUNT),
    isLoading: false,
    error: null,
  }))
  .handleAction(updateTodoSuccessAction, (state, { payload }) => {
    const todoIndex = state.todos.findIndex((elem) => elem._id === payload._id);
    const insertItem =
      state.todos[todoIndex].isCompleted !== payload.isCompleted &&
      state.filter !== FilterOptions.All
        ? []
        : [payload];

    state.todos.splice(todoIndex, 1, ...insertItem);

    return {
      ...state,
      isLoading: false,
      error: null,
    };
  })
  .handleAction(removeTodoSuccessAction, (state, {}) => {
    const count = state.totalCount - 1;
    const totalPages = Math.ceil(count / LIMIT_COUNT);
    let currentPage = state.currentPage;

    if (totalPages < state.currentPage && totalPages !== 0) {
      currentPage -= 1;
    }

    return {
      ...state,
      totalCount: count,
      totalPages: totalPages,
      currentPage: currentPage,
      isLoading: false,
      error: null,
    };
  })
  .handleAction(SetCurrentPage, (state, { payload }) => ({
    ...state,
    currentPage: payload,
  }))
  .handleAction(setLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }))
  .handleAction(setFilter, (state, { payload }) => ({
    ...state,
    filter: payload,
  }))
  .handleAction(setError, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
  .handleAction(setModal, (state, { payload }) => ({
    ...state,
    isModalOpen: payload,
  }));
