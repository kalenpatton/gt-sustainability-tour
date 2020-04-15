
<<<<<<< HEAD
const initialState={
    //change to backend calls to get all filters later
    filters:[
        { label: 'Energy and Emissions', value: 1},
        { label: 'Water', value: 2},
        { label: 'Materials Management', value: 3},
=======

const initialState={
    filters:
    [
        { label: 'Energy and Emissions', value: 1},
        { label: 'Water', value: 2},
        { label: 'Material Management', value: 3},
>>>>>>> c7ac4bc92055c076d28c64bf7ba59cf06b1b0b5c
        { label: 'Built Environment', value: 4},
        { label: 'Community and Culture', value: 5}],
    mediaAutoplay:true,
    textDirection:true,
<<<<<<< HEAD

}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case "SET_FILTERS":
            //console.log(action.payload);
=======
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
>>>>>>> c7ac4bc92055c076d28c64bf7ba59cf06b1b0b5c
            return{
                ...state,
                filters:action.payload
            };
        default:
            return state;
        
    }

}

export default reducer;