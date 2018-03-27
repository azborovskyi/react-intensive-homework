// Core
import React, { Component } from 'react';
import { string, array } from 'prop-types';

// Instruments
import Task from '../Task';
import FlipMove from 'react-flip-move';

export default class TasksList extends Component {

    static propTypes = {
        tasksAndStatus: array.isRequired,
    }

    render () {
        const { tasksAndStatus } = this.props;
        const arrTasks = tasksAndStatus.map((taskWithApiStatus) => {
            const { task, apiStatus } = taskWithApiStatus;

            return (
                <Task
                    apiStatus = { apiStatus }
                    key = { task.id }
                    task = { task }
                />
            );
        });

        return (
            <ul>
                <FlipMove>
                    { arrTasks }
                </FlipMove>
            </ul>
        );
    }
}
