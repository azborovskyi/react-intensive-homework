import React, { Component } from 'react'
import Styles from '../Scheduler/styles.scss'

export default class TaskComposer extends Component {

    state = {
        message: ''
    }

    _handleInputChange = ({ target: { value }}) => {
        this.setState({
            message: value
        })
    }

    _handleSubmit = (event) => {
        event.preventDefault()
        const { onTaskCreate } = this.props
        const { message } = this.state

        onTaskCreate(message)
    }

    render() {
        const { message } = this.state

        return (
            <form>
                <input type = 'text' value={ message } onChange={ this._handleInputChange }/>
                <button
                    type='button'
                    onClick={ this._handleSubmit }>Добавить задачу</button>
            </form>
        )
    }
}