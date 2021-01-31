import TownsAndDatesView from "./view/towns-and-dates.js";
import PriceView from "./view/price.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import SortingView from "./view/sorting.js";
import PointCreationView from "./view/creation-form.js";
import PointEditView from "./view/edit-form.js";
import PointView from "./view/trip-event.js";
import EmptyListView from "./view/list-empty.js";
import {generatePoint} from "./mock/destination.js";
import {render, RenderPosition} from "./utils.js";

const TRIPS_QUANTITY = 0;

const points = new Array(TRIPS_QUANTITY).fill().map(generatePoint);

const mainHeader = document.querySelector(`.trip-main`);
const tripControls = mainHeader.querySelector(`.trip-controls`);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector(`.event__rollup-btn--up`).addEventListener(`click`, () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripControls, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(mainHeader, new TownsAndDatesView().getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = mainHeader.querySelector(`.trip-info`);
render(tripInfo, new PriceView().getElement(), RenderPosition.BEFOREEND);

const mainEvents = document.querySelector(`.trip-events`);

render(mainEvents, new SortingView().getElement(), RenderPosition.BEFOREEND);

if (TRIPS_QUANTITY === 0) {
  render(mainEvents, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(mainEvents, new PointCreationView(points[1]).getElement(), RenderPosition.BEFOREEND);
}

const eventsList = mainEvents.querySelector(`.trip-events__list`);

for (let i = 1; i < TRIPS_QUANTITY; i++) {
  renderPoint(eventsList, points[i]);
}
