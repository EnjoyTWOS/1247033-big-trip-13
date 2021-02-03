import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: ``,
    name: ``,
    pictures: [
      {
        src: ``,
        description: ``
      }
    ]
  },
  id: 0,
  favorite: false,
  offers: [],
  type: `bus`
};

const createEditFormTemplate = (data) => {

  const {basePrice, dateFrom, dateTo, type, destination, offers} = data;
  const rollupButtonNewClass = `event__rollup-btn--up`;

  const startTime = dayjs(dateFrom).format(`DD`) + `/` + dayjs(dateFrom).format(`MM`) + `/` + dayjs(dateFrom).format(`YY`) + ` ` + dayjs(dateFrom).format(`HH`) + `:` + dayjs(dateFrom).format(`mm`);
  const endTime = dayjs(dateTo).format(`DD`) + `/` + dayjs(dateTo).format(`MM`) + `/` + dayjs(dateTo).format(`YY`) + ` ` + dayjs(dateTo).format(`HH`) + `:` + dayjs(dateTo).format(`mm`);
  const getPhotosSrc = () => destination.pictures[getRandomInteger(0, 19)].src;

  const changeOffers = (offer) => {
    let actualOffers = [];
    for (let i = 0; i < offer.offers.length; i++) {
      actualOffers.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${getRandomInteger(0, 1) > 0 ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.offers[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.offers[i].price}</span>
      </label>
    </div>`);
    }

    if (offer.type === `taxi`) {
      return actualOffers.join(``);
    }

    return actualOffers.join(``);
  };


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn ${rollupButtonNewClass}" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${changeOffers(offers)}
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
            <div class="event__photos-tape">
              <img class="event__photo" src="${getPhotosSrc()}" alt="${destination.pictures[getRandomInteger(0, 19)].description}">
              <img class="event__photo" src="${getPhotosSrc()}" alt="${destination.pictures[getRandomInteger(0, 19)].description}">
              <img class="event__photo" src="${getPhotosSrc()}" alt="${destination.pictures[getRandomInteger(0, 19)].description}">
              <img class="event__photo" src="${getPhotosSrc()}" alt="${destination.pictures[getRandomInteger(0, 19)].description}">
              <img class="event__photo" src="${getPhotosSrc()}" alt="${destination.pictures[getRandomInteger(0, 19)].description}">
            </div>
          </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._datepicker = null;

    this._offersTypeHandler = this._offersTypeHandler.bind(this);
    this._photoChangeHandler = this._photoChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point)
    );
  }


  getTemplate() {
    return createEditFormTemplate(this._data);
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`change`, this._photoChangeHandler);

    this.getElement()
    .querySelector(`.event__type-group`)
    .addEventListener(`change`, this._offersTypeHandler);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.dateFrom) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/Y H:i`,
            defaultDate: this._data.dateFrom,
            onChange: this._dateChangeHandler
          }
      );
    }

    if (this._data.dateTo) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/Y H:i`,
            defaultDate: this._data.dateTo,
            onChange: this._endDateChangeHandler
          }
      );
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler(this._callback.formClick);
    this._setDatepicker();
  }

  _photoChangeHandler(evt) {
    evt.preventDefault();
    const photos = this.getElement().querySelectorAll(`.event__photo`);
    for (let photo of photos) {
      photo.src = this._data.destination.pictures[getRandomInteger(0, 19)].src;
      photo.alt = this._data.destination.pictures[getRandomInteger(0, 19)].description;
    }
  }

  _dateChangeHandler([userDate]) {
    this.updateData({
      dateFrom: dayjs(userDate).hour(23).minute(59).second(59).toDate()
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dateTo: dayjs(userDate).hour(23).minute(59).second(59).toDate()
    });
  }

  _offersTypeHandler(evt) {
    evt.preventDefault();

    this._data.type = evt.target.value;
    this._data.offers.type = evt.target.value;
    this.updateData({
      type: this._data.type,
      offers: this._data.offers
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormClickHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().querySelector(`.event__rollup-btn--up`).addEventListener(`click`, this._formClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point,
        {
          type: point.type,
          offers: point.offers,
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    return data;
  }
}
