import React from 'react';
import Modal from 'react-responsive-modal';
import LocationSelect from './LocationSelect';
import ImageEdit from './ImageEdit';

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
        // Remove later. Just for dev
        this.state.imageList=[];
        for (let i=1; i<=5; i++) this.state.imageList.push(i);
        //
        this.saveSite = this.props.onSaveSite;

    }

    onSubmit = (event) => {
        event.preventDefault();
        // TODO: Add call to backend to post changes.
        let newSite = {
            name: this.state.name,
            position: this.state.position,
            desc: this.state.desc,
            imageList: this.state.imageList
        };
        console.log(newSite);
        this.saveSite(newSite, this.isNewStop);
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    render(){
        return(
            <div className="popupwindow">
                <h2>{this.isNewStop ? "Add Site" : "Edit Site"}</h2>

                <form onSubmit={this.onSubmit}>
                    <div className='column-container center-text'>
                        <div className='left-text column'>
                            <div>
                                {'Name: '}
                                <input
                                    className="form-in"
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
                                    value={this.state.desc}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div>
                                <LocationSelect
                                    position = {this.state.position}
                                    onChangeLocation={(newLocation) => this.setState({position: newLocation})}
                                />
                            </div>
                        </div>
                        <div className='left-text column'>
                            <div>
                                <div>{'Images: '}</div>
                                <ImageEdit
                                    imageList={this.state.imageList}
                                    onChange={(e, newList) => this.setState({imageList: newList})}
                                />
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}

export default PopupWindow;