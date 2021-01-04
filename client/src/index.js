import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute'
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import './main.css'

// components
import Header from './components/Utils/Nav/Header'
import App from './App'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import NotFound from './components/Error/NotFound'

const routing = (
  <Router>
    <Header />
    <Switch>
      <AuthenticatedRoute
        exact
        path='/register'
        component={Register}
      />
      <AuthenticatedRoute
        exact
        path='/login'
        component={Login}
      />

      <PrivateRoute
        exact
        path='/logout'
        component={Logout}
      />

      <Route
        exact path='/'
        component={App}>
      </Route>
      <Route
        path='*'
        component={NotFound}
      />

    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));