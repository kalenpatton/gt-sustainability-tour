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
        .then(callback)
}

// Verifies successful response and throws error otherwise
function checkStatus(response) {
    if (response.ok) {
        return response
    }
    const error = new Error('HTTP Error ${response.statusText}')
    error.status = response.statusText
    error.response = response
    console.log(error)
    throw error
}

// Convert json object to a format that matches what Map expects
function convertToMapObject(response) {
    let map_response = response.map(({id, name, description, transcript, latitude, longitude, filters}) => 
        ({name, description, transcript, filters, location: [latitude, longitude]}))
    return map_response
}

const Client = { getLocations }
export default Client