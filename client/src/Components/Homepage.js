import React, { Component } from 'react';
import '../styles/Homepage.css';
import pic from '../images/gtlogo.png';
import history from '../history';

export default class Homepage extends Component{


    redirect=()=>{ 
        history.push('/tour');
        window.location.reload();
        
    }

    
    render(){
        return (
       
            <div id="Homepage">
                <p className='center'>GT-Sustainability-Tour </p>
                <img src={pic} className='center'/>
                <p>some info</p>
                <button onClick={this.redirect}><i className="fas fa-walking"></i> Start Tour</button>

            </div>

        
      );



    }
    
}