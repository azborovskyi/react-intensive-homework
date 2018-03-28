// Core
import React, { Component } from 'react';
import { string, array } from 'prop-types';

// Instruments
import Task from '../Task';
import FlipMove from 'react-flip-move';
import Scheduler from '../Scheduler';
import { connect } from 'react-redux';

export class TasksList extends Component {

    static propTypes = {
        tasks: array.isRequired,
    }

    render () {
        const { tasks } = this.props;
        const arrTasks = tasks.map((task) => {
            return (
                <Task
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


const mapStateToProps = (state) => {
    const { tasks, filterText } = state;

    const filteredTasks =
        (filterText && filterText.length > 0)
            ? tasks.filter((task) => task.message.toLowerCase().includes(filterText.toLowerCase()))
            : tasks;

    return {
        tasks: filteredTasks
    };
};

const ConnectedTasksList = connect(mapStateToProps)(TasksList);

export default ConnectedTasksList;
