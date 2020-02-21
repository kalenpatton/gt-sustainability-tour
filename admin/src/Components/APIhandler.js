function getUsers(callback) {
    return fetch('/users', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(convertToUser)
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

export default Client;