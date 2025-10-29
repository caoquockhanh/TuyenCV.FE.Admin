var pwInput = document.getElementById("pass");
var togglePwBtn = document.getElementById("togglePassword");
var togglePwBtn2 = document.getElementById("togglePassword2");

// Initially hide the "hide password" button
if (pwInput.type === "password") {
    togglePwBtn2.style.display = "none";
}

togglePwBtn.addEventListener("click", function () {
    if (pwInput.type === "password") {
        pwInput.type = "text";
        togglePwBtn.style.display = "none";
        togglePwBtn2.style.display = "block";
    }
});

togglePwBtn2.addEventListener("click", function () {
    if (pwInput.type === "text") {
        pwInput.type = "password";
        togglePwBtn2.style.display = "none";
        togglePwBtn.style.display = "block";
    }
});

//Khai báo url
var url = 'http://localhost:8080/';



// Xử lý sự kiện submit form đăng nhập
$(document).ready(function () {
    


    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#pass').val();
        // Thực hiện gửi dữ liệu đăng nhập lên server qua AJAX

        $.ajax({
            url: url + 'api/auth/signin',
            type: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "email": email,
                "password": password
            }),
            success: function (e) {
                console.log(e);
                showSuccessAlert("Đăng nhập thành công!", 'success');
            },
            error: function (err) {
                console.log(err);
                showSuccessAlert("Đăng nhập thất bại!", 'error');
            }
        })
    });
});
