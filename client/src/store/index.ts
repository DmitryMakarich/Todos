import { createContext, useContext } from "react";
import UserStore from "./User";
import TodoStore from "./Todo";

interface Store {
  userStore: UserStore;
  todoStore: TodoStore;
}

export const store: Store = {
  userStore: new UserStore(),
  todoStore: new TodoStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
