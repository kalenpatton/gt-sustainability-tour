import React from 'react';
import '../styles/RoutingList.css';

import Reorder, {
    reorder,
  } from 'react-reorder';


class RoutingList extends React.Component{

    constructor(props) {
        super(props);
        this.state={stops:this.props.stops};
    }

    onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
        let newList = reorder(this.state.stops, previousIndex, nextIndex);
        this.props.mapHandler.changeOrder(newList);
        this.setState({
            stops: newList,
        });

    };

    removeStop = (event, i,stop) => {
        //console.log(stop)
        let newList = this.state.stops.slice();

        newList.splice(i,1);

        this.setState({
            stops: newList,
        });
        this.props.mapHandler.changeOrder(newList,stop);
    }




    render(){
        return(
            <div className="popupwindow">
                <h4>Current Tour Stops</h4>
                <h6><i className="far fa-hand-point-up fa-lg"></i> drag to reorder </h6>
                <Reorder
                    reorderId='routes'
                    onReorder={this.onReorder.bind(this)}
                    autoScroll={true}
                    draggedClassName="onDrag"

                >{
                    this.state.stops.map((stop,i) => (

                      <li key={stop.name} className="stop">

                        {stop.name}
                        <div
                            className='close'
                            onClick={(e)=>this.removeStop(e, i, stop)}>
                            &times;
                        </div>
                        {/*<a className="lightBtn" onClick={(e)=>this.removeStop(e, i,stop)}>remove</a>*/}

                      </li>
                    ))}
                </Reorder>
            </div>
        );
    }

}


export default RoutingList;