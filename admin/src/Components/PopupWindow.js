import React from 'react';
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
        this.audioRef = React.createRef();
        this.filtersnum = 1;
        this.state = {
            id: -1,
            name: '',
            position: [33.775620, -84.396286],
            description: '',
            transcript: '',
            filters:''
        };
        if (!this.isNewStop) this.state = {...this.props.site};
        // Remove later. Just for dev
        this.state.imageList = [];
        APIHandler.getImageList(this.props.site, this.updateOnImageListLoad);
        // for (let i=1; i<=5; i++) this.sta e.imageList.push(i);
        APIHandler.getFilters(this.updateOnfilterListLoad);
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
            transcript: this.state.transcript,
            imageList: imageList,
            newImgs: newImgs,
            //attempts to pull for multiple ids.

            filters : this.getFilterData()
        };
        if (this.audioRef.current.value !== '') {
            newSite.audio = this.audioRef.current.files[0]
        }
        console.log(newSite);
        this.saveSite(newSite, this.isNewStop);
    };



    // update the list of images after fetching the from backend
    updateOnImageListLoad = (imageList) => {
        this.setState({
            imageList: imageList
        });
    };
    //update the list of filters after fetching 
    // in addition, creates the dropdown tabs with multiple ids. 
    /*
    dropdownlist is necessary for creating the multiple selectboxes.
    f is the current filters list. This is so we can populate the boxes with the 
    correct selected filter. 
    */
    updateOnfilterListLoad = (f) => {
        var currentfilters = this.state.filters;
        var dropdownlist = '';
        if (currentfilters.length > 0) {
            this.filtersnum = currentfilters.length;  
        } else {
            this.filtersnum = 1;
        }

            console.log("this.filtersnum: " + this.filtersnum);
        for (var i = 0; i < this.filtersnum; i++) {

            dropdownlist += ' <div> Filters : <select id=\"filtered'
            + i + '\">'

            for (var j = 0; j < f.length; j++) {
                if (currentfilters[i] === f[j].label) {
                dropdownlist += "<option value=\"" + f[j].label 
                + "\"selected>" + f[j].label + "</option>";
                } else {
                dropdownlist += "<option value=\"" + f[j].label 
                + "\">" + f[j].label + "</option>";
                }
            }
        dropdownlist += '</select> </div>'

        
        }
        document.getElementById('filterz').insertAdjacentHTML('beforeend', dropdownlist);
        this.setState({
            filters : f
        });
    };
    
    //Get filter Data attempts to get the values of the dropdown, and adds them to the database.
    getFilterData = () => {
                    var totalfilters = "";
                for (var i = 0; i < this.filtersnum; i++) {
                     var string = "filtered" + i;
                     var adding = document.getElementById(string);
                        totalfilters += adding.options[adding.selectedIndex].value;
                        if (this.filtersnum - i > 1) {
                            totalfilters += ",";
                        }
                }
                console.log("NANI??!?!?!");
                console.log(totalfilters);
                return totalfilters;
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
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div id='filterz'> 
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

                                {'Audio: '}
                                <div>
                                    <input
                                        className="form-file-upload"
                                        type="file"
                                        ref={this.audioRef}
                                        name="audio"
                                        accept="audio/mp3"
                                        onChange={this.handleFileChange}
                                        required={this.isNew}
                                    />
                                </div>
                                <div>
                                    {'Audio Transcript: '}
                                    <textarea
                                        className='form-desc-in'
                                        name='transcript'
                                        value={this.state.transcript}
                                        onChange={this.handleInputChange}/>
                                </div>
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