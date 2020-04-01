import React, { Component } from 'react';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const filters=[
    { label: 'filter 1', value: 1},
    { label: 'filter 2', value: 2},
    { label: 'filter 3', value: 3},
    { label: 'filter 4', value: 4},
    { label: 'filter 5', value: 5},
];

export default class Filter extends Component{
    constructor(props){
        super(props);
        this.state={
            
            selectedOption: filters,
            options:filters,
        }
    }

    handleChange = selectedOption => {
        this.setState(
          { selectedOption },
        //   () => console.log(`Option selected:`, this.state.selectedOption)
       
        );
      };
   

    render(){
        
        return(
            <ReactMultiSelectCheckboxes 
            options={this.state.options} 
            value={this.state.selectedOption}
            onChange={this.handleChange}
            />
        );
    }
}