import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './App.jsx';



const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Index extends Component {
  render() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
  }
}



ReactDOM.render(<Index />, document.getElementById('root'))