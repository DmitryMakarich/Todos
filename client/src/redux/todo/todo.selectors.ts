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
  ({ completed, created }) => ({
    completed,
    created,
  })
);

export const getLoadingStatus = createSelector(
  (state: RootState) => state.todo,
  ({ isLoading }) => ({
    isLoading,
  })
);

export const getModalStatus = createSelector(
  (state: RootState) => state.todo,
  ({ isModalOpen }) => ({
    isModalOpen,
  })
);
