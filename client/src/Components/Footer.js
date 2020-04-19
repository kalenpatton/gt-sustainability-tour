import React from 'react';
import '../styles/Footer.css';

export default function Footer(props){
  return (
    <footer className="App-footer">
      <span id="nextStop">Next Stop: {props.nextStop}</span>
    </footer>
  );

}