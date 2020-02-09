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
        console.log(this.props)
    }
    render(){
        //console.log(this.props.key);//undefined
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


const result ={
    draggableId:'Marcus Nanotechnology Building',
    type:"TYPE",
    reason:'DROP',
    source:{
        droppableId:'col',
        index:0,
    },
    destination:{
        droppableId:'col',
        index:1,
    }
}

class RoutingList extends React.Component{

    constructor(props) {
        super(props);
        this.state={stops:this.props.stops};

        // var list=[];
        // this.props.stops.forEach((e)=>{list.push(e.name);});
        // this.state={stops:list};
        // //console.log(this.state.stops);
    }

    onDragEnd = result =>{
        const {destination, source,  draggableId}=result;
        if(!destination){
            return;
        }

        //new list for testing
        var list=[{name:"Marcus Nanotechnology Building", position:[33.77881, -84.39854]},{ name:"Mewborn Field", position:[33.77928, -84.39323] },{ name:"Engineered Biosystems Building (EBB)", position:[33.7807, -84.3980]}];
        
        this.props.mapHandler.changeOrder(list);    
        this.setState({stops:list});
        //console.log(this.state.stops);
        
    }


    render(){
        return(
            <div className="popupwindow">
                <h4>Drag to reorder the stops</h4>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Column tasks={this.state.stops}/>
                </DragDropContext>
                
            </div>
        );
    }

}


export default RoutingList;