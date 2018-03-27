// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import HeaderSearch from '../HeaderSearch';
import TasksList from '../TasksList';
import TaskComposer from '../TaskComposer';
import CompleteAll from '../CompleteAll';

export default class Scheduler extends Component {

    componentDidMount () {
        const { fetchAllTasks } = this.props;

        fetchAllTasks();
    }

    render () {
        const { tasksAndStatus, onTaskCreate, completeAllTasks, someUncompletedTasks, filter } = this.props;

        return (
            <section className = { Styles.scheduler } >
                <main>
                    <HeaderSearch
                        filterTextChange = { filter }
                    />
                    <section>
                        <TaskComposer
                            onTaskCreate = { onTaskCreate }
                        />
                        <TasksList
                            tasksAndStatus = { tasksAndStatus }
                        />
                    </section>
                    <CompleteAll
                        checked = { !someUncompletedTasks }
                        completeAllTasks = { completeAllTasks }
                    />
                </main>
            </section>
        );
    }
}
