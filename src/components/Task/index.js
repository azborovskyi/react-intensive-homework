import React, { Component } from 'react'
import Styles from './styles.scss'

// Instruments
import Checkbox from '../../theme/assets/Checkbox'
import Star from '../../theme/assets/Star'
import Edit from '../../theme/assets/Edit'
import Delete from '../../theme/assets/Delete'

export default class Task extends Component {

    render () {
        const { id, message } = this.props

        return (
            <li className = { Styles.task }>
                <div>
                    <Checkbox
                        color1 = { '#3B8EF3' }
                        color2 = { '#fff' }
                    />
                    <input value = { message } readOnly/>
                </div>
                <Star />
                <Edit />
                <Delete />
            </li>
        )
    }
}
