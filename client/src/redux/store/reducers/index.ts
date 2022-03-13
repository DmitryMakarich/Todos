import { combineReducers } from "redux";
import { tagReducer } from "./tagReducer";
import { todoReducer } from "./todoReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
