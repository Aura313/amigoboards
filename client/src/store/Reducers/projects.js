import { ActionTypes } from '../types';

const initialState = {
  projects: [],
  loading: true,
};

export const projectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case ActionTypes.PROJECTS_ERROR:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
