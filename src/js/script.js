/* Elements */

const header = document.querySelector('.header');

const buttonLearnMore = document.querySelector('.btn--learn-more');

const sectionOne = document.querySelector('#section-1');
const navigation = document.querySelector('.navigation');
const navigationList = document.querySelector('.navigation__list');

const sections = document.querySelectorAll('.section');

const tabs = document.querySelectorAll('.btn--tab');
const tabsContainer = document.querySelector('.features__tab-container');
const tabsContent = document.querySelectorAll('.features__content');

/* Smooth scrolling page navigation */

buttonLearnMore.addEventListener('click', function () {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

navigationList.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('navigation__link')) return;
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

/* Features tabs */

tabsContainer.addEventListener('click', function (e) {
  tabs.forEach(tab => tab.classList.remove('btn--tab-active'));
  e.target.classList.add('btn--tab-active');

  const articleNumber = e.target.getAttribute('data-tab');
  const article = document.querySelector(
    `.features__content--${articleNumber}`
  );
  tabsContent.forEach(article =>
    article.classList.remove('features__content--active')
  );
  article.classList.add('features__content--active');
});

/* Menu animation */

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

navigation.addEventListener('mouseover', menuLinksHover.bind(0.5));
navigation.addEventListener('mouseout', menuLinksHover.bind(1));

/* Sticky navigation */

const navigationHeight = navigation.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add('sticky');
  else navigation.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationHeight}px`,
});

headerObserver.observe(header);

/* Show sections */

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

sections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/* Show about`s descriptions */

const aboutSection = document.querySelector('.about');
const descriptions = document.querySelectorAll('.about__info p');
const evenText = descriptions.item(1);

const showAboutItems = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('show-left');
  entry.target.classList.remove('show-right');
  observer.unobserve(entry.target);
};

const aboutObserver = new IntersectionObserver(showAboutItems, {
  root: null,
  threshold: 0.7,
});

descriptions.forEach(function (description) {
  aboutObserver.observe(description);
  if (description === evenText) description.classList.add('show-right');
  else description.classList.add('show-left');
});

/* Images loading optimization */

const hiqualityImages = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
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
