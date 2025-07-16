const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// When the hamburger is clicked...
hamburger.addEventListener('click', (event) => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('is-active');
  event.stopPropagation();
});

// When clicking outside the menu...
document.addEventListener('click', (event) => {
  const isMenuOpen = navLinks.classList.contains('active');
  const isClickOutside = !navLinks.contains(event.target) && event.target !== hamburger;

  if (isMenuOpen && isClickOutside) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('is-active');
  }
});

// When a link inside the menu is clicked...
navLinks.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('is-active');
});