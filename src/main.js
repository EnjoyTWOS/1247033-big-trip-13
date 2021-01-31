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
import {render, RenderPosition, replace, remove} from "./utils/render.js";

const TRIPS_QUANTITY = 20;

const points = new Array(TRIPS_QUANTITY).fill().map(generatePoint);

const mainHeader = document.querySelector(`.trip-main`);
const tripControls = mainHeader.querySelector(`.trip-controls`);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replaceCardToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

render(tripControls, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripControls, new FiltersView(), RenderPosition.BEFOREEND);
render(mainHeader, new TownsAndDatesView(), RenderPosition.AFTERBEGIN);

const tripInfo = mainHeader.querySelector(`.trip-info`);
render(tripInfo, new PriceView(), RenderPosition.BEFOREEND);

const mainEvents = document.querySelector(`.trip-events`);

render(mainEvents, new SortingView(), RenderPosition.BEFOREEND);

const emptyListViewComponent = new EmptyListView();

if (TRIPS_QUANTITY === 0) {
  render(mainEvents, emptyListViewComponent, RenderPosition.BEFOREEND);
} else {
  render(mainEvents, new PointCreationView(points[1]), RenderPosition.BEFOREEND);
  remove(emptyListViewComponent);
}

const eventsList = mainEvents.querySelector(`.trip-events__list`);

for (let i = 1; i < TRIPS_QUANTITY; i++) {
  renderPoint(eventsList, points[i]);
}
