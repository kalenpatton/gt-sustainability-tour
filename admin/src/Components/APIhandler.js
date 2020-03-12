function getUsers(callback) {
    return fetch('/users', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(convertUser)
        .then(callback);
}

// Verifies successful response and throws error otherwise
function checkStatus(response) {
    if (response.ok) {
        console.log(response);
        return response;
    }
    const error = new Error('HTTP Error ${response.statusText}');
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}
function convertUser(response) {
    // let user_map = response.map(({username, password}) => name, password);
    // return user_map;
    return response;
}

// GETs an array of locations with latitude and longitude arranged as a
// position array like this.state.sites expects// Fetches locations as list of objects with only name and location
function getLocations(callback) {
    return fetch('/locations', {
        accept: "application/json"
    }).then(checkStatus)
        .then(response => response.json())
        .then(convertToMapObject)
        .then(callback);
}

// Convert json object to a format that matches what Map expects
function convertToMapObject(response) {
    let map_response = response.map(({id, name, description, transcript, latitude, longitude, filters}) =>
        ({name, description, transcript, filters, position: [latitude, longitude]}));
    return map_response;
}
const APIHandler = { getUsers, getLocations };
export default APIHandler;