import * as actionType from '../actionTypes';

export const startTaskEditing = (taskId) => ({ type: actionType.START_TASK_EDITING, taskId });
export const editedTaskTextChange = (taskId, message) => ({ type: actionType.EDITED_TASK_TEXT_CHANGE, taskId, message });
export const modifiedTaskSave = (task) => ({ type: actionType.EDITED_TASK_SAVE, task });
export const finishTaskEditing = (taskId) => ({ type: actionType.FINISH_TASK_EDITING, taskId });
export const deleteTask = (task) => ({ type: actionType.DELETE_TASK, task });
