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
            filters:'',
            offset: 1 //offset is the rows previous to the data. only need to edit the data.
        };
        APIHandler.getFilters(this.updateOnfilterListLoad);


	};


updateOnfilterListLoad = (f) => {
        this.setState({
            filters : f
        });
    };

createdeletebutton = (filterz) => {

    //start is where the data starts in the filters table
    for (var start = 0; start < filterz.length; 
        start++) { 
            var idofbutton = "filterbutton" + start; //gets id of button
             // document.getElementById(idofbutton).onclick =  
             //     document.getElementById("filterd").deleteRow(start + this.state.offset);
                                                    //^^^^^^^^^^^^^^^^^^^ THIS GENERATES THE ERROR
                 //adds the deleterowfunction for the button onclick. 
    }
}

addfilterrow = () => {
    
}
//Creates table of filters for the user to edit and delete.
generatetable = (filterz) => {
    var table = [];
    for (var i = 0; i < filterz.length; i++) {
        var idofbutton = "filterbutton" + (i + this.state.offset); 
        table.push(<tr> <td contenteditable="true"> {filterz[i].label}
        </td> <button id={idofbutton}> Delete </button> </tr>)
    }
    return table;
};

render(){
        return(
            <div className="popupwindow">
                <table id="filterd"> 
                <tr>
                    <th>
                        Filters
                    </th>
                </tr>
                    {this.generatetable(this.state.filters)}
                    {this.createdeletebutton(this.state.filters)}
                </table>
                <button id='addfilter' onClick={this.addfilterrow()}> 
                    Add Filter
                </button>
            </div>
            
            );
        }
    }
    export default PopupWindowFilters;