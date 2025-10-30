// Set Cookie function
function saveTokenToCookie(token) {
  document.cookie = `authToken=${token}; path=/; max-age=${1 * 24 * 60 * 60}`;
}

//Get Cookie function
function getTokenFromCookie() {
  const match = document.cookie.match(/(^|;) ?authToken=([^;]*)(;|$)/);
  return match ? match[2] : null;
}

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