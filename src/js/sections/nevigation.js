import { select } from '../config.js';

// Smooth scrolling page navigation

export const pageNavigation = function () {
  select.buttonLearnMore.addEventListener('click', function () {
    select.sectionOne.scrollIntoView({ behavior: 'smooth' });
  });

  select.navigationList.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('navigation__link')) return;
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });

  // Menu animation

  const menuLinksHover = function (e) {
    const link = e.target;
    if (link.classList.contains('navigation__link')) {
      const siblingsLinks = link
        .closest('.navigation')
        .querySelectorAll('.navigation__link');
      const logo = link.closest('.navigation').querySelector('svg');
      siblingsLinks.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };

  select.navigation.addEventListener('mouseover', menuLinksHover.bind(0.5));
  select.navigation.addEventListener('mouseout', menuLinksHover.bind(1));

  // Sticky navigation

  const navigationHeight = select.navigation.getBoundingClientRect().height;

  const stickyNavigation = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) select.navigation.classList.add('sticky');
    else select.navigation.classList.remove('sticky');
  };

  // Sticky navigation -- header obsever

  const headerObserver = new IntersectionObserver(stickyNavigation, {
    root: null,
    threshold: 0,
    rootMargin: `-${navigationHeight}px`,
  });

  headerObserver.observe(select.header);

  // Sticky navigation -- map section obsever

  const mapSection = document.querySelector('#section-4');

  const mapObserver = new IntersectionObserver(stickyNavigation, {
    root: null,
    threshold: 1,
    rootMargin: `${navigationHeight}px`,
  });

  mapObserver.observe(mapSection);

  // Show sections

  const showSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(showSection, {
    root: null,
    threshold: 0.2,
  });

  select.sections.forEach(function (section) {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
  });
};
