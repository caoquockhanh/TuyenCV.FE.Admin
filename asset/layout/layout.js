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
  getUserInfoAPI().then(res => {
    const userName = res.data.name;
    document.querySelector('.name').textContent = userName;
  }).catch(err => {
    console.error('Lỗi khi lấy thông tin người dùng:', err);
  });
}


// Gọi hàm hiển thị tên người dùng khi tải trang
window.onload = () => {
  displayUserName();
  const defaultTab = document.querySelector('#sidebar ul li');
  loadPage('../../pages/dashboardPage.html', defaultTab);
};
