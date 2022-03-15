import { createSelector } from "reselect";
import { RootState } from "../index.reducer";

export const getTags = createSelector(
  (state: RootState) => state.tag,
  ({ tags }) => ({
    tags,
  })
);
