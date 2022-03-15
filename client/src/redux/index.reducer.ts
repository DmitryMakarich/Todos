import { combineReducers } from "redux";
import { tagReducer } from "./tag/tag.reducer";
import { todoReducer } from "./todo/todo.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
