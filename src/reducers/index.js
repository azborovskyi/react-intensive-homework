import * as actionType from '../actionTypes'
import * as syncType from '../syncTypes'

const defaultState = {
    tasks: [],
    taskEditing: null
}

export default function rootReducer (state = defaultState, action) {
    // const newState = Object.assign({}, state)
    const newState = {...state, tasks: [...state.tasks]}
    switch(action.type) {
        case actionType.CREATE_TASK_LOCAL: {
            const { tempId, message } = action
            const task = {
                id: tempId,
                message,
                isTemp: true
            }

            newState.tasks.push({ task, apiStatus: { syncInProgress: syncType.CREATE } })
            break
        }

        case actionType.SYNC_CREATED_TASK_SUCCESS: {
            const {tempId, taskFromApi} = action

            newState.tasks = newState.tasks.map(({ task, apiStatus }) => {
                return task.id === tempId
                    ? { task: taskFromApi, apiStatus: { syncInProgress: null } }
                    : { task, apiStatus }
            })
            break
        }



        default:
            break
    }

    return newState
}

/**
 *  state = {
 *      tasks: [ {
 *          task: Task,
 *          apiStatus: {
 *              ...
 *          }
 *      }],
 *      taskEditing: {
 *          taskId: String,
 *          editedValue: String
 *      }
 *  }
 *
 * APIStatus = {
 *     errorMessage: String?,
 *     syncInProgress: String?,    // Edit, Delete, Create
 *     retryAction: Fn?
 * }
 *
 * Task = {
 *      id: String,
 *      message: String,
 *      completed: false,
 *      favorite: false,
 *      created: date,
 *      modified: date
 * }
 *
 */