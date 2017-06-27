import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Form from '../views/Form';
import Table from '../views/Table';
import Calendar from '../views/Calendar';
import Timeline from '../views/Timeline';
import Steps from '../views/Steps';
import Cards from '../views/Cards';
import Mailbox from '../views/Mailbox';
import Page2 from '../views/Page2';

const validate = function (next, replace, callback) {
  const isLoggedIn = !!window.localStorage.getItem('uid')
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

const routes = (
  <Route path="/" onEnter={validate}>
    <IndexRedirect to="home" />
    <Route component={App}>
      <Route path="home" component={Home}/>
      <Route path="form" component={Form}/>
      <Route path="table" component={Table}/>
      <Route path="calendar" component={Calendar}/>
      <Route path="timeline" component={Timeline}/>
      <Route path="steps" component={Steps}/>
      <Route path="cards" component={Cards}/>
      <Route path="mailbox" component={Mailbox}/>
    </Route>
    <Route path="login" component={Login}/>
  </Route>
);

export default routes
