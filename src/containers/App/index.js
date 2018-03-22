// Core
import React, { Component } from 'react'

// Components
import ConnectedScheduler from '../ConnectedScheduler'

const App = ({ store }) => {
    return <ConnectedScheduler store={ store } />;
}

export default App