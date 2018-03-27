import { apiToken } from '../config';

const baseUrl = 'https://lab.lectrum.io/hw/todo/api/';

const genericRequest = async (method, body = undefined, path = '') => {
    const opts = {
        method,
        headers: {
            Authorization:  apiToken,
            'Content-Type': 'application/json',
        },
        body,
    };

    const url = `${baseUrl}${path ? `/${path}` : ''}`;
    const response = await fetch(url, opts);

    if (response.status >= 400) {
        const message = await response.text();

        throw new Error(`The API request failed with status ${response.status}. Body: ${message}`);
    }

    try {
        const { data } = await response.json();

        return data;
    } catch (e) {
        return undefined;
    }
};


export const getAllTasks = () => genericRequest('GET');

export const createTask = (message) => genericRequest('POST', JSON.stringify({ message }));

export const updateTasks = (tasks) => genericRequest('PUT', JSON.stringify(
    tasks.map((task) => ({
        id:        task.id,
        message:   task.message,
        completed: task.completed,
        favorite:  task.favorite
    }))
));

export const deleteTask = (id) => genericRequest('DELETE', undefined, id);
