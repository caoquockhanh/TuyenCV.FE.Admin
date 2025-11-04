// Hàm tải nội dung trang vào khu vực main-content
function loadPage(page, element) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;

      // Đổi trạng thái active tab
      const items = document.querySelectorAll('#sidebar ul li');
      items.forEach(item => item.classList.remove('active'));
      if (element) {
        element.classList.add('active');
      }
    });
}

// Lấy thông tin user và hiển thị tên lên giao diện
function displayUserName() {

  // Gọi API lấy thông tin người dùng
  getUserInfoAPI().then(res => {
    const userName = res.data.name;
    const userEmail = res.data.email;
    // Tách tên từ full name
    const [firstName, ...rest] = userName.split(" ");
    const middleName = rest.length === 1 ? "" : rest.slice(0, -1).join(" ");
    const lastName = rest.at(-1);
    const parseWorker = {firstName, middleName, lastName};
    //console.log(parseWorker);
    
    // Hiển thị tên người dùng lên giao diện
    document.querySelector('.name').textContent = parseWorker.lastName;

    //Hiện thị full name trong modal info user
    $('.info_name').text(userName);
    //Hiện thị email trong modal info user
    $('.info_email').text(userEmail);
  }).catch(err => {
    console.error('Lỗi khi lấy thông tin người dùng:', err);
  });
}

// Xử lý sự nút down/up bên cạnh tên user
function toggleChevron() {
  const chevron = $('.info');
  const chevronDown = $('.fa-chevron-down');
  const chevronUp = $('.fa-chevron-up');
  let isUp = false;
  
  chevron.click(() => {
    if (!isUp) {
      chevronDown.hide();
      chevronUp.show();
    } else {
      chevronUp.hide();
      chevronDown.show();
    }
    isUp = !isUp;
  });
};

// Sự kiện click nút info user
function modalInfoUser() {
  const infoUser = $('.info');
  const infoUserModal = $('.infoUser');
  infoUser.click(function() {
    infoUserModal.toggle();
  });
}


// Gọi hàm hiển thị tên người dùng khi tải trang
window.onload = () => {
  displayUserName();
  const defaultTab = document.querySelector('#sidebar ul li');
  loadPage('../../pages/dashboardPage.html', defaultTab);
  toggleChevron()
  modalInfoUser()
  
};
