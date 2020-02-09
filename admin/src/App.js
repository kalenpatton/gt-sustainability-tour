import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import withAuth from './components/WithAuth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={withAuth(Dashboard)} />
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    // TODO: Check if user has a session token. For now, just go to login
    return (
        <Redirect to="/login"/>
    );
}

export default App;
