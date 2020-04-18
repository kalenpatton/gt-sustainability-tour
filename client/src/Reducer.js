import APIHandler from './Components/APIHandler'

const initialState={
    filters: [],
    mediaAutoplay:true,
    textDirection:true,
}

function updateOnFilterLoad(filters) {
    initialState.filters=filters;
    console.log(initialState.filters)
}

APIHandler.getFilters(updateOnFilterLoad)

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case "SET_FILTERS":
            return{
                ...state,
                filters:action.payload
            };
        default:
            return state;
        
    }

}

export default reducer;