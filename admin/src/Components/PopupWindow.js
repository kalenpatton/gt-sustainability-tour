import React from 'react';
import Modal from 'react-responsive-modal';
import LocationSelect from './LocationSelect';
import ImageEdit from './ImageEdit';
import APIHandler from './APIHandler';

class PopupWindow extends React.Component{
    // Required props:
    // onSaveSite
    // site
    constructor(props) {
        super(props);
        this.isNewStop = this.props.site ? false : true;
        this.state = {
            id: -1,
            name: '',
            position: [33.775620, -84.396286],
            description: ''
        };
        if (!this.isNewStop) this.state = {...this.props.site};
        // Remove later. Just for dev
        this.state.imageList = [];
        APIHandler.getImageList(this.props.site, this.updateOnImageListLoad);
        // for (let i=1; i<=5; i++) this.state.imageList.push(i);
        // //
        this.saveSite = this.props.onSaveSite;

    }

    // Run on submission of popup
    onSubmit = (event) => {
        event.preventDefault();
        // TODO: Add call to backend to post changes.

        // Format imageList
        let imageList = this.state.imageList.slice();
        let newImgs = [];
        for (var i = 0; i < imageList.length; i++) {
            if (!Number.isInteger(imageList[i])) {
                newImgs.push(imageList[i]);
                imageList[i] = -1;
            }
        }
        let newSite = {
            id: this.state.id,
            name: this.state.name,
            position: this.state.position,
            description: this.state.description,
            imageList: imageList,
            newImgs: newImgs
        };
        console.log(newSite);
        this.saveSite(newSite, this.isNewStop);
    };

    // update the list of images after fetching the from backend
    updateOnImageListLoad = (imageList) => {
        this.setState({
            imageList: imageList
        });
    }

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
                                    name='description'
                                    value={this.state.description}
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
                                    siteId={this.state.id}
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