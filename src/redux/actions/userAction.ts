import * as ActionTypes from "../ActionType/ActionType";

export const deleteUser = index => ({
  type: ActionTypes.DELETE_USER,
  payload: index
});

export const addUser = () => ({
  type: ActionTypes.ADD_USER
});

export const EditUser = (values, editindex) => ({
  type: ActionTypes.EDIT_USER,
  payload: values,
  editindex: editindex
});

export const createUser = user => ({
  type: ActionTypes.CREATE_USER,
  payload: user
});
