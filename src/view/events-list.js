import AbstractView from "../view/abstract.js";

const createTripEvenstListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEvenstListTemplate();
  }
}
