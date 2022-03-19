import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider} from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from './_reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(
      promiseMiddleware, ReduxThunk)
    ));

ReactDOM.render(
  // Provider는 어렵게 생각할거 없이 단순한 하나의 컴포넌트이다. react로 작성된 컴포넌트들을 
  // Provider안에 넣으면 하위 컴포넌트들이 Provider를 통해 redux store에 접근이 가능해진다
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
