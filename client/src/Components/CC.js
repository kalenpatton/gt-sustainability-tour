import React from 'react';
import '../styles/CC.css';

export default function CC(props){
    
    return(
        <div className="CC">
            <h3>Transcript</h3>
            <p>{props.transcript}</p> 
        </div>
        );
}