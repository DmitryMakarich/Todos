import { TagAction, TagActionTypes, TagState } from "../../types/tag";

const initialState: TagState = {
  tags: [],
  isLoading: true,
  error: null,
};

export const tagReducer = (
  state = initialState,
  action: TagAction
): TagState => {
  switch (action.type) {
    case TagActionTypes.FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload,
        isLoading: false,
      };
    case TagActionTypes.FETCH_TAGS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
