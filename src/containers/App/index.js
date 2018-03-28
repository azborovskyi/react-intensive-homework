// Core
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// Components
import ConnectedScheduler from '../../components/Scheduler/connectedScheduler';

const App = ({ store }) =>
    (<Provider store = { store } >
        <ConnectedScheduler />
    </Provider>);

export default App;
