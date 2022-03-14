import { TodoAction, TodoActionTypes, TodoState } from "../../types/todo";

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  totalPages: 0,
  totalCount: 0,
  limit: 5,
  currentPage: 1,
  filter: null,
  error: null,
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.count,
        totalPages: action.payload.pages,
        isLoading: false,
        error: null,
      };
    case TodoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        isLoading: false,
        error: null,
      };
    case TodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: null,
      };
    case TodoActionTypes.REMOVE_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        isLoading: false,
        error: null,
      };
    case TodoActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case TodoActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TodoActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case TodoActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
