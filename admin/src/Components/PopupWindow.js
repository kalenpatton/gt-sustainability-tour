import React from 'react';
import Modal from 'react-responsive-modal';

class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.isNewStop = this.props.site ? false : true;
        this.state = {
            name: '',
            location: [33.775620, -84.396286]
        };
        if (!this.isNewStop) this.state={...this.props.site};

    }

    onSubmit = (event) => {
        event.preventDefault();
        // TODO: Add call to backend to post changes.
        console.log(this.state);
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div className="popupwindow">
                <h2>{this.isNewStop ? "Add Stop" : "Edit Stop"}</h2>

                <form onSubmit={this.onSubmit}>
                    <div>
                        {'Name: '}
                        <input
                            className="form-text-in"
                            type="text"
                            name="name"
                            placeholder="Enter site name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}

export default PopupWindow;