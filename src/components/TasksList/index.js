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
        const arrTasks = tasks.map((task, index) => (
            <Task
                { ...task }
                key={task.id}
            />
        ))

        return (
            <ul>
                { arrTasks }
            </ul>
        )
    }
}