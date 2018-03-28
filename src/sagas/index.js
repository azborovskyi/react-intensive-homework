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

function* retrieveAllTasks () {
    try {
        const tasks = yield api.getAllTasks();

        yield put(fetchTasksSuccess(tasks));
    } catch (e) {
        console.error(e.message);
    }
}

function* createTask (message) {
    try {
        const task = yield api.createTask(message);

        yield put(apiSyncTaskCreatedSuccess(task));
    } catch (e) {
        console.error(e.message);
        yield put(apiTaskRequestFailed());
    }
}

function* deleteTask (task) {
    yield api.deleteTask(task.id);
    yield put(deleteTaskLocal(task));
}

function* completeAll () {
    const allTasks = yield select(getAllTasks);
    const tasks = allTasks.filter((task) => !task.completed)
        .map((task) => ({ ...task, completed: true }));

    if (tasks.length) {
        yield put(updateTasksLocal(tasks));
        yield call(api.updateTasks, tasks);
    }
}

function* updateTask (task) {
    const existingTask = yield select(getTask, task.id);

    if (
        existingTask.message === task.message
        && existingTask.favorite === task.favorite
        && existingTask.completed === task.completed
    ) {
        return;
    }

    yield put(updateTasksLocal([task]));
    let apiException = null;

    try {
        yield call(api.updateTasks, [task]);
    } catch (e) {
        apiException = e;
        yield put(updateTasksLocal([task]));
    } finally {
        if (!apiException) {
            yield put(updateTasksLocal([task]));
        }
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
