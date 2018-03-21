import React, { Component } from 'react'
import Styles from '../Scheduler/styles.scss'

export default class TaskComposer extends Component {

    render() {
        return (
            <section>
                <form>
                    <input type = 'text'/>
                    <button>Добавить задачу</button>
                </form>
            </section>
        )
    }
}