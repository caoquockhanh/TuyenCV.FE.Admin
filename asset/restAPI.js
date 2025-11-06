// Set Cookie function
function saveTokenToCookie(token) {
  document.cookie = `authToken=${token}; path=/; max-age=${1 * 24 * 60 * 60}`;
}

//Get Cookie function
function getTokenFromCookie() {
  const match = document.cookie.match(/(^|;) ?authToken=([^;]*)(;|$)/);
  return match ? match[2] : null;
}

//Delete Cookie function
function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Open Modal
function openModal() {
  const openModal = $('.btn_openModal');
  const modalUser = $('.modal_adduser');

  // 
  openModal.click(() => {
    modalUser.show();
    $('.overlay').show();
  })
}

// Close Modal
function closeModal() {
  const closeModal = $('.btn_closeModal');

  //
  closeModal.click(() => {
    $('.modal_adduser').hide();
    $('.overlay').hide();

  })
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

// Call get user info API
function getUserInfoAPI() {
  const token = getTokenFromCookie();
  return axios({
    method: 'GET',
    url: url + 'api/auth/profile',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// Call get all users API