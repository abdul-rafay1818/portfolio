/**
 * Abdul Rafay — Portfolio Interactions
 * Minimalist, Accessible & High Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileNav.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', shouldOpen);
    mobileNav.classList.toggle('is-open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    mobileNav.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => toggleMenu());

    // Close mobile nav when clicking any link
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close when clicking outside of navbar
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    }, { passive: true });
  }

  // 2. Active Navigation Highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        desktopLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        mobileLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Ensure contact section activates when reaching bottom of page
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      desktopLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#contact');
      });
      mobileLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#contact');
      });
    }
  }, { passive: true });

  // 3. Smooth Header Border Transition on Scroll
  const siteHeader = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.style.borderColor = 'var(--border-medium)';
    } else {
      siteHeader.style.borderColor = 'var(--border-subtle)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
