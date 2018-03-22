// Core
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Instruments
import { fetchAllTasks, createTask } from '../../actions'
import Scheduler from '../../components/Scheduler'

const mapDispatchToProps = (dispatch, props) => bindActionCreators({ fetchAllTasks, onTaskCreate: createTask }, dispatch)

const mapStateToProps = (state) => {
    const tasks = state.tasks

    return {
        tasks: tasks
    }
}

const ConnectedScheduler = connect(mapStateToProps, mapDispatchToProps)(Scheduler)

export default ConnectedScheduler
