import dayjs from "dayjs";
import {createElement} from "../utils.js";

const createTripEventTemplate = (point) => {

  const {basePrice, dateFrom, dateTo, type, favorite, destination, offers} = point;

  const favoriteClassName = favorite === true ? `active` : `disabled`;

  const eventDate = dayjs(dateFrom).format(`D MMM`);
  const startTime = dayjs(dateFrom).format(`HH`) + `:` + dayjs(dateFrom).format(`mm`);
  const endTitme = dayjs(dateTo).format(`HH`) + `:` + dayjs(dateTo).format(`mm`);
  const diffMins = Math.round((((dateTo - dateFrom) % 86400000) % 3600000) / 60000);

  const generateOffersTemplate = (offer) => {
    let actualOffers = [];
    for (let i = 0; i < offer.offers.length; i++) {
      actualOffers.push(`<li class="event__offer">
        <span class="event__offer-title">${offer.offers[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.offers[i].price}</span>
        </li>`);
    }

    return actualOffers.join(``);
  };

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${eventDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${endTitme}</time>
                  </p>
                  <p class="event__duration">${diffMins}M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                   ${generateOffersTemplate(offers)}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};


export default class Point {
  constructor(point) {
    this._point = point;

    this._element = null;
  }

  getTemplate() {
    return createTripEventTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
