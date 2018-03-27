import React, { Component } from 'react'
import Styles from '../Scheduler/styles.scss'
import { maxMessageLength } from '../../config';

export default class TaskComposer extends Component {

    state = {
        message: '',
    }

    _handleInputChange = ({ target: { value }}) => {
        let sanitizedValue = value;

        if (sanitizedValue.length > maxMessageLength) {
            sanitizedValue = sanitizedValue.substr(0, maxMessageLength);
        }

        this.setState({
            message: sanitizedValue
        });
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        const { onTaskCreate } = this.props;
        const { message } = this.state;

        onTaskCreate(message);
        this.setState({
            message: ''
        });
    }

    render () {
        const { message } = this.state;

        return (
            <form
                onSubmit = { this._handleSubmit }>
                <input
                    type = 'text'
                    value = { message }
                    onChange = { this._handleInputChange }
                    onKeyDown = { this._onKeyDown }
                />
                <button
                    type = 'button'
                    disabled = { message.length < 1 }
                    onClick = { this._handleSubmit }>Добавить задачу</button>
            </form>
        );
    }
}
