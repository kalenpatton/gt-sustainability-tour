import React, { Component } from 'react';
import '../styles/Header.css';
import Modal from 'react-responsive-modal';
import Setting from './Setting';

export default class Header extends Component {

   constructor(props) {
      super(props);
      this.state = {
        open:false
      };
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };
  
    onCloseModal = () => {
      this.setState({ open: false });
    };

    render() {
      return (
         <header className="App-header">
         <ul id="nav" className="nav">
            <li className="current"><a href="#map">Map</a></li>

            <li><a href="#Home">Home</a></li>

            <li  onClick={this.onOpenModal}><a href="#Setting"> Settings</a></li>
            <Modal open={this.state.open} onClose={this.onCloseModal} >
               <Setting/>
            </Modal>
         </ul>
         </header>
      );
    }
  }