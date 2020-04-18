import React from 'react';
import logo from './logo.svg';
import './GTStyles.css';
import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import withAuth from './Components/WithAuth';
import './style.css';

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
