import React from 'react';
import Modal from 'react-responsive-modal';
import LocationSelect from './LocationSelect';

class PopupWindow extends React.Component{

    constructor(props) {
        super(props);
        this.isNewStop = this.props.site ? false : true;
        this.state = {
            name: '',
            position: [33.775620, -84.396286],
            desc: ''
        };
        if (!this.isNewStop) this.state={...this.props.site};
        this.saveSite = this.props.onSaveSite;

    }

    onSubmit = (event) => {
        event.preventDefault();
        // TODO: Add call to backend to post changes.
        console.log(this.state);
        this.saveSite({...this.state}, this.isNewStop);
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
                <h2>{this.isNewStop ? "Add Site" : "Edit Site"}</h2>

                <form onSubmit={this.onSubmit}>
                    <div className='left-text'>
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
                        <div>
                            {'Description: '}
                            <textarea
                                className='form-desc-in'
                                name='desc'
                                onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <LocationSelect
                                position = {this.state.position}
                                onChangeLocation={(newLocation) => this.setState({position: newLocation})}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}

export default PopupWindow;