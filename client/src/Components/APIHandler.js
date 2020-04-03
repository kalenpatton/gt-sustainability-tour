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
    const error = new Error('HTTP Error ${response.statusText}');
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
        ({id, name, description, transcript, filters, position: [latitude, longitude]}));
    return map_response;
}


function formatImageList(response) {
    let imageList_response = response.slice().sort((a, b) => a.index - b.index);
    imageList_response = imageList_response.map(({id, site_id, index, caption}) => ({id, caption}));
    return imageList_response;
}

const APIHandler = { getLocations, getImageList };
export default APIHandler;