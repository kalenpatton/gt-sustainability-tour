import React from 'react';
import '../styles/RoutingList.css';
import { Draggable, Droppable,DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container=styled.div`
    margin: 4px;
    padding:2px;
    border:1px solid black;
    border-radius:2px;
    background-color:white;
`;
const TaskList = styled.div`
    padding:8px;
`;



class Column extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <Container>
                <Droppable droppableId={'col'}>
                    {(provided)=>( 
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {this.props.tasks.map((task,index)=> {
                             console.log(index);
                             return <Task task={task} key={index} num={index}/>
                        
                        })}

                       
                        {provided.placeholder}
                    </TaskList>
                    )}
                   
                </Droppable>
            </Container>
        );

    }
}

class Task extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            
            <Draggable draggableId={this.props.task.name} index={this.props.num}>
                {(provided)=>(

                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {this.props.task.name}
                </Container>

                )}
                
            </Draggable>
        
        
        );
    }
}

// sample result of react dnd
// const result ={
//     draggableId:'Marcus Nanotechnology Building',
//     type:"TYPE",
//     reason:'DROP',
//     source:{
//         droppableId:'col',
//         index:0,
//     },
//     destination:{
//         droppableId:'col',
//         index:1,
//     }
// }

class RoutingList extends React.Component{

    constructor(props) {
        super(props);
        this.state={stops:this.props.stops};
    }

    onDragEnd = result =>{
        const {destination, source}=result;
        if(!destination){
            return;
        }

        //console.log(result);
        var i=source.index;
        var j=destination.index;
        var newl=this.state.stops;
        var temp=newl[i];
        newl[i]=newl[j];
        newl[j]=temp;

        
        this.props.mapHandler.changeOrder(newl);    
        this.setState({stops:newl});
   
    }


    render(){
        return(
            <div className="popupwindow">
                <h4>drag to reorder the stops</h4>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Column tasks={this.state.stops}/>
                </DragDropContext>
                
            </div>
        );
    }

}


export default RoutingList;