// Core
import React, { Component } from 'react'

// Instruments
import Checkbox from '../../theme/assets/Checkbox'

export default class CompleteAll extends Component {
    render() {
        return (
            <footer>
                <span>
                    <Checkbox
                        color1 = '#000'
                        color2 = '#f5f5f5'
                    />
                </span>
                <code>
                     Все задачи выполнены
                </code>
            </footer>
        )
    }
}