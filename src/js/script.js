/* Elements -- navigation */

const navigation = document.querySelector('.navigation');
const navigationList = document.querySelector('.navigation__list');

/* Elements -- header*/

const header = document.querySelector('.header');
const buttonLearnMore = document.querySelector('.btn--learn-more');

/* Elements -- sections */

const sections = document.querySelectorAll('.section');
const sectionOne = document.querySelector('#section-1');

/* Elements -- about */

const aboutSection = document.querySelector('.about');
const descriptions = document.querySelectorAll('.about__info p');

/* Elements -- features*/

const tabs = document.querySelectorAll('.btn--tab');
const tabsContainer = document.querySelector('.features__tab-container');
const tabsContent = document.querySelectorAll('.features__content');

/* Elements -- gallery*/

const slides = document.querySelectorAll('.slider__slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.slider__dots');

/* Elements -- newsletter */

const subscribeBtn = document.querySelector('.btn--subscribe');
const closeModalBtn = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

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

/* Sticky navigation -- header obsever*/

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationHeight}px`,
});

headerObserver.observe(header);

/* Sticky navigation -- map section obsever*/

const mapSection = document.querySelector('#section-4');

const mapObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 1,
  rootMargin: `${navigationHeight}px`,
});

mapObserver.observe(mapSection);

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

/* Slider */

const slider = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;

  const dotsCreator = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="slider__dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.slider__dots__dot')
      .forEach(el => el.classList.remove('slider__dots__dot--active'));

    document
      .querySelector(`.slider__dots__dot[data-slide="${slide}"]`)
      .classList.add('slider__dots__dot--active');
  };

  const changeSlide = function (slide) {
    slides.forEach(
      (el, index) =>
        (el.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    activateDot(currentSlide);
  };

  const init = function () {
    changeSlide(0);
    dotsCreator();
    activateDot(0);
  };

  init();

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('slider__dots__dot')) {
      const { slide } = e.target.dataset;
      changeSlide(slide);
      activateDot(slide);
    }
  });

  btnRight.addEventListener('click', function () {
    nextSlide();
    changeSlide(currentSlide);
  });

  btnLeft.addEventListener('click', function () {
    previousSlide();
    changeSlide(currentSlide);
  });
};

slider();

/* Subscription */

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

subscribeBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* Drop a pin section */

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 6);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapEvent) {
        console.log(mapEvent);

        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
            })
          )
          .setPopupContent('Hi there!')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
