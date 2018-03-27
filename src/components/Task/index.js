import React, { Component } from 'react';
import Styles from './styles.scss';
import { connect } from 'react-redux';

// Instruments
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';
import {
    startTaskEditing,
    editedTaskTextChange,
    modifiedTaskSave,
    finishTaskEditing,
    deleteTask
} from '../../actions';

let Task = class Task extends Component {

    _onEditClick = () => {
        const { task, isEditing, dispatch, editedMessage } = this.props;

        if (task.completed) {
            return;
        }
        if (isEditing) {
            dispatch(modifiedTaskSave({ ...task, message: editedMessage }));
            dispatch(finishTaskEditing(task.id));
        } else {
            dispatch(startTaskEditing(task.id));
            this.textInput.focus();
            this.textInput.setSelectionRange(task.message.length, task.message.length);
        }
    };

    _onFavoriteClick = () => {
        const { task, dispatch } = this.props;

        dispatch(modifiedTaskSave({ ...task, favorite: !task.favorite }));
    };

    _onDeleteClick = () => {
        const { task, dispatch } = this.props;

        dispatch(deleteTask(task));
    }

    _onCompleteClick = () => {
        const { task, dispatch } = this.props;

        dispatch(modifiedTaskSave({ ...task, completed: !task.completed }));
    }

    _onKeyDown = (event) => {
        const { task: { id }, dispatch } = this.props;

        if (event.keyCode === 27) {
            dispatch(finishTaskEditing(id));
        }
    }

    _onMessageChange = ({ target: { value }}) => {
        const { task: { id }, dispatch } = this.props;

        dispatch(editedTaskTextChange(id, value));
    }

    render () {
        const { task: { message, favorite, completed }, isEditing, editedMessage } = this.props;

        return (
            <li
                className = { `${Styles.task} ${completed ? Styles.completed : ''} ${isEditing ? Styles.editing : ''}` }>
                <div>
                    { !isEditing ?
                        <Checkbox
                            checked = { completed }
                            color1 = { '#3B8EF3' }
                            color2 = { '#fff' }
                            onClick = { this._onCompleteClick }
                        /> : null }

                    <input
                        className = { completed ? Styles.completed : null }
                        readOnly = { !isEditing }
                        ref = { (input) => this.textInput = input }
                        value = { isEditing ? editedMessage : message }
                        onChange = { this._onMessageChange }
                        onKeyDown = { this._onKeyDown }
                    />
                </div>
                <Star
                    checked = { favorite }
                    color1 = { '#3B8EF3' }
                    color2 = { '#000' }
                    onClick = { this._onFavoriteClick }
                />
                <Edit
                    color1 = { '#3B8EF3' }
                    color2 = { '#000' }
                    hover = { isEditing }
                    onClick = { this._onEditClick }
                />
                <Delete
                    color1 = { '#3B8EF3' }
                    color2 = { '#000' }
                    onClick = { this._onDeleteClick }
                />
            </li>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    if (!state.taskEditing) {
        return { isEditing: false };
    }

    return {
        editedMessage: state.taskEditing.message,
        isEditing:     ownProps.task.id === state.taskEditing.taskId
    };
};

Task = connect(mapStateToProps)(Task);

export default Task;
