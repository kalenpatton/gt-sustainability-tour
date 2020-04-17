function getUsers() {
    return fetch('/users', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        //.then(convertUser)
}

// Verifies successful response and throws error otherwise
function checkStatus(response) {
    if (response.ok) {
        console.log(response);
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}
function convertUser(response) {
     //let user_map = response.map(({login}) => ({username : value}));
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

// GETs an array of integers representing the id numbers of the images for the given site.
function getImageList(site, callback) {
    return fetch(`/images/${site.id}`, {
        accept: "application/json"
    }).then(checkStatus)
        .then(response => response.json())
        .then(formatImageList)
        .then(callback);
}

// POSTs a new site to the database
function postSite(site, callback) {
    const formData = new FormData();
    formData.append("name", site.name);
    formData.append("description", site.description);
    formData.append("transcript", site.transcript);
    formData.append("latitude", site.position[0]);
    formData.append("longitude", site.position[1]);
    formData.append("filters", null);
    // formData.append("imageList", site.imageList);
    // formData.append("newImgs", site.newImgs);

    // for (var i = 0; i < site.imageList.length; i++) {
    //     formData.append("imageList[]", site.imageList[i]);
    // }
    for (var i = 0; i < site.newImgs.length; i++) {
        formData.append(`newImgs[]`, site.newImgs[i]);
        formData.append(`newCaptions[]`, site.newImgs[i].caption);
    }

    return fetch('/locations', {
        method: 'POST',
        body: formData
    }).then(checkStatus)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            if ('audio' in site) postAudio(response, site.audio, callback);
            else callback(response);
        })
}


function putSite(site, callback) {
    const formData = new FormData();
    formData.append("name", site.name);
    formData.append("description", site.description);
    formData.append("transcript", site.transcript);
    formData.append("latitude", site.position[0]);
    formData.append("longitude", site.position[1]);
    formData.append("filters", null);
    // formData.append("imageList", site.imageList);
    // formData.append("newImgs", site.newImgs);

    for (var i = 0; i < site.imageList.length; i++) {
        formData.append("imageList[]", site.imageList[i]);
    }
    for (var i = 0; i < site.newImgs.length; i++) {
        formData.append(`newImgs[]`, site.newImgs[i]);
        formData.append(`newCaptions[]`, site.newImgs[i].caption);
    }

    return fetch(`/locations/${site.id}`, {
        method: 'PUT',
        body: formData
    }).then(checkStatus)
        .then((response) => {
            if ('audio' in site) postAudio(site.id, site.audio, callback);
            else callback(response);
        })
}


// POST audio file
function postAudio(site_id, audio, callback) {
    const formData = new FormData();
    formData.append("site_id", site_id);
    formData.append("audio", audio);
    return fetch('/audio', {
        method: 'POST',
        body: formData
    }).then(checkStatus)
        .then(callback)
}

// DELETEs a site from the database.
function deleteSite(site, callback) {
    return fetch(`/locations/${site.id}`, {
        method: 'DELETE'
    }).then(checkStatus)
        .then(callback);
}

// POST a login request
function postLogin(email, password, callback) {
    return fetch('/users/authenticate', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(formatLoginResponse)
    .then(callback)
}

// check if the user currently has a valid tocken
function checkToken(callback) {
    return fetch('users/checktoken', {
        method: 'GET'
    }).then(response => response.ok)
        .then(callback)
}

// Convert json object to a format that matches what Map expects
function convertToMapObject(response) {
    let map_response = response.map(({id, name, description, transcript, latitude, longitude, filters}) =>
        ({id, name, description: parseDescription(description), transcript, filters, position: [latitude, longitude]}));
    return map_response;
}

// replaces temp characters with utf ones
function parseDescription(description) {
    // perhaps some way to insert newlines to the description?
    let bullet_dash_regex = /- /g
    description = description.replace(bullet_dash_regex, "\u2022 ")
    return description
}

function formatImageList(response) {
    let imageList_response = response.slice().sort((a, b) => a.index - b.index);
    imageList_response = imageList_response.map(({id, site_id, index, caption}) => (id));
    return imageList_response;
}
async function formatLoginResponse(response) {
    if (response.ok) {
        return ({ok: true})
    }
    response = await response.json()
    response.ok = false
    return response
}
const APIHandler = { getUsers, getLocations, postSite, putSite, deleteSite, getImageList, postAudio, postLogin, checkToken};
export default APIHandler;