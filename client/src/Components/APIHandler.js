// Handles requests to the backend server and promise resolution

// GETs an array of locations with latitude and longitude arranged as a
// position array like this.state.sites expects// Fetches locations as list of objects with only name and location
function getLocations(callback) {
    return fetch('/locations', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(convertToMapObject)
        .then(callback);
}

// Verifies successful response and throws error otherwise
function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

// GETs an array of integers representing the id numbers of the images for the given site.
function getImageList(site, callback) {
    return fetch(`/images/${site.id}`, {
        accept: "application/json"
    }).then(checkStatus)
        .then(response => response.json())
        .then(formatImageList)
        .then(callback);
}

// Convert json object to a format that matches what Map expects
function convertToMapObject(response) {
    let map_response = response.map(({id, name, description, transcript, latitude, longitude, filters}) =>
        ({id, name, description: parseDescription(description), transcript, filters: parseFilters(filters), position: [latitude, longitude]}));
    return map_response;
}

// replaces temp characters with utf ones
function parseDescription(description) {
    // perhaps some way to insert newlines to the description?
    let bullet_dash_regex = /- /g
    description = description.replace(bullet_dash_regex, "\u2022 ")
    return description
}

// converts filters field into a list of filters
function parseFilters(filters) {
    let filters_list = []

    if (filters != null) {
        filters_list = filters.split(',')
    }

    return filters_list
}

function formatImageList(response) {
    let imageList_response = response.slice().sort((a, b) => a.index - b.index);
    imageList_response = imageList_response.map(({id, site_id, index, caption}) => ({id, caption}));
    return imageList_response;
}

function getFilters(callback){
    var filterList=[];
    fetch('/filters', {
        accept: "application/json"
    })
        .then(response => response.json())
        .then(response => {
            response.forEach((element) => {
                let curr = {
                    label:element.filter,
                    value:element.id,
                }
            
                filterList.push(curr);
            });
            console.log(filterList);
            return filterList
        })
        .then(callback)
}

const APIHandler = { getLocations, getImageList, getFilters };
export default APIHandler;