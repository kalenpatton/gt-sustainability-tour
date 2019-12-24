import React, { Component } from 'react';
import '../styles/Header.css';

export default class Header extends Component {
    render() {
      return (
         <header className="App-header">
         <ul id="nav" className="nav">
            <li className="current"><a href="#map">Map</a></li>
            <li><a href="#Home">Home</a></li>
            <li><a href="#Setting">Settings</a></li>
         </ul>
         </header>
      );
    }
  }