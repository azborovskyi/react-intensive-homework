import React, { Component } from 'react'
import Styles from './styles.scss'
import HeaderSearch from '../HeaderSearch';
import TasksList from '../TasksList';
import TaskComposer from '../TaskComposer';
import CompleteAll from '../CompleteAll';

const tasks = [
    {
        id:    1,
        title: 'Task One',
        isHighPriority: true,
        isComplete: false
    },
    {
        id:    2,
        title: 'Task Two',
        isHighPriority: false,
        isComplete: false
    },
    {
        id:    3,
        title: 'Task Three',
        isHighPriority: true,
        isComplete: true
    }
]

export default class Scheduler extends Component {

    render() {
        return (
            <section className={ Styles.scheduler } >
                <main>
                    <HeaderSearch />
                    <section>
                        <TaskComposer />
                        <TasksList tasks={ tasks }/>
                    </section>
                    <CompleteAll/>
                </main>
            </section>
        )
    }
}
