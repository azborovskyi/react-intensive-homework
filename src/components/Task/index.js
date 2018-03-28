import React, { Component } from 'react';
import Styles from './styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';
import * as editActions from '../../actions/taskEditing';

let Task = class Task extends Component {

    _onEditClick = () => {
        const { task, isEditing, actions, editedMessage } = this.props;

        if (task.completed) {
            return;
        }
        if (isEditing) {
            actions.modifiedTaskSave({ ...task, message: editedMessage });
            actions.finishTaskEditing(task.id);
        } else {
            actions.startTaskEditing(task.id);
            this.textInput.focus();
            this.textInput.setSelectionRange(task.message.length, task.message.length);
        }
    };

    _onFavoriteClick = () => {
        const { task, actions } = this.props;

        actions.modifiedTaskSave({ ...task, favorite: !task.favorite });
    };

    _onDeleteClick = () => {
        const { task, actions } = this.props;

        actions.deleteTask(task);
    }

    _onCompleteClick = () => {
        const { task, actions } = this.props;

        actions.modifiedTaskSave({ ...task, completed: !task.completed });
    }

    _onKeyDown = (event) => {
        const { task: { id }, actions } = this.props;

        if (event.keyCode === 27) {
            actions.finishTaskEditing(id);
        }
    }

    _onMessageChange = ({ target: { value }}) => {
        const { task: { id }, actions } = this.props;

        actions.editedTaskTextChange(id, value);
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

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(editActions, dispatch) });

Task = connect(mapStateToProps, mapDispatchToProps)(Task);

export default Task;
