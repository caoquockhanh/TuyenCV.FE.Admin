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

  // modal add user
  openModal.click(() => {
    modalUser.show();
    $('.overlay').show();
    $('#form_addUser')[0].reset();
    $('#pw_group').show();
    $('.btn_addUser').show();
    $('.btn_updateUser').hide();
    $('#inp_email').prop('disabled', false);
    $('.modal_adduser').show();
  });
}

//Show Modal 
function showModal() {
  $('.modal_adduser').show();
  $('.overlay').show();
}

// Show Modal Delete
function openModalDelete() {
  $('.modal_deleuser').show();
  $('.overlay').show();
}

// Close Modal
function closeModal() {
  const closeModal = $('.btn_closeModal');

  //
  closeModal.click(() => {
    $('.modal_adduser').hide();
    $('.modal_deleuser').hide();
    $('.overlay').hide();
  })
}

// Khi mở Modal để sửa User
// function openEditUserModal(user) {
//   $('#inp_name').val(user.name);
//   $('#inp_email').val(user.email);
//   $('#inp_date').val(user.dob);
//   $('#sl_gender').val(user.gender);
//   $('#sl_role').val(user.role);

//   $('#inp_pw').hide(); // ẩn ô mật khẩu
//   $('.btn_addUser').hide(); // ẩn nút Add
//   $('.btn_updateUser').show(); // hiện nút Update
//   $('#inp_email').prop('disabled', true); // không cho sửa email

//   $('.modal_adduser').show();
// }


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

// Call API logout
function logoutAPI() {
  const token = getTokenFromCookie();
  return axios({
    method: 'DELETE',
    url: url + 'api/auth/logout',
    headers: {
      'Authorization' : `Bearer ${token}`,
    },
  })
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
function getAllUserAPI() {
  const token = getTokenFromCookie();
  return axios({
    method: 'GET',
    url: url +'api/users/getalluser',
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json',
    },
  })
}

// Call post add user API
function addUserAPI (name, email, password, dob, gender, role) {
  return axios({
    method: 'POST',
    url: url + 'api/auth/signup',
    headers: {
      'Content-Type' : 'application/json',
    },
    data: JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
      "dob": dob,
      "gender": gender,
      "roleName": role
    })
  })
}

// Call API view 1 user
function getOneUserAPI(id) {
  const token = getTokenFromCookie();
  return axios({
    method: "GET",
    url: url + `api/users/${id}`,
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json',
    },
  })
}

// Call API edit user
function editUserAPI(name, dob, gender, roleId) {
  const token = getTokenFromCookie();
  return axios({
    method: 'PUT',
    url: url + `api/users/${id}`,
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json',
    },
    data: JSON.stringify({
      'name' : name,
      'dob' : dob,
      'gender' : gender,
      'role' : {
        'id' : roleId,
      }
    })
  })
}

//Call API delete user
function deleteUserAPI() {
  const token = getTokenFromCookie();
  return axios({
    method : 'DELETE',
    url : url + `api/users/${id}`,
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json',
    },
  })
}