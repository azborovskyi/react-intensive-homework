import * as ActionType from '../actionTypes';
import { call, take, fork, put, select } from 'redux-saga/effects';
import * as api from '../api';
import { getTask, getAllTasks } from '../selectors';
import {
    apiTaskRequestFailed,
    apiSyncTaskCreatedSuccess,
    fetchTasksSuccess,
    updateTasksLocal,
    deleteTaskLocal
} from '../actions';

export function* retrieveAllTasks () {
    try {
        const tasks = yield call(api.getAllTasks);

        yield put(fetchTasksSuccess(tasks));
    } catch (err) {
        yield put(apiTaskRequestFailed(err));
    }
}

function* createTask (message) {
    try {
        const task = yield api.createTask(message);

        yield put(apiSyncTaskCreatedSuccess(task));
    } catch (err) {
        yield put(apiTaskRequestFailed(err));
    }
}

function* deleteTask (task) {
    try {
        yield api.deleteTask(task.id);
        yield put(deleteTaskLocal(task));
    } catch (err) {
        yield put(apiTaskRequestFailed(err, task));
    }
}

export function* completeAll () {
    const allTasks = yield select(getAllTasks);
    const tasks = allTasks.filter((task) => !task.completed)
        .map((task) => ({ ...task, completed: true }));

    if (tasks.length) {
        try {
            yield put(updateTasksLocal(tasks));
            yield call(api.updateTasks, tasks);
        } catch (err) {
            yield put(apiTaskRequestFailed(err, tasks));
        }
    }
}

export function* updateTask (task) {
    const existingTask = yield select(getTask, task.id);

    if (
        existingTask.message === task.message
        && existingTask.favorite === task.favorite
        && existingTask.completed === task.completed
    ) {
        return;
    }

    yield put(updateTasksLocal([task]));
    try {
        yield call(api.updateTasks, [task]);
    } catch (err) {
        // Rever the changes since the api request failed
        yield put(updateTasksLocal([existingTask]));
        yield put(apiTaskRequestFailed(err, task));
    }
}

const sagaMappings = {};

sagaMappings[ActionType.INITIAL_FETCH_ALL_TASKS] = { fn: retrieveAllTasks };
sagaMappings[ActionType.CREATE_TASK] = { fn: createTask, params: ['message']};
sagaMappings[ActionType.DELETE_TASK] = { fn: deleteTask, params: ['task']};
sagaMappings[ActionType.EDITED_TASK_SAVE] = { fn: updateTask, params: ['task']};
sagaMappings[ActionType.COMPLETE_ALL] = { fn: completeAll };

function* watchTaskOperations () {
    while (true) {
        const { type, ...actionParams } = yield take('*');
        const mapping = sagaMappings[type];

        if (mapping) {
            const { fn, params = []} = mapping;

            yield call(fn, ...params.map((paramKey) => actionParams[paramKey]));
        }
    }
}

export default function* rootSaga () {
    yield fork(watchTaskOperations);
}
