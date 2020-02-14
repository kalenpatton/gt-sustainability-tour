import React, { Component } from 'react';
import '../styles/Setting.css';
import ToggleButton from 'react-toggle-button'

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            autoplay:this.props.autoplay,
            textDirection:this.props.textDirection,
        }
    }



    componentDidUpdate(prevState) {
        //console.log(prevState.autoplay);
    }
     
    changeAutoPlay=(value)=>{
        this.props.settingHandler.changeAutoplay(value);
    }

    changeTextDirection=(value)=>{
        this.props.settingHandler.changeTextDirection(value);
    }

    restart=()=>{
        window.location.reload();
    }


    render(){
        return(
            <div className='settingWindow'>
                
                <h3>Settings</h3>
               
                <h5>Enable Media Autoplay</h5><ToggleButton 
                value={ this.state.autoplay}
                onToggle={(value) => {
                    this.setState({
                        autoplay: !value,
                    });
                    this.changeAutoPlay(value);
                }} />

                <h5>Enable Text Direction</h5><ToggleButton 
                value={ this.state.textDirection}
                onToggle={(value) => {
                    this.setState({
                        textDirection: !value,
                    });
                    this.changeTextDirection(value);
                }} />
                
                <hr/>
                <button>Filter Sustainability Types</button><hr/>
                <button onClick={this.restart}>Restart Tour</button><hr/>
                <button id="admin-button">Admin Login</button>
            </div>
        );
    }

}