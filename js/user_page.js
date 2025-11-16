// Chuyển đổi giới tính render lên table
function convertGender(gender) {
    switch (gender) {
        case 'male': return 'Nam';
        case 'female': return 'Nữ';
        case 'orther': return 'Khác';
        default: return 'Không rõ giới tính';
    }
}

// Chuyển đổi chức vụ render lên table
function convertRole(role) {
    switch (role) {
        case 'ADMIN': return 'Admin';
        case 'USER': return 'Tuyển dụng';
        case 'TRIAL': return 'Người dùng';
    }
}

let itemsPerPage = 10;

// Tạo nút phân trang (gọi lại API)
function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    btn.classList.add('page-btn');
    if (i === currentPage) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
      if (i !== currentPage) {
        loadDataTable(i); // Gọi lại API với page mới
      }
    });
    pagination.appendChild(btn);
  }
}

// Get API User in Table
function loadDataTable(page = 0) {
    currentPage = page;

    getAllUserAPI(page, itemsPerPage).then((res) => {
        //console.log(res);
        const users = res.data.data;

        const totalPages = res.data.totalPages;

        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        users.forEach((i) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${i.id}</td>
            <td>${i.email}</td>
            <td>${i.name}</td>
            <td>${formDate(i.dob)}</td>
            <td>${convertGender(i.gender)}</td>
            <td>${convertRole(i.role)}</td>
            <td>
                <button class='btn_edit' data-id='${i.id}'>Sửa</button>
                <button class='btn_delete' data-id='${i.id}'>Xoá</button>
            </td>
            `;
            tbody.appendChild(row);
        });
        renderPagination(totalPages);
    }).catch((err) => {
        console.error('Lỗi khi lấy danh sách user:', err);
    })
}

// Hàm định dạng ngày sinh (tùy chọn)
function formDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN')
}

// Hàm xử lý API Add User
function addUser() {
    // Lấy Form để POST API
    $('#form_addUser').on('submit', function (e) {
        e.preventDefault();
        const name = $('#inp_name').val();
        const email = $('#inp_email').val();
        const pw = $('#inp_pw').val();
        const dob = $('#inp_date').val();
        const gender = $('#sl_gender').val();
        const role = $('#sl_role').val();

        // Xử lý API
        addUserAPI(name, email, pw, dob, gender, role).then((res) => {
            //console.log(res);
            showSuccessAlert("Thêm user thành công!", 'success');

            setTimeout(() => {
                closeModal();
                location.reload();
            }, 2000)
        }).catch((err) => {
            if (err.response.request.status) {
                showSuccessAlert("Không được để trống!", 'error');
            }
            showSuccessAlert("Thêm user thất bại!", 'error');
            //console.log(err);
        })
    })
}

// Khai báo biến toàn cục để nhận diện User nào cần edit
let id = null;

function editUser() {
    //xử lý nút Sửa User (hiển thị thông tin user lên Modal)
    $(document).on('click', '.btn_edit', function () {
        id = $(this).data('id'); // this trỏ đúng
        showModal();
        getOneUserAPI(id).then((res) => {
            //console.log(res);
            const user = res.data;

            // Chuyển tên (Role) thành ID value tương ứng
            const roleMap = {
                TRIAL: "68eb36e92ed43f8a874cce94",
                USER: "68eb37182ed43f8a874cce96",
                ADMIN: "68eb37212ed43f8a874cce98"
            };
            const roleId = roleMap[user.role] || '';
            //console.log("user.role:", user.role); // phải có field id
            //console.log("roleId:", user.role?.id); // phải là string khớp với <option value="...">

            $('#inp_email').val(user.email);
            $('#inp_name').val(user.name);
            $('#inp_date').val(user.dob);
            $('#sl_gender').val(user.gender);
            $('#sl_role').val(roleId);

            $('#pw_group').hide(); // ản ô label và input password
            $('.btn_addUser').hide();
            $('.btn_updateUser').show();
            $('#inp_email').prop('disabled', true);
            $('.t_updateUser').show();
            $('.t_addUser').hide();

        }).catch((err) => {
            console.log(err);
        })
    });

    //Call API sửa User
    $('.btn_updateUser').on('click', function (e) {
        e.preventDefault();

        const name = $('#inp_name').val();
        const dob = $('#inp_date').val();
        const gender = $('#sl_gender').val();
        const roleId = $('#sl_role').val();

        editUserAPI(name, dob, gender, roleId).then((res) => {
            //console.log(res);
            showSuccessAlert('Cập nhật thành công!', 'success');
            setTimeout(() => {
                location.reload();
            }, 2000)
        }).catch((err) => {
            //console.log(err.response.status);
            showSuccessAlert("Sửa thất bại!", 'error');
            if(err.response.status === 401) {
                showSuccessAlert("Phiên bản đăng nhập đã hết hạn, vui lòng đăng nhập lại!", 'error');
                deleteCookie('authToken');
                setTimeout(() => {
                    location.href = './../index.html';
                }, 2000)
            }
        })
    })
}

// Xử lý nút xoá
function deleteUser() {
    $(document).on('click', '.btn_delete', function (e) {
        id = $(this).data('id');
        // alert(id);

        // Mở modal xác nhận xác user
        openModalDelete();

        $(document).on('click', '.btn_deleteUser', ((e) => {
            deleteUserAPI().then((res) => {
                // console.log(res);
                showSuccessAlert('Xoá User thành công!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }).catch((err) => {
                //console.log(err);
                showSuccessAlert('Xoá User thất bại!', 'error');
            })
        }))
    })
}


$(document).ready(function () {
    // Xử lý Modal
    bindUserPageEvents();
    // Gọi API Get All List User
    loadDataTable();
    //POST API thêm User
    addUser();
    // PUT API sửa User
    editUser();
    //DELETE API xoá User
    deleteUser();
});