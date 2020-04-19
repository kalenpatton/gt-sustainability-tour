import React, { Component } from 'react';
import '../styles/Setting.css';
import ToggleButton from 'react-toggle-button';
import APIHandler from './APIHandler'

import history from '../history';


import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import {connect} from "react-redux";

let filters = []
APIHandler.getFilters(function(filterList) {
    filters = filterList
})


class Setting extends Component {
    constructor(props){
        super(props);

        this.state={
            autoplay:this.props.autoplay,
            textDirection:this.props.textDirection,

            //filters
            selectedOption: this.props.filters,
            options:filters,

        }
    }

    handleChange = selectedOption => {
        this.props.settingHandler.filterStops(selectedOption);
        this.setState(
          { selectedOption },
          // () => console.log(`Option selected:`, this.state.selectedOption)

        );
        //console.log(selectedOption);
        this.props.setFilters(selectedOption);
      };


    changeAutoPlay=(value)=>{
        this.props.settingHandler.changeAutoplay(value);
    }

    changeTextDirection=(value)=>{
        this.props.settingHandler.changeTextDirection(value);
    }

    restart=()=>{
        if (window.confirm("Restart the tour? This will reset your tour route.")) {
            history.push('/tour');
            window.location.reload();
        }
    }


    render(){

        return(
            <div className='settingWindow'>

                <h3>Settings</h3>

                <h5>Filter Sustainability Types</h5>

                <ReactMultiSelectCheckboxes
                options={this.state.options}
                value={this.state.selectedOption}
                onChange={this.handleChange}
                />


                <hr/>

                <h5>Enable Media Autoplay</h5><ToggleButton
                value={ this.state.autoplay}
                onToggle={(value) => {
                    this.setState({
                        autoplay: !value,
                    });
                    this.changeAutoPlay(value);
                }} />

                <h5>Enable Text Directions</h5><ToggleButton
                value={ this.state.textDirection}
                onToggle={(value) => {
                    this.setState({
                        textDirection: !value,
                    });
                    this.changeTextDirection(value);
                }} />

                <hr/>



                <button onClick={this.restart}
                        id="restart"
                        className="smallBtn">Restart Tour</button>
                <button id="admin-button">Admin Login</button>
            </div>
        );
    }

}
const mapStateToProps = (state) =>{
    return{
        filters: state.filters,
    };

}

const mapDispatchToProps = dispatch =>{
    return{
        setFilters: filters => dispatch({type:"SET_FILTERS",payload:filters})
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting);