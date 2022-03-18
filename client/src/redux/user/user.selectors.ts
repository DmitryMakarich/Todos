import { createSelector } from "reselect";
import { RootState } from "../index.reducer";

export const loggingInfo = createSelector(
  (state: RootState) => state.user,
  (userState) => ({
    error: userState.error,
    isLogging: userState.isLogging,
  })
);

export const userInfo = createSelector(
  (state: RootState) => state.user,
  (userState) => ({
    user: userState.user,
  })
);

