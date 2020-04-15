
const initialState={
    //change to backend calls to get all filters later
    filters:[
        { label: 'Energy and Emissions', value: 1},
        { label: 'Water', value: 2},
        { label: 'Materials Management', value: 3},
        { label: 'Built Environment', value: 4},
        { label: 'Community and Culture', value: 5}],
    mediaAutoplay:true,
    textDirection:true,

}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case "SET_FILTERS":
            //console.log(action.payload);
            return{
                ...state,
                filters:action.payload
            };
        default:
            return state;
        
    }

}

export default reducer;