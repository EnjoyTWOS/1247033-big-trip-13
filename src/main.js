import {createTownsAndDatesTemplate} from "./view/towns-and-dates.js";
import {createPriceTemplate} from "./view/price.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createCreationFormTemplate} from "./view/creation-form.js";
import {createEditFormTemplate} from "./view/edit-form.js";
import {createTripEventTemplate} from "./view/trip-event.js";
import {generatePoint} from "./mock/destination.js";

const TRIPS_QUANTITY = 20;

const points = new Array(TRIPS_QUANTITY).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainHeader = document.querySelector(`.trip-main`);
const tripControls = mainHeader.querySelector(`.trip-controls`);

render(tripControls, createSiteMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);
render(mainHeader, createTownsAndDatesTemplate(), `afterbegin`);

const tripInfo = mainHeader.querySelector(`.trip-info`);

render(tripInfo, createPriceTemplate(points[0]), `beforeend`);

const mainEvents = document.querySelector(`.trip-events`);

render(mainEvents, createSortingTemplate(), `beforeend`);
render(mainEvents, createCreationFormTemplate(points[1]), `beforeend`);

const eventsList = mainEvents.querySelector(`.trip-events__list`);

render(eventsList, createEditFormTemplate(points[0]), `afterbegin`);

for (let i = 2; i < TRIPS_QUANTITY; i++) {
  render(eventsList, createTripEventTemplate(points[i]), `beforeend`);
}
