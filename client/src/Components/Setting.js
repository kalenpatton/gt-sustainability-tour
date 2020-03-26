import React, { Component } from 'react';
import '../styles/Setting.css';
import ToggleButton from 'react-toggle-button';

import history from '../history';
import Filter from '../Components/Filter';



export default class Header extends Component {
    constructor(props){
        super(props);
       
        this.state={
            autoplay:this.props.autoplay,
            textDirection:this.props.textDirection,

           
        }
    }

    
     
    changeAutoPlay=(value)=>{
        this.props.settingHandler.changeAutoplay(value);
    }

    changeTextDirection=(value)=>{
        this.props.settingHandler.changeTextDirection(value);
    }

    restart=()=>{
        history.push('/');
        window.location.reload();
    }


    render(){
       
        return(
            <div className='settingWindow'>
                
                <h3>Settings</h3>

                <h5>Filter Sustainability Types</h5>

                <Filter filterHander={this.props.settingHandler}/>


                <hr/>
               
                <h5>Enable Media Autoplay</h5><ToggleButton 
                value={ this.state.autoplay}
                onToggle={(value) => {
                    this.setState({
                        autoplay: !value,
                    });
                    this.changeAutoPlay(value);
                }} />

                <h5>Enable Text Directions</h5><ToggleButton 
                value={ this.state.textDirection}
                onToggle={(value) => {
                    this.setState({
                        textDirection: !value,
                    });
                    this.changeTextDirection(value);
                }} />
                
                <hr/>
                

                
                <button onClick={this.restart} id="restart">Restart Tour</button>
                <button id="admin-button">Admin Login</button>
            </div>
        );
    }

}