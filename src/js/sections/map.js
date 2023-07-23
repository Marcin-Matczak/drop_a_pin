import { select, classNames } from '../config';

// Drop a pin -- map

class pinData {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(title, activity, country, description, coords) {
    this.title = title;
    this.activity = activity;
    this.country = country;
    this.description = description;
    this.coords = coords;
  }
}

// Drop a pin -- map

class Map {
  #map;
  #mapEvent;
  #pins = [];
  constructor() {
    this._getPosition();
    select.form.addEventListener('submit', this._newWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    select.form.classList.remove(classNames.hidden);
    select.inputTitle.focus();
  }

  _newWorkout(e) {
    e.preventDefault();

    const title = select.inputTitle.value;
    const activity = select.inputActivity.value;
    const country = select.inputCountry.value;
    const description = select.inputDescriprion.value;
    const { lat, lng } = this.#mapEvent.latlng;

    const newPin = new pinData(title, activity, country, description, [
      lat,
      lng,
    ]);
    this.#pins.push(newPin);
    console.log(newPin);

    L.marker([lat, lng])
      .addTo(this.#map)
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

    select.inputTitle.value = select.inputDescriprion.value = '';
  }
}

export default Map;
