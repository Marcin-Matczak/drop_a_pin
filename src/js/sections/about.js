import { select } from '../config.js';

// Show about`s descriptions

export const aboutSectionFunc = function () {
  const evenText = select.descriptions.item(1);

  showAboutDescr = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('show-left');
    entry.target.classList.remove('show-right');
    observer.unobserve(entry.target);
  };

  const aboutObserver = new IntersectionObserver(showAboutDescr, {
    root: null,
    threshold: 0.7,
  });

  select.descriptions.forEach(function (description) {
    aboutObserver.observe(description);
    if (description === evenText) description.classList.add('show-right');
    else description.classList.add('show-left');
  });

  // Images loading optimization

  const hiqualityImages = document.querySelectorAll('img[data-src]');

  loadImage = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  };

  const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

  hiqualityImages.forEach(image => imageObserver.observe(image));
};
