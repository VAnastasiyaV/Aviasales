import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'
import { fetchData } from './redux/actions/actions'

import App from './components/app';

import './index.css';

store
    .dispatch(fetchData())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>);

