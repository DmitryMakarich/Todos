import { createSelector } from "reselect";
import { RootState } from "../index.reducer";

export const getTodosData = createSelector(
  (state: RootState) => state.todo,
  ({ todos, currentPage, isLoading, totalPages, filter }) => ({
    todos,
    currentPage,
    isLoading,
    totalPages,
    filter,
  })
);
