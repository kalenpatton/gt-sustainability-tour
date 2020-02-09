import React from 'react';
import Modal from 'react-responsive-modal';

class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render(){
        return(
            <div className="popupwindow">
                <h2>{this.props.site.name}</h2>
            </div>
        );
    }
}

export default PopupWindow;