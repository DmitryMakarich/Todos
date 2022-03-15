import { ActionType } from "typesafe-actions";
import * as todoActions from "./todo/todo.actions";
import * as tagActions from "./tag/tag.actions";
import * as userActions from "./user/user.actions";

export type RootActions = ActionType<
  typeof todoActions | typeof tagActions | typeof userActions
>;
