import { TagActionTypes } from "../../types/tag";

export const getTagAction = () => {
  return {
    type: TagActionTypes.FETCH_TAGS,
  };
};
