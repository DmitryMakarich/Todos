import { createContext, useContext } from "react";
import UserStore from "./User";
import TodoStore from "./Todo";
import TagStore from "./Tag";

interface Store {
  userStore: UserStore;
  todoStore: TodoStore;
  tagStore: TagStore;
}

export const store: Store = {
  userStore: new UserStore(),
  todoStore: new TodoStore(),
  tagStore: new TagStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
