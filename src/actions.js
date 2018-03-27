import * as actionType from './actionTypes.js';

export const createTask = (message) => ({ type: actionType.CREATE_TASK, message });
export const fetchAllTasks = () => ({ type: actionType.INITIAL_FETCH_ALL_TASKS });
export const fetchTasksSuccess = (tasks) => ({ type: actionType.FETCH_ALL_TASKS_SUCCESS, tasks });

export const startTaskEditing = (taskId) => ({ type: actionType.START_TASK_EDITING, taskId });
export const editedTaskTextChange = (taskId, message) => ({ type: actionType.EDITED_TASK_TEXT_CHANGE, taskId, message });
export const modifiedTaskSave = (task) => ({ type: actionType.EDITED_TASK_SAVE, task });
export const finishTaskEditing = (taskId) => ({ type: actionType.FINISH_TASK_EDITING, taskId });
export const updateTasksLocal = (tasksAndStatus) => ({ type: actionType.UPDATE_TASKS_LOCAL, tasksAndStatus });
export const completeAllTasks = () => ({ type: actionType.COMPLETE_ALL });

export const deleteTask = (task) => ({ type: actionType.DELETE_TASK, task });
export const deleteTaskLocal = (task) => ({ type: actionType.DELETE_TASK_LOCAL, task });

export const apiSyncTaskCreatedSuccess = (task) => ({ type: actionType.SYNC_CREATED_TASK_SUCCESS, task });
export const apiTaskRequestFailed = (task, error) => ({ type: actionType.TASK_API_REQEUST_FAILED, task, error });

export const filter = (filterText) => ({ type: actionType.FILTER, filterText });
