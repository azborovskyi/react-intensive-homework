import * as actionType from '../actionTypes';
import * as syncType from '../syncTypes';
import moment from 'moment';
import { maxMessageLength } from '../config';

const defaultState = {
    tasksAndStatus: [],
    taskEditing:    null,
    filterText:     null
};

const sortTasks = (tasksAndStatus) => {
    return tasksAndStatus.sort((taskWithStatus1, taskWithStatus2) => {
        const { task: task1 } = taskWithStatus1;
        const { task: task2 } = taskWithStatus2;

        // Completed go last
        if (task1.completed !== task2.completed) {
            return task1.completed === true ? 1 : -1;
        }

        // Favorites go first
        if (task1.favorite !== task2.favorite) {
            return task1.favorite === true ? -1 : 1;
        }

        if (task1.isTemp !== task2.isTemp) {
            return task1.isTemp === true ? -1 : 1;
        }

        return task1.created < task2.created ? 1 : -1;
    });
};

export default function rootReducer (state = defaultState, action) {
    const newState = { ...state, tasksAndStatus: [...state.tasksAndStatus]};

    switch (action.type) {
        case actionType.START_TASK_EDITING: {
            const { taskId } = action;
            const editedMessage = state.tasksAndStatus.find((taskWithStatus) => taskWithStatus.task.id === taskId);

            newState.taskEditing = { taskId, message: editedMessage ? editedMessage.task.message : '' };
            break;
        }

        case actionType.FINISH_TASK_EDITING: {
            newState.taskEditing = { taskId: null };
            break;
        }

        case actionType.EDITED_TASK_TEXT_CHANGE: {
            const { taskId, message } = action;
            const sanitizedMessage = message.length > maxMessageLength ? message.substr(0, maxMessageLength) : message;

            newState.taskEditing = { taskId, message: sanitizedMessage };
            break;
        }

        case actionType.FILTER: {
            const { filterText } = action;

            newState.filterText = filterText;
            break;
        }

        case actionType.FETCH_ALL_TASKS_SUCCESS: {
            const { tasks } = action;

            newState.tasksAndStatus = sortTasks(tasks.map((plainTask) => ({
                task:      plainTask,
                apiStatus: { syncInProgress: null },
            })));
            break;
        }

        case actionType.CREATE_TASK_LOCAL: {
            const { tempId, message } = action;
            const task = {
                id:        tempId,
                created:   moment().toISOString(),
                completed: false,
                favorite:  false,
                isTemp:    true,
                message,
            };

            newState.tasksAndStatus.push({ task, apiStatus: { syncInProgress: syncType.CREATE }});
            newState.tasksAndStatus = sortTasks(newState.tasksAndStatus);
            break;
        }

        case actionType.UPDATE_TASKS_LOCAL: {
            const { tasksAndStatus } = action;

            const arrUntouchedTasks = newState.tasksAndStatus.filter((taskWithStatus) =>
                (!tasksAndStatus.some((touchedTaskWithStatus) => taskWithStatus.task.id === touchedTaskWithStatus.task.id)));

            newState.tasksAndStatus = arrUntouchedTasks.concat(tasksAndStatus);
            newState.tasksAndStatus = sortTasks(newState.tasksAndStatus);
            break;
        }

        case actionType.DELETE_TASK_LOCAL: {
            const { task } = action;

            newState.tasksAndStatus = newState.tasksAndStatus.filter((taskWithStatus) => taskWithStatus.task.id !== task.id);
            break;
        }

        case actionType.SYNC_CREATED_TASK_SUCCESS: {
            const { task: taskFromApi } = action;

            newState.tasksAndStatus.push({ task: taskFromApi, apiStatus: { syncInProgress: null } });
            newState.tasksAndStatus = sortTasks(newState.tasksAndStatus);
            break;
        }

        default:
            break;
    }

    return newState;
}

/**
 *  state = {
 *      tasksAndStatus: [ {
 *          task: Task,
 *          apiStatus: {
 *              ...
 *          }
 *      }],
 *      filterText: String?,
 *      taskEditing: {
 *          taskId: String,
 *          message: String,
 *      }
 *
 *  }
 *
 * APIStatus = {
 *     error,
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
