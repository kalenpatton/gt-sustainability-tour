import React from 'react';
import '../styles/Gallery.css';
import pic from '../images/gtlogo.png';


export default function Gallery(props){
        return(
            <div className='gallery'>
                <h3>image gallery</h3>
                <img src={pic} id="pic" className="bordered"/>
                <img src={pic} id="pic" className="bordered"/>
                <img src={pic} id="pic" className="bordered"/>
                <img src={pic} id="pic" className="bordered"/>
            </div>
        );
}