import { select } from '../config.js';

export const slider = function () {
  let currentSlide = 0;
  const maxSlide = select.slides.length;

  const dotsCreator = function () {
    select.slides.forEach((_, i) => {
      select.dotsContainer.insertAdjacentHTML(
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
    select.slides.forEach(
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

  select.dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('slider__dots__dot')) {
      const { slide } = e.target.dataset;
      changeSlide(slide);
      activateDot(slide);
    }
  });

  select.btnRight.addEventListener('click', function () {
    nextSlide();
    changeSlide(currentSlide);
  });

  select.btnLeft.addEventListener('click', function () {
    previousSlide();
    changeSlide(currentSlide);
  });
};
