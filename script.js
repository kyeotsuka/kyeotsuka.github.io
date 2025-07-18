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


// --- Project Carousel Logic ---
const carouselWindow = document.querySelector('.carousel-window');
if (carouselWindow) {
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  nextButton.addEventListener('click', () => {
    // Scroll by the width of the container
    carouselWindow.scrollBy({ left: carouselWindow.clientWidth, behavior: 'smooth' });
  });

  prevButton.addEventListener('click', () => {
    // Scroll by the width of the container
    carouselWindow.scrollBy({ left: -carouselWindow.clientWidth, behavior: 'smooth' });
  });
}