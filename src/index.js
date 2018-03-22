// Core
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Instruments
import './theme/reset.css';
import rootSaga from './sagas'
import reducer from './reducers'

// App
import App from './containers/App';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

render(
    <App store={store}/>,
    document.getElementById('root')
);
