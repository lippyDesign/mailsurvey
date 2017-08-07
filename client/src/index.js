import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; // redux thunk will allow us to use dispatch function instead of just return an action
// STYLES
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
// COMPONENTS
import App from './components/App';
// CONFIG
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
