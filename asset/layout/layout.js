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

// Tải mặc định trang dashboard khi mở
window.onload = () => {
  const defaultTab = document.querySelector('#sidebar ul li');
  loadPage('../../pages/dashboardPage.html', defaultTab);
};

