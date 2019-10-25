import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import NodeNew from './Nodes/NodeNew';
import NodeList from './Nodes/NodeList';
import NodeDelete from './Nodes/NodeDelete';
import MonitorWidget from './Monitor/MonitorWidget';

import history from '../history';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="ui container">
        <BrowserRouter history={history}>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/nodes/monitor" component={MonitorWidget} />
            <Route path="/node/new" component={NodeNew} />
            <Route path="/nodes/show" exact component={NodeList} />
            <Route path="/nodes/delete/:id" exact component={NodeDelete} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
