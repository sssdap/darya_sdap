document.addEventListener('DOMContentLoaded', () => {
    const sliderMain = document.querySelector('.slider-main');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderItems = document.querySelectorAll('.slider-item');
    const pagination = document.querySelector('.slider-pagination');
    let currentIndex = 0;
    let autoPlayInterval;
  
    // Инициализация пагинации
    sliderItems.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
    });
  
    // Функции управления
    function goToSlide(index) {
      clearInterval(autoPlayInterval);
      sliderItems[currentIndex].classList.remove('active');
      sliderItems[index].classList.add('active');
      pagination.children[currentIndex].classList.remove('active');
      pagination.children[index].classList.add('active');
      currentIndex = index;
      startAutoPlay();
    }
  
    function nextSlide() {
      const newIndex = (currentIndex + 1) % sliderItems.length;
      goToSlide(newIndex);
    }
  
    function prevSlide() {
      const newIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
      goToSlide(newIndex);
    }
  
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 10000);
    }
  
    // Обработчики событий
    document.querySelector('.slider-nav-btn.next').addEventListener('click', nextSlide);
    document.querySelector('.slider-nav-btn.prev').addEventListener('click', prevSlide);
  
    // Обработчики свайпа
    let touchStartX = 0;
    sliderMain.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });
  
    sliderMain.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
    });
  
    // Запуск автоплея
    startAutoPlay();
  });