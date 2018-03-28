export const INITIAL_FETCH_ALL_TASKS = 'INITIAL_FETCH_ALL_TASKS';
export const FETCH_ALL_TASKS_SUCCESS = 'FETCH_ALL_TASKS_SUCCESS';

// Create the task
export const CREATE_TASK = 'CREATE_TASK';
export const SYNC_CREATED_TASK_SUCCESS = 'SYNC_CREATED_TASK_SUCCESS';
export const UPDATE_TASKS_LOCAL = 'UPDATE_TASKS_LOCAL';

// Called when the task message is changed (but not saved/committed yet)
export const START_TASK_EDITING = 'START_TASK_EDITING';
export const EDITED_TASK_TEXT_CHANGE = 'EDITED_TASK_TEXT_CHANGE';
export const EDITED_TASK_SAVE = 'EDITED_TASK_SAVE';
export const FINISH_TASK_EDITING = 'FINISH_TASK_EDITING';

// Initiate the task deletion
export const DELETE_TASK = 'USER_DELETE_TASK';
export const DELETE_TASK_LOCAL = 'DELETE_TASK_LOCAL';

// Indicates a failure with the task-related API request
export const TASK_API_REQEUST_FAILED = 'TASK_API_REQEUST_FAILED';

// Tasks completion
export const COMPLETE_ALL = 'COMPLETE_ALL';

export const FILTER = 'FILTER';
