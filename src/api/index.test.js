import * as api from '.';
import fetchMock from 'fetch-mock';

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

test('Get All Tasks', async () => {
    const mockedResponse = {
        message: 'the request has succeeded',
        data:    testTasks
    };

    fetchMock.get('*', mockedResponse);
    const response = await api.getAllTasks();

    expect(response).toMatchObject(testTasks);
});

test('Update task', async () => {
    const mockedResponse = {
        message: 'the request has succeeded',
        data:    [testTasks[0]]
    };

    fetchMock.put('*', mockedResponse);
    const response = await api.updateTasks([testTasks[0]]);

    expect(response).toMatchObject([testTasks[0]]);
});
