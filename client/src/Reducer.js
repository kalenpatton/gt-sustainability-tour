

const initialState={
    filters:
    [
        { label: 'Energy and Emissions', value: 1},
        { label: 'Water', value: 2},
        { label: 'Material Management', value: 3},
        { label: 'Built Environment', value: 4},
        { label: 'Community and Culture', value: 5}],
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

        initialState.filters=filterList;
        console.log(initialState.filters)
    });
}

getFilters();

// console.log(getFilters());
// var f=[
//         { label: 'Energy and Emissions', value: 1},
//         { label: 'Water', value: 2},
//         { label: 'Materials Management', value: 3},
//         { label: 'Built Environment', value: 4},
//         { label: 'Community and Culture', value: 5}];
// console.log(f);

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