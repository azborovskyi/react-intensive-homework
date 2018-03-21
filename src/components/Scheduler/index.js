import React, { Component } from 'react'
import Styles from './styles.scss'
import HeaderSearch from '../HeaderSearch';
import TasksList from '../TasksList';
import TaskComposer from '../TaskComposer';

export default class Scheduler extends Component {

    render() {
        return (
            <section className={ Styles.scheduler } >
                <main>
                    <HeaderSearch />
                    <TaskComposer />
                    <TasksList tasks={ [] }/>
                </main>
            </section>
        )
    }
}
