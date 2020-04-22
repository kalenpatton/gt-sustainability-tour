import React from 'react';
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
  Redirect
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">

                <Switch>
                    <Route path="/adminlogin" component={Login} />
                    <Route path="/admindash" component={withAuth(Dashboard)} />
                </Switch>
            </div>
        </Router>
    );
}

// function Home() {
//     // TODO: Check if user has a session token. For now, just go to login
//     return (
//         <Redirect to="/admin/login"/>
//     );
// }

export default App;
