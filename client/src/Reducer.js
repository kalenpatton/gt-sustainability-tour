

const initialState = {
    allFilters:[],
    filters:
        // [
        //     { label: 'Energy and Emissions', value: 1},
        //     { label: 'Water', value: 2},
        //     { label: 'Material Management', value: 3},
        //     { label: 'Built Environment', value: 4},
        //     { label: 'Community and Culture', value: 5}],
        [],
    mediaAutoplay:true,
    textDirection:true,
}

function getFilters(){
    var filterList=[];
    var promise = fetch('/filters', {
        accept: "application/json"
    }).then(response => response.json()).then(response => {
        response.forEach((element) => {
            let curr = {
                label:element.filter,
                value:element.id,
            }
            
            filterList.push(curr);
        });

        initialState.filters = filterList;
        initialState.allFilters = filterList;
        console.log(initialState.filters)
    });
}

getFilters();

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