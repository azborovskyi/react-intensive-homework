// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import HeaderSearch from '../HeaderSearch';
import ConnectedTasksList from '../TasksList';
import TaskComposer from '../TaskComposer';
import CompleteAll from '../CompleteAll';

export default class Scheduler extends Component {

    componentDidMount () {
        const { fetchAllTasks } = this.props;

        fetchAllTasks();
    }

    render () {
        const { onTaskCreate, completeAllTasks, someUncompletedTasks, filter } = this.props;

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
                        <ConnectedTasksList />
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
