// Core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import { fetchAllTasks, createTask, completeAllTasks, filter } from '../../actions/index';
import Scheduler from './index';

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
    const { tasks, taskEditing } = state;
    const someUncompletedTasks = tasks.length === 0 || tasks.some((task) => !task.completed);

    return {
        taskEditing,
        someUncompletedTasks
    };
};

const ConnectedScheduler = connect(mapStateToProps, mapDispatchToProps)(Scheduler);

export default ConnectedScheduler;
