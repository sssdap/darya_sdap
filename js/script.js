document.addEventListener('DOMContentLoaded', () => {
  const hamb = document.getElementById('ms-hamb');
  const hambField = document.getElementById('ms-hamb-field');
  const menu = document.getElementById('ms-menu');
  const popup = document.getElementById('ms-popup');
  const projectLink = document.querySelector('.ms-project-link');
  const submenu = document.querySelector('.ms-submenu');

  // Функция для открытия/закрытия меню
  function toggleMenu() {
      hambField.classList.toggle('active');
      menu.classList.toggle('active');
      popup.classList.toggle('active');
  }

  // Функция для открытия/закрытия подменю
  function toggleSubmenu(event) {
      event.preventDefault(); // Предотвращаем переход по ссылке
      event.stopPropagation(); // Останавливаем всплытие события
      submenu.classList.toggle('active');
  }

  // Обработчик клика по бургеру
  hamb.addEventListener('click', toggleMenu);

  // Обработчик клика по затемнению (popup)
  popup.addEventListener('click', toggleMenu);

  // Обработчик клика по ссылкам в меню (закрытие меню)
  const menuLinks = document.querySelectorAll('.ms-menu > li > a:not(.ms-project-link)');
  menuLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (menu.classList.contains('active')) {
              toggleMenu();
          }
      });
  });

  // Обработчик клика по ссылке "Project"
  projectLink.addEventListener('click', toggleSubmenu);

  // Обработчик клика вне подменю (закрытие подменю)
  document.addEventListener('click', (event) => {
      if (!event.target.closest('.ms-project-item')) {
          submenu.classList.remove('active');
      }
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', () => {
      if (window.innerWidth > 417 && menu.classList.contains('active')) {
          toggleMenu();
      }
  });
});
  

// Открытие модального окна
const albumImages = document.querySelectorAll('.album-img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

// Функция для блокировки прокрутки
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Функция для разблокировки прокрутки
function enableScroll() {
    document.body.style.overflow = 'auto';
}

albumImages.forEach((img) => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        disableScroll(); // Блокируем прокрутку при открытии модального окна
    });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    enableScroll(); // Разблокируем прокрутку при закрытии модального окна
});

// Закрытие модального окна при клике вне изображения
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        enableScroll(); // Разблокируем прокрутку при закрытии модального окна
    }
});