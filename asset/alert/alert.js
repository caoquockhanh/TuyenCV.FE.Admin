function showSuccessAlert(message, type = 'success') {
    var alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;

    // if (alertBox) {
    //     alertBox.textContent = message;
    //     alertBox.style.display = 'block';
    //     setTimeout(() => {
    //         alertBox.style.display = 'none';
    //     }, 2000)
    // }

    //Xoá class cũ
    alertBox.classList.remove('alert-success', 'alert-error');

    //Thêm class mới cho alert box
    if(type === 'success') {
        alertBox.classList.add('alert-success');
    } else if (type === 'error') {
        alertBox.classList.add('alert-error');
    }

    // Hiển thị alert box
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 2000);
}