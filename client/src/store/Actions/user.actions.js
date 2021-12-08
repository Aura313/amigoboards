import { ActionTypes } from '../types';

export const getUser = (payload) => ({
  type: ActionTypes.GET_USER,
  payload,
});
