import { ActionTypes } from "../types";

// Project Actions
export const createProject = (payload) => ({
  type: ActionTypes.CREATE_PROJECT,
  payload,
});

export const getProjects = (payload) => ({
    type: ActionTypes.GET_PROJECTS,
    payload,
  });
