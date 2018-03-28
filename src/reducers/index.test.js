import reducer from './index';
import * as actions from '../actions/index';
import * as editActions from '../actions/taskEditing';

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

describe('Default State and Tasks Editing', () => {
    test('Default state', () => {
        const state = reducer(undefined, { type: 'INIT' });

        expect(state).toMatchObject({
            tasks:       [],
            taskEditing: null,
            filterText:  null
        });
    });


    test('Start Task Editing', () => {
        const initState = {
            tasks:       testTasks,
            taskEditing: null,
            filterText:  null
        };

        const state = reducer(initState, editActions.startTaskEditing('5a7f136231a5d90001271637'));

        expect(state.taskEditing).toMatchObject({
            taskId:  '5a7f136231a5d90001271637',
            message: 'Hello Andrey!'
        });
    });
});


describe('Updating the tasks', () => {
    test('Update the task', () => {
        const initState = {
            tasks:       testTasks,
            taskEditing: null,
            filterText:  null
        };

        const updatedTask = {
            'id':        '5a7f136131a5d90001271636',
            'message':   'Modified',
            'completed': true,
            'favorite':  true
        };
        const state = reducer(initState, actions.updateTasksLocal([updatedTask]));

        const foundTask = state.tasks.find((task) => task.id === '5a7f136131a5d90001271636');

        expect(foundTask).toBeDefined();
        expect(foundTask).toMatchObject({
            'id':        '5a7f136131a5d90001271636',
            'message':   'Modified',
            'completed': true,
            'favorite':  true
        });
    });
});