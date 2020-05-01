import React from 'react';
import LocationSelect from './LocationSelect';
import ImageEdit from './ImageEdit';
import APIHandler from './APIHandler';
import Select from 'react-select';

class PopupWindow extends React.Component{
    // Required props:
    // onSaveSite
    // site

    constructor(props) {

        super(props);
        this.isNewStop = this.props.site ? false : true;
        this.audioRef = React.createRef();
        this.state = {
            id: -1,
            name: '',
            position: [33.775620, -84.396286],
            description: '',
            transcript: '',
            filters: '',
            allFilters: [],
            selectedFilters: []
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

        // Format imageList
        let imageList = this.state.imageList.slice();
        let newImgs = [];
        for (var i = 0; i < imageList.length; i++) {
            if (!Number.isInteger(imageList[i])) {
                newImgs.push(imageList[i]);
                imageList[i] = -1;
            }
        }

        // format filters
        let selectedFilters = '';
        this.state.selectedFilters.forEach(filter => {
            selectedFilters += filter.label + ',';
        })
        if (selectedFilters.length > 0) {
            selectedFilters = selectedFilters.substring(0, selectedFilters.length - 1);
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

            filters : selectedFilters
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

    updateOnfilterListLoad = (f) => {
        console.log("filters loaded");
        console.log(f);
        console.log(this.props.site.filters);
        this.setState({
            allFilters : f,
            selectedFilters : this.matchFilters(f, this.props.site.filters)
        });
    };

    // matches the current site's filters with all the filters to get the indices for the selector
    matchFilters = (allFilters, currFilters) => {
        console.log("matching");
        console.log(currFilters);
        console.log(allFilters);
        let matchingFilters = [];

        allFilters.forEach(filter => {

            currFilters.forEach(currFilter => {
                if (currFilter === filter.label) {
                    matchingFilters.push(filter)
                }
            })
        });

        console.log("matched filters");
        console.log(matchingFilters);

        return matchingFilters;
    }

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

    handleFilterChange = (selected) => {
        console.log(selected);
        this.setState({
            selectedFilters: selected
        })
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

                                {'Filters: '}
                                <div className='form-in'>
                                    <Select
                                    value={this.state.selectedFilters}
                                    options={this.state.allFilters}
                                    isMulti
                                    onChange={this.handleFilterChange}
                                    />
                                </div>
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
                                        className='form-trans-in'
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