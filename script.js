const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', (event) => {
  navLinks.classList.toggle('active');
  event.stopPropagation();
});

document.addEventListener('click', (event) => {
  const isMenuOpen = navLinks.classList.contains('active');
  const isClickOutside = !navLinks.contains(event.target);

  if (isMenuOpen && isClickOutside) {
    navLinks.classList.remove('active');
  }
});

navLinks.addEventListener('click', () => {
  navLinks.classList.remove('active');
});