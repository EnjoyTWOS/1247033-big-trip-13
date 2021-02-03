import AbstractView from "../view/abstract.js";
import {getRandomInteger} from "../utils/common.js";

const createOffersTemplate = (data) => {
  const {offers} = data;
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
    return actualOffers.join(``);
  };
  return changeOffers(offers);
};

export default class Offers extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }
  getTemplate() {
    return createOffersTemplate(this._point);
  }
}
