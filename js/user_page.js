// Xử lý sự kiện cho Modal
function bindUserPageEvents() {
    openModal();
    closeModal();

    // Gắn sự kiện click ngoài modal để đóng
    $(document).on('click', '.overlay', function (e) {
        if ($(e.target).hasClass('overlay')) {
            $('.modal_adduser').hide();
            $('.overlay').hide();
        }
    });
}

// Get API User in Table
function loadDataTable() {
    getAllUserAPI().then((res) => {
        //console.log(res.data);
        const users = res.data;
        const tbody = $('table tbody');
        tbody.innerHTML = '';

        for (let i of users) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${i.id}</td>
            <td>${i.email}</td>
            <td>${i.name}</td>
            <td>${formDate(i.dob)}</td>
            <td>${i.gender}</td>
            <td>${i.role}</td>
            <td>
                <button class='btn_edit' data-id='${i.id}'>Sửa</button>
                <button class='btn_delete' data-id='${i.id}'>Xoá</button>
            </td>
            `;
            tbody.append(row);
        }
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
            if(err.response.request.status) {
                showSuccessAlert("Không được để trống!", 'error');
            } else {
                showSuccessAlert("Thêm user thất bại!", 'error');
            }
            //console.log(err);
        })
    })
}

$(document).ready(function () {
    // Xử lý Modal
    bindUserPageEvents();
    // Gọi API Get All List User
    loadDataTable();
    //POST API thêm User
    addUser();
});