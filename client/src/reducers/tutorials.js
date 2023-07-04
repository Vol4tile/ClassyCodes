import { RETRIEVE_TUTORIALS } from "../actions/types";

const initialState = [];

const tutorialReducer = (tutorials = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_TUTORIALS:
      return payload;

    default:
      return tutorials;
  }
};

export default tutorialReducer;
