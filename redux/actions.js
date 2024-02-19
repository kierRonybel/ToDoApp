export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';

export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const updateTask = (taskId, updatedTask) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedTask },
});

export const editTask = (id, newText) => ({
  type: EDIT_TASK,
  payload: { id, newText },
});

export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const completeTask = (taskId) => ({
  type: 'COMPLETE_TASK',
  payload: taskId,
});

export const setStoredData = (data) => ({
  type: 'SET_STORED_DATA',
  payload: data,
});