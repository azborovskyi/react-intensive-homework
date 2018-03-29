import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { apiTaskRequestFailed, fetchTasksSuccess } from '../actions';
import { getAllTasks } from '../selectors';
import { retrieveAllTasks, completeAll } from '.';
import * as api from '../api';

const testTasks = [
    {
        'id':        '5a7f136231a5d90001271637',
        'message':   'Hello Andrey!',
        'completed': true,
        'favorite':  false,
        'created':   '2018-02-10T15:44:34.624Z',
        'modified':  '2018-02-10T16:01:12.406Z'
    },
    {
        'id':        '5a7f136131a5d90001271636',
        'message':   'Hello',
        'completed': false,
        'favorite':  false,
        'created':   '2018-02-10T15:44:33.675Z'
    },
    {
        'id':        '5a7f136031a5d90001271635',
        'message':   'Hello',
        'completed': false,
        'favorite':  false,
        'created':   '2018-02-10T15:44:32.959Z'
    }
];

describe('Basic saga operations', () => {
    const generator = cloneableGenerator(retrieveAllTasks)();

    test('Fetching the tasks', () => {
        const clone = generator.clone();

        expect(clone.next().value).toEqual(call(api.getAllTasks));
        expect(clone.next(testTasks).value).toEqual(put(fetchTasksSuccess(testTasks)));
    });

    test('Fetching the tasks failure case', () => {
        const iterator = generator.clone();
        const error = { message: 'api request has failed' };

        expect(iterator.next().value).toEqual(call(api.getAllTasks));
        expect(iterator.throw(error).value).toEqual(put(apiTaskRequestFailed(error)));
    });
});

describe('Complete All Testing', () => {
    const generator = cloneableGenerator(completeAll)();

    test('', () => {
        const iterator = generator.clone();

        expect(iterator.next().value).toMatchObject(select(getAllTasks));
        expect(iterator.next([]).done).toEqual(true);
    });
});
