const token = 'abc'
const baseUrl = 'https://lab.lectrum.io/hw/todo/api/'

const genericRequest = async (method, body = undefined, path = '') => {
    const response = await fetch(`${baseUrl}${ path ? `/${path}` : ''}`, {
        method: method,
        headers: {
            Authorization: token,
        },
        body: body
    })

    if (response.status >= 400) {
        const { message } = await response.text()
        throw new Error(`The API request failed with status ${response.status}. Body: ${message}`)
    }

    const { data } = await response.json()
    return data
}


export const getAllTasks = () => genericRequest('GET')

export const createTask = (message) => genericRequest('POST', message)

export const updateTask = (task) => genericRequest('PUT', task)

export const deleteTask = (id) => genericRequest('DELETE', undefined, id)