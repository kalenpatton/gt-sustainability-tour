import React, { Component } from 'react';
import '../styles/Setting.css';

export default class Header extends Component {

    render(){
        return(
            <div className='settingWindow'>
                
                <h3>Settings</h3>
                <ul>
                    <li><button>Filter Sustainability Types</button></li><hr/>
                    <li><button>Change Order of Stops</button></li><hr/>
                    <li><button>Enable Text Directions</button></li><hr/>
                    <li><button>Enable Info along Routes</button></li><hr/>
                    <li><button>Language</button></li><hr/>
                    <li><button>Restart Tour</button></li><hr/>
                    <li><button id="admin-button">Admin Login</button></li>

                </ul>
            </div>
        );
    }

}