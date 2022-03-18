import { combineReducers } from "redux";
import { statsReducer } from "./stats/stats.reducer";
import { tagReducer } from "./tag/tag.reducer";
import { todoReducer } from "./todo/todo.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  todo: todoReducer,
  stats: statsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
