import * as actionType from './actionTypes.js'

export const createTask = (message) => ({ type: actionType.CREATE_TASK, message })
export const fetchAllTasks = () => ({ type: actionType.INITIAL_FETCH_ALL_TASKS })
export const createTaskLocally = (tempId, message) => ({ type: actionType.CREATE_TASK_LOCAL, tempId, message })

export const apiSyncTaskCreatedSuccess = (tempId, task) => ({ type: actionType.SYNC_CREATED_TASK_SUCCESS, tempId, task })
export const apiSyncFailed = () => ({ type: actionType.TASK_API_REQEUST_FAILED })
export const updateTask = (task) => ({ type: actionType.SAVE_EDITED_TASK, task })

export const apiRequestFailed = (task, error) => ({ type: actionType.TASK_API_REQEUST_FAILED, task, error })