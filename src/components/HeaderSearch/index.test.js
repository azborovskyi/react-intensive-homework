// Core
import React from 'react';
import HeaderSearch from '.';
import dom from 'react-test-renderer';

const renderTree = dom.create(<HeaderSearch filterTextChange = { () => {} } />).toJSON();

test('HeaderSearch should correspond to its snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});