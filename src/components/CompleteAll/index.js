// Core
import React, { Component } from 'react';

// Instruments
import Checkbox from '../../theme/assets/Checkbox';

export default class CompleteAll extends Component {

    onClickCompleteAllTasks = () => {
        const { completeAllTasks, checked } = this.props;

        if (!checked) {
            completeAllTasks();
        }
    }

    render () {
        const { checked } = this.props;

        return (
            <footer>
                <span>
                    <Checkbox
                        checked = { checked }
                        color1 = '#000'
                        color2 = '#f5f5f5'
                        onClick = { this.onClickCompleteAllTasks }
                    />
                </span>
                <code>
                     Все задачи выполнены
                </code>
            </footer>
        );
    }
}
