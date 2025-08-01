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

// --- Dark Mode Switcher Logic ---
const darkModeToggle = document.querySelector('.dark-mode-toggle');

// Check for saved theme in localStorage and apply it
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Save the user's preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
});


// --- NEW: Dynamic Blog Post Excerpt Fetcher ---

/**
 * This function runs when the page loads. It finds all blog post cards
 * and dynamically replaces their placeholder excerpts with real content
 * fetched from the actual blog post files.
 */
document.addEventListener('DOMContentLoaded', () => {
  const blogPostCards = document.querySelectorAll('#blog .blog-post-card');

  blogPostCards.forEach(card => {
    const postUrl = card.getAttribute('href');
    const titleElement = card.querySelector('h2'); // Get the title element
    const metaElement = card.querySelector('.post-meta'); // Get the meta element
    const excerptElement = card.querySelector('.post-excerpt');

    if (!postUrl || !titleElement || !excerptElement || !metaElement) {
      return; // Skip if the card is malformed
    }

    // Fetch the content of the linked blog post
    fetch(postUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.text();
      })
      .then(html => {
        // Parse the fetched HTML to find the article content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // --- Fetch and set the title ---
        const fetchedTitle = doc.querySelector('.post-header h1');
        if (fetchedTitle) {
            titleElement.textContent = fetchedTitle.textContent;
        }

        // --- Fetch and set the meta data (date, read time) ---
        const fetchedMeta = doc.querySelector('.post-header .post-meta');
        if (fetchedMeta) {
            metaElement.innerHTML = fetchedMeta.innerHTML; // Use innerHTML to keep the <time> tag
        }

        // --- Fetch and set the excerpt ---
        const contentContainer = doc.querySelector('.post-content');
        let fullText = '';

        if (contentContainer) {
            // Iterate over all direct children of the content container
            for (const child of contentContainer.children) {
                // Explicitly skip the header element to avoid grabbing the title or meta
                if (child.tagName.toLowerCase() === 'header') {
                    continue;
                }
                // Append the text of other elements (p, h2, h3, etc.)
                fullText += child.textContent + ' ';
            }
        }

        fullText = fullText.trim(); // Clean up leading/trailing spaces

        if (fullText) {
          // Create a snippet and add an ellipsis
          const maxLength = 220; // You can adjust this length
          if (fullText.length > maxLength) {
            // Trim to length, then remove any partial words or trailing spaces/punctuation
            fullText = fullText.substring(0, maxLength).trim().replace(/[\s,.]+$/, "") + '...';
          }
          excerptElement.textContent = fullText;
        }
      })
      .catch(error => {
        console.error('Error fetching blog post excerpt:', error);
        // If fetching fails, the original placeholder text remains
      });
  });
});
