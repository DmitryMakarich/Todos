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

export const getStats = createSelector(
  (state: RootState) => state.todo,
  ({ completed, created, period }) => ({
    completed,
    created,
    period,
  })
);

export const getLoadingStatus = createSelector(
  (state: RootState) => state.todo,
  ({ isLoading }) => ({
    isLoading,
  })
);
