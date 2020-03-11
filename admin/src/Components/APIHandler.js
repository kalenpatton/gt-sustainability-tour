function getUsers() {
    return fetch('/users', {
        accept: "application/json"
    })
        .then(checkStatus)
        .then(response => response.json())
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
function convertUser(response) {
    // let user_map = response.map(({username, password}) => username, password);
    // return user_map;
}
const Client = { getUsers };
export default Client;