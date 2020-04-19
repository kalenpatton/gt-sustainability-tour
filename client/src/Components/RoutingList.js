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
                <h4><i className="far fa-hand-point-up fa-lg"></i> drag to reorder </h4>
                <Reorder
                    reorderId='routes'
                    onReorder={this.onReorder.bind(this)}
                    autoScroll={true}
                    draggedClassName="onDrag"

                >{
                    this.state.stops.map((stop,i) => (

                      <li key={stop.name} className="stop">

                        {stop.name}
                        <button
                            className='close'
                            onClick={(e)=>this.removeStop(e, i, stop)}>
                            &times;
                        </button>
                        {/*<a className="lightBtn" onClick={(e)=>this.removeStop(e, i,stop)}>remove</a>*/}

                      </li>
                    ))}
                </Reorder>
            </div>
        );
    }

}


export default RoutingList;