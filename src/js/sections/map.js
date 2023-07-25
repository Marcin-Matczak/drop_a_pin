import { select, classNames } from '../config';

// Drop a pin -- map

class pinData {
  id = (Date.now() + '').slice(-10);
  constructor(title, date, activity, country, description, coords) {
    this.title = title;
    this.date = date;
    this.activity = activity;
    this.country = country;
    this.description = description;
    this.coords = coords;
    this._setPinCardTitle();
  }

  _setPinCardTitle() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.pinCardTitle = `${this.activity[0].toUpperCase()}${this.activity.slice(
      1
    )} on `;
    console.log(this.date);
  }
}
//${months[this.date.getMonth()]} ${this.date.getDate()}
// Drop a pin -- map

class Map {
  #map;
  #mapEvent;
  #pins = [];
  constructor() {
    this._getPosition();
    select.form.addEventListener('submit', this._newPin.bind(this));
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

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
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

  _hideForm() {
    select.inputTitle.value = select.inputDescriprion.value = '';
    select.form.style.display = 'none';
    select.form.classList.add(classNames.hidden);
    setTimeout(() => (select.form.style.display = 'grid'), 1000);
  }

  _newPin(e) {
    e.preventDefault();

    const title = select.inputTitle.value;
    const date = select.inputDate.value;
    const activity = select.inputActivity.value;
    const country = select.inputCountry.value;
    const description = select.inputDescriprion.value;
    const { lat, lng } = this.#mapEvent.latlng;

    const newPin = new pinData(title, date, activity, country, description, [
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
      .setPopupContent(`${title}`)
      .openPopup();

    this._renderPin(newPin);

    this._hideForm();
  }

  _renderPin(newPin) {
    const html = `
      <li class="place place--running" data-id="${newPin.id}">
        <h2 class="place__title">${newPin.pinCardTitle}</h2>
        <div class="place__details">
          <span class="place__icon">🏃‍♂️</span>
          <span class="place__value">${newPin.country}</span>
          <span class="place__value">${newPin.title}</span>
          <span class="place__unit">${newPin.description}</span>
        </div>
      </li>  
    `;

    select.form.insertAdjacentHTML('afterend', html);
  }
}

export default Map;
