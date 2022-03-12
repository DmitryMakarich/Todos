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
    case UserActionTypes.LOGIN_USER:
      return { isLogging: false, user: null, error: null };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return { isLogging: true, user: action.payload, error: null };
    case UserActionTypes.LOGIN_USER_ERROR:
      return { isLogging: false, user: null, error: action.payload };
    default:
      return state;
  }
};
