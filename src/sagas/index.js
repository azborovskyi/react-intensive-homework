import * as ActionType from '../actionTypes'
import { call, take, fork, put } from 'redux-saga/effects'
import * as api from '../api'
import { apiSyncFailed, createTaskLocally } from '../actions'

function* getAllTasks() {
    try {
        const tasks = yield api.getAllTasks()
        console.log(tasks)
    } catch (e) {
        console.error(e.message)
    }
}

function* createTask(message) {
    const tempId = '1fds'
    yield put(createTaskLocally(tempId, message))
    try {
        const task = yield api.createTask(task)
        console.log(task)
        yield put(apiSyncTaskCreatedSuccess(tempId, task))
    } catch (e) {
        console.error(e.message)
        yield put(apiSyncFailed())
    }
}

const completeTask = (task) => {

}

const deleteTask = (task) => {

}

const updateTask = (task) => {

}

const sagaMappings = {}

sagaMappings[ActionType.INITIAL_FETCH_ALL_TASKS] =  { fn: getAllTasks }
sagaMappings[ActionType.CREATE_TASK] =              { fn: createTask,     params: ['message']}
sagaMappings[ActionType.COMPLETE_TASK] =            { fn: completeTask,   params: ['task']}
sagaMappings[ActionType.DELETE_TASK] =              { fn: deleteTask,     params: ['task']}
sagaMappings[ActionType.SAVE_EDITED_TASK] =         { fn: updateTask,     params: ['task']}


function* watchTaskOperations () {
    while (true) {
        // const { type, ...actionParams } = yield take('*')
        const { type, ...actionParams } = yield take('*')
        console.log(`type = ${type}, params = ${JSON.stringify(actionParams)} `)
        const mapping = sagaMappings[type]
        const { fn, params = []} = mapping

        if (!fn) {
            console.log('Action not known to the saga')
            continue
        }
        // yield call(getAllTasks)
        yield call(fn, ...params.map((paramKey) => actionParams[paramKey]))
    }
}

export default function* rootSaga () {
    yield fork(watchTaskOperations)
}