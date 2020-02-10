import React, { Component } from 'react';
import '../styles/Setting.css';
import ToggleButton from 'react-toggle-button'

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={value:this.props.value}
    }

    changeValue=(value)=>{
        this.props.settingHandler.changeAutoplay(value);
    }


    render(){
        return(
            <div className='settingWindow'>
                
                <h3>Settings</h3>
               
                <h5>Enable Media Autoplay</h5><ToggleButton 
                value={ this.state.value || false }
                onToggle={(value) => {
                    this.setState({
                    value: !value,
                    });
                    this.changeValue(value);
                }} />
                
                <hr/>
                <button>Filter Sustainability Types</button><hr/>
                <button>Restart Tour</button><hr/>
                <button id="admin-button">Admin Login</button>
            </div>
        );
    }

}