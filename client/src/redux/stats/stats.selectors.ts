import { createSelector } from "reselect";
import { RootState } from "../index.reducer";

export const userStats = createSelector(
  (state: RootState) => state.stats,
  (statsState) => ({
    stats: statsState.userStats,
    isLoading: statsState.isLoading,
    count: statsState.totalCount,
    currentPage: statsState.currentPage,
    totalPages: statsState.totalPages,
    userName: statsState.userName,
  })
);
