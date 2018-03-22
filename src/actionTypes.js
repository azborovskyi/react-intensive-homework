export const INITIAL_FETCH_ALL_TASKS = 'INITIAL_FETCH_ALL_TASKS'

// Create the task
export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_LOCAL = 'CREATE_TASK_LOCAL'

export const SYNC_CREATED_TASK_SUCCESS = 'SYNC_CREATED_TASK_SUCCESS'

// Called when the task message is changed (but not saved/committed yet)
export const EDIT_TASK_LOCAL = 'USER_EDIT_TASK'
export const EDIT_CANCEL_LOCAL = 'USER_EDIT_CANCEL'

// Called when the user saves a task message
export const SAVE_EDITED_TASK = 'USER_SAVE_EDITED_TASK'

// Initiate the task deletion
export const DELETE_TASK = 'USER_DELETE_TASK'

// API request is in progress
export const TASK_API_REQUEST_IN_PROGRESS = 'TASK_API_REQUEST_IN_PROGRESS'

// Indicates a successfull API request completion
export const TASK_API_REQEUST_SUCCESS = 'TASK_API_REQEUST_SUCCESS'

// Indicates a failure with the task-related API request
export const TASK_API_REQEUST_FAILED = 'TASK_API_REQEUST_FAILED'

// Toggle the priority on/off
export const TOGGLE_PRIORITY = 'TOGGLE_PRIORITY'

// Tasks completion

export const COMPLETE_TASK = 'COMPLETE_TASK'
export const COMPLETE_ALL = 'COMPLETE_ALL'

export const FILTER_LOCAL = 'FILTER_LOCAL'
