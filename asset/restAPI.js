// url chung
var url = 'http://localhost:8080/';

// Call login API
function loginAPI(email, password) {
    return axios({
        method : 'POST',
        url : url + 'api/auth/signin',
        headers: {
                "Content-Type": "application/json",
            },
        data: JSON.stringify({
            'email' : email,
            'password' : password
        })
    });
}