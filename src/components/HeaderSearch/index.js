import React from 'react';
import { func } from 'prop-types';

const HeaderSearch = (props) => {

    const _onFilterChange = ({ target: { value }}) => {
        const { filterTextChange } = props;

        filterTextChange(value);
    };

    return (
        <header>
            <h1>Планировщик задач</h1>
            <input
                onChange = { _onFilterChange }
            />
        </header>
    );
};

HeaderSearch.propTypes = {
    filterTextChange: func
};

export default HeaderSearch;
