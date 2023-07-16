import { select, classNames } from '../config';

// Drop a pin

let map, mapEvent;

export const pinDropper = function () {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [latitude, longitude];

        map = L.map('map').setView(coords, 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        map.on('click', function (e) {
          mapEvent = e;
          select.form.classList.remove(classNames.hidden);
          select.inputTitle.focus();
        });
      },
      function () {
        alert('Could not get your position');
      }
    );

  select.form.addEventListener('submit', function (e) {
    e.preventDefault();

    select.inputTitle.value =
      select.inputActivity.value =
      select.inputShot.value =
      select.inputDistance.value =
        '';

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
};
