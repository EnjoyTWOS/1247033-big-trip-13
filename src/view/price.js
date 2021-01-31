import AbstractView from "../view/abstract.js";

const createPriceTemplate = () => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;
};

export default class PriceTemplate extends AbstractView {
  getTemplate() {
    return createPriceTemplate();
  }
}
