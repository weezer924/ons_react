import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import fireapp from './store'
import { createStore } from 'redux'
import * as serviceWorker from './serviceWorker'
import './index.css'

import App from './App'
import Auth from './login/auth';
import Login from './login/login'

const initial = {
	login: false,
	username: '',
	email: ''
}

function fireReducer(state = initial, action) {
	switch(action.type) {
		case 'UPDATE_USER':
			return action.value
		default:
		  return state;
	}
}

const store = createStore(fireReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Login}/>
        <Auth>
          <Switch>
            <Route path={'/App'} component={App}/>
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
