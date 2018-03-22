// Core
import React, { Component } from 'react'
import { string, array } from 'prop-types'

// Instruments
import Task from '../Task'

export default class TasksList extends Component {

    static propTypes = {
        tasks: array.isRequired
    }

    render() {
        const { tasks } = this.props
        const arrTasks = tasks.map((taskWithApiStatus) => {
            const plainTask = taskWithApiStatus.task
            return <Task
                {...plainTask}
                key={plainTask.id}
            />
        })

        return (
            <ul>
                { arrTasks }
            </ul>
        )
    }
}