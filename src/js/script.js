/* Elements */

const buttonLearnMore = document.querySelector('.btn--learn-more');

const sectionOne = document.querySelector('#section-1');
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
