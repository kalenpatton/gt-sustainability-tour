// Handles requests to the backend server


// Fetches locations as list of objects with only name and location
function getLocations() {
    return fetch('locations/', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(convertToMapObject)
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

// Removes all but name and location fields from locations json
function convertToMapObject(response) {
    let map_response = []
    for (let i = 0; i < 22; i++) {
        let location_obj = response[i]
        console.log(location_obj)
        let location = {
            name: location_obj.name,
            description: location_obj.dest,
            transcript: location_obj.transcript,
            filters: location_obj.filters,
            location: [location_obj.latitude, location_obj.longitude]
        }
        map_response.push(location)
    }
    return map_response
}

const Client = { getLocations }
export default Client