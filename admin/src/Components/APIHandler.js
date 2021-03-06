function getUsers(callback) {
    return fetch('/users', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(callback)
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

//gets an array of filters that are necesssary for categorizing the filters
function getFilters(callback) {
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
            return filterList
        })
        .then(callback)
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

// removes bullet points from description because they are automatically inserted at line breaks
function parseDescription(description) {

    let bullet_regex = /•/g;
    description = description.replace(bullet_regex, "");
    return description;
}

// POSTs a new site to the database
function postSite(site, callback) {
    const formData = new FormData();
    formData.append("name", site.name);
    formData.append("description", parseDescription(site.description));
    formData.append("transcript", site.transcript);
    formData.append("latitude", site.position[0]);
    formData.append("longitude", site.position[1]);
    formData.append("filters", site.filters);

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
    formData.append("description", parseDescription(site.description));
    formData.append("transcript", site.transcript);
    formData.append("latitude", site.position[0]);
    formData.append("longitude", site.position[1]);
    formData.append("filters", site.filters);


    //adds the image list
    for (var i = 0; i < site.imageList.length; i++) {
        formData.append("imageList[]", site.imageList[i]);
    }
    //adds the images and captions to specific image list.
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
    }).then(formatJsonErrResponse)
    .then(callback)
}

// POST a login request
function postPassChange(password, newPassword, callback) {
    return fetch('/users/changepass', {
        method: 'POST',
        body: JSON.stringify({ password, newPassword }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(formatJsonErrResponse)
    .then(callback)
}

// POST an add admin request
function postAddUser(email, password, type, callback) {
    return fetch('/users/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, type }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(formatJsonErrResponse)
    .then(callback)
}

// DELETE an admin
function deleteUser(email, callback) {
    return fetch('/users/', {
        method: 'DELETE',
        body: JSON.stringify({ email: email }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(formatJsonErrResponse)
    .then(callback)
}

// check if the user currently has a valid tocken
function checkToken(callback) {
    return fetch('users/checktoken', {
        method: 'GET'
    }).then(response => {
            if (response.ok){
                return response.json();
            }
            return false;
        }).then(callback)
}

function postRouteUpdate(route, callback) {
    let ids = [];
    let stop_nums = [];
    route.forEach((site, i)=>{
        ids.push(site.id);
        stop_nums.push(i+1)
    })
    return fetch('/locations/defaultroute', {
        method: 'POST',
        body: JSON.stringify({ ids, stop_nums }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(formatJsonErrResponse)
    .then(callback)
}

// Convert json object to a format that matches what Map expects
function convertToMapObject(response) {
    let map_response = response.map(({id, name, description, transcript, latitude, longitude, filters, stop_num}) =>
        ({id, name, description: description, transcript, filters: parseFilters(filters), position: [latitude, longitude], stop_num}));
    return map_response;
}

// converts filters field into a list of filters
function parseFilters(filters) {
    let filters_list = []

    if (filters != null || filters === "" || filters === "null") {
        filters_list = filters.split(',')
    } else {
        filters_list = null
    }

    return filters_list
}

function formatImageList(response) {
    let imageList_response = response.slice().sort((a, b) => a.index - b.index);
    imageList_response = imageList_response.map(({id, site_id, index, caption}) => (id));
    return imageList_response;
}
async function formatJsonErrResponse(response) {
    if (response.ok) {
        return ({ok: true})
    }
    response = await response.json()
    response.ok = false
    return response
}
function getIntro(callback) {
    fetch('/info', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(response => callback(response));
}

function postIntro(newIntro) {
    return fetch('/info', {
        method: 'PUT',
        body: JSON.stringify({ "information": newIntro }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const APIHandler = { getUsers, getFilters, getLocations, postSite, putSite, deleteSite,
    getImageList, postAudio, postLogin, checkToken, postPassChange, postAddUser,
    deleteUser, getIntro, postIntro, postRouteUpdate};

export default APIHandler;