import { select } from '../config.js';

// Features tabs

export const featuresTabs = function () {
  select.tabsContainer.addEventListener('click', function (e) {
    if (e.target === this) return;

    select.tabs.forEach(tab => tab.classList.remove('btn--tab-active'));
    e.target.classList.add('btn--tab-active');

    const articleNumber = e.target.getAttribute('data-tab');
    const article = document.querySelector(
      `.features__content--${articleNumber}`
    );
    select.tabsContent.forEach(article =>
      article.classList.remove('features__content--active')
    );
    article.classList.add('features__content--active');
  });
};
