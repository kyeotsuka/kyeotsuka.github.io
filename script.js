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

// Close menu when a link is clicked inside the full-screen nav
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


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

// --- Active Nav Link on Scroll Logic ---
const sections = document.querySelectorAll('section');
const navLinksDesktop = document.querySelectorAll('nav:not(#nav-links) a'); // Select only desktop nav links

const observerOptions = {
    root: document.querySelector('main'), // We are observing scrolling within the main container
    rootMargin: '0px',
    threshold: 0.6 // Section is considered "active" when 60% is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinksDesktop.forEach(link => {
                link.classList.remove('active-link');
                // Get the href attribute and remove the '#' to match the section id
                if (link.getAttribute('href').substring(1) === activeId) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
