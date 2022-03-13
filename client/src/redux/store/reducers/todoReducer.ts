import { TodoAction, TodoActionTypes, TodoState } from "../../types/todo";

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  totalPages: 0,
  totalCount: 0,
  limit: 5,
  currentPage: 1,
  filter: null,
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  // console.log("action", action);

  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
        totalCount: action.payload.count,
        totalPages: action.payload.pages,
        isLoading: false,
      };
    case TodoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos:
          state.todos.length < state.limit
            ? [...state.todos, action.payload]
            : state.todos,
        totalCount: state.totalCount + 1,
        totalPages: Math.ceil((state.totalCount + 1) / state.limit),
        isLoading: false,
      };
    case TodoActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case TodoActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
