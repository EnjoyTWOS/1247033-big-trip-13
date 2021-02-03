import TownsAndDatesView from "./view/towns-and-dates.js";
import PriceView from "./view/price.js";
import SiteMenuView from "./view/site-menu.js";
import FiltersView from "./view/filters.js";
import {generatePoint} from "./mock/destination.js";
import TripEventsPresenter from "./presenter/trip-events.js";
import {render, RenderPosition} from "./utils/render.js";

const TRIPS_QUANTITY = 20;

const points = new Array(TRIPS_QUANTITY).fill().map(generatePoint);

const mainHeader = document.querySelector(`.trip-main`);
const tripControls = mainHeader.querySelector(`.trip-controls`);

const tripEventsPresenter = new TripEventsPresenter(mainHeader, points);

render(tripControls, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripControls, new FiltersView(), RenderPosition.BEFOREEND);
render(mainHeader, new TownsAndDatesView(), RenderPosition.AFTERBEGIN);

const tripInfo = mainHeader.querySelector(`.trip-info`);
render(tripInfo, new PriceView(), RenderPosition.BEFOREEND);
tripEventsPresenter.init(points);

