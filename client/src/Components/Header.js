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
            <p onClick={this.onOpenModal} id="setting"><i className="fas fa-cog"></i> Settings</p>
            <Modal open={this.state.open} onClose={this.onCloseModal} >
               <Setting settingHandler={this.props.settingHandler} value={this.props.value}/>
            </Modal>


         </header>
      );
    }
  }