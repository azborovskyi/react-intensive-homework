// Core
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Instruments
import Scheduler from './';

configure({ adapter: new Adapter() });

const props = {
    fetchAllTasks: jest.fn()
};

const result = shallow(<Scheduler fetchAllTasks = { props.fetchAllTasks } />, {
    context: {}
});

describe('Scheduler', () => {

    test(`Should have 2 'section' elements`, () => {
        expect(result.find('section')).toHaveLength(2);
    });

    test('Should call fetchAllTasks on mount', () => {
        console.log(result);
        expect(props.fetchAllTasks.mock.calls).toHaveLength(1);
    });
});