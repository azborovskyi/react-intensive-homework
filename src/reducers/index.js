import * as actionType from '../actionTypes';
import { maxMessageLength } from '../config';
import { List, Map } from 'immutable';


const defaultState = {
    tasks:       [],
    taskEditing: null,
    filterText:  null
};

export const sortTasks = (tasks) => tasks.sort((task1, task2) => {
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

export default function rootReducer (state = defaultState, action) {

    const newState = { ...state, tasks: [...state.tasks]};

    switch (action.type) {
        case actionType.START_TASK_EDITING: {
            const { taskId } = action;
            const editedMessage = newState.tasks.find((task) => task.id === taskId);

            newState.taskEditing = { taskId, message: editedMessage ? editedMessage.message : '' };
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

            newState.tasks = sortTasks(tasks);
            break;
        }

        case actionType.UPDATE_TASKS_LOCAL: {
            const { tasks: updatedTasks } = action;

            const tasks = newState.tasks.map((oldTask) => {
                const newTask = updatedTasks.find((task) => task.id === oldTask.id);

                return newTask ? newTask : oldTask;
            });

            newState.tasks = sortTasks(tasks);
            break;
        }

        case actionType.DELETE_TASK_LOCAL: {
            const { task } = action;

            newState.tasks = newState.tasks.filter((taskFromArray) => taskFromArray.id !== task.id);
            break;
        }

        case actionType.SYNC_CREATED_TASK_SUCCESS: {
            const { task: taskFromApi } = action;

            newState.tasks.push(taskFromApi);
            newState.tasks = sortTasks(newState.tasks);
            break;
        }

        default:
            break;
    }

    return newState;
}
