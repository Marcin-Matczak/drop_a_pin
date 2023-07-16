import { select, classNames } from '../config.js';
// Subscription

export const subscription = function () {
  const openModal = function (e) {
    e.preventDefault();
    select.modal.classList.remove(classNames.hidden);
    select.overlay.classList.remove(classNames.hidden);
  };

  const closeModal = function () {
    select.modal.classList.add(classNames.hidden);
    select.overlay.classList.add(classNames.hidden);
  };

  select.subscribeBtn.addEventListener('click', openModal);
  select.closeModalBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'Escape' &&
      !select.modal.classList.contains(classNames.hidden)
    ) {
      closeModal();
    }
  });
};
