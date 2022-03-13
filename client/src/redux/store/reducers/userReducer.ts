import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  isLogging: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return { ...state, isLogging: true, user: action.payload, error: null };
    case UserActionTypes.LOGIN_USER_ERROR:
      return { ...state, error: action.payload };
    case UserActionTypes.REGISTER_USER_ERROR:
      return { ...state, error: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        isLogging: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
