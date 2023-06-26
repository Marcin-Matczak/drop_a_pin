/* Elements */

const header = document.querySelector('.header');

const buttonLearnMore = document.querySelector('.btn--learn-more');

const sectionOne = document.querySelector('#section-1');
const navigation = document.querySelector('.navigation');
const navigationList = document.querySelector('.navigation__list');

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
