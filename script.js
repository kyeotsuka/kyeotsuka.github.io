// --- Hamburger Menu Logic ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', (event) => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('is-active');
  event.stopPropagation();
});

const closeMobileMenu = () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('is-active');
};

document.addEventListener('click', (event) => {
  const isMenuOpen = navLinks.classList.contains('active');
  const isClickOutside = !navLinks.contains(event.target) && !hamburger.contains(event.target);

  if (isMenuOpen && isClickOutside) {
    closeMobileMenu();
  }
});

navLinks.addEventListener('click', closeMobileMenu);


// --- Logic to handle ALL carousels on the page ---
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
  const carouselWindow = carousel.querySelector('.carousel-window');
  const prevButton = carousel.querySelector('.carousel-button.prev');
  const nextButton = carousel.querySelector('.carousel-button.next');

  if (carouselWindow && prevButton && nextButton) {
    nextButton.addEventListener('click', () => {
      carouselWindow.scrollBy({ left: carouselWindow.clientWidth, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
      carouselWindow.scrollBy({ left: -carouselWindow.clientWidth, behavior: 'smooth' });
    });
  }
});