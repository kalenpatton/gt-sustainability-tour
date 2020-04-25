import React from 'react';
import LocationSelect from './LocationSelect';
import ImageEdit from './ImageEdit';
import APIHandler from './APIHandler';

class PopupWindowFilters extends React.Component{
    // Required props:
    // onSaveSite
    // site

    constructor(props) {
    	super(props);
    	this.state = {
            filters:''
        };
        APIHandler.getFilters(this.updateOnfilterListLoad);


	};


updateOnfilterListLoad = (f) => {
        this.setState({
            filters : f
        });
    };

generatetable = (filterz) => {
    var table = "<tr>";
    for (var i = 0; i < filterz.length; i++) {
        table += "<td contenteditable=\"true\">" + filterz[i].label 
        + "</td> </tr> <tr>"
    }
};

render(){
        return(
            <div className="popupwindow">
                <table style="width:100%" id="filters"> 
                <tr> 
                    <th>
                        Filters
                    </th> 
                </tr>
                    {this.generatetable(this.state.filters)}
                </table>
            </div>
            );
        }
    }
    export default PopupWindowFilters;