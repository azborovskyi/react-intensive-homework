import React, { Component } from 'react';

export default class HeaderSearch extends Component {

    _onFilterChange = ({ target: { value }}) => {
        const { filterTextChange } = this.props;

        filterTextChange(value);
    }

    render () {
        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    onChange = { this._onFilterChange }
                />
            </header>
        );
    }
}
