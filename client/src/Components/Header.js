import React, { Component } from 'react';
import '../styles/Header.css';
import Modal from 'react-responsive-modal';
import Setting from './Setting';

export default class Header extends Component {

   constructor(props) {
      super(props);
      this.state = {
        open:false,
        nextStop:"N/A",
      };
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
      //update map ref
      if(this.props.map){
        this.props.map.updateFilteredSites();
      }
    };

    render() {
      return (
         <header className="App-header">
            <span> <img src="gt-logo.svg" alt="Georgia Institute of Technology" className="gt-logo"/></span>
            <span onClick={this.onOpenModal} id="setting"><i className="fas fa-cog"></i></span>
            <Modal open={this.state.open} onClose={this.onCloseModal} >
               <Setting settingHandler={this.props.settingHandler} autoplay={this.props.autoplay} textDirection={this.props.textDirection}/>
            </Modal>
         </header>
      );
    }
  }