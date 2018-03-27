// Core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import { fetchAllTasks, createTask, completeAllTasks, filter } from '../../actions';
import Scheduler from '../../components/Scheduler';

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        fetchAllTasks,
        onTaskCreate: createTask,
        completeAllTasks,
        filter
    },
    dispatch
);

const mapStateToProps = (state) => {
    const { tasksAndStatus, taskEditing, filterText } = state;
    const someUncompletedTasks = (tasksAndStatus.length === 0) || tasksAndStatus.some((taskWithStatus) => !taskWithStatus.task.completed);

    const filteredTasks =
        (filterText && filterText.length > 0)
            ? tasksAndStatus.filter((task) => task.task.message.includes(filterText))
            : tasksAndStatus;

    return {
        tasksAndStatus: filteredTasks,
        taskEditing,
        someUncompletedTasks
    };
};

const ConnectedScheduler = connect(mapStateToProps, mapDispatchToProps)(Scheduler);

export default ConnectedScheduler;
