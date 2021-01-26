import {createTownsAndDatesTemplate} from "./view/towns-and-dates.js";
import {createPriceTemplate} from "./view/price.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createCreationFormTemplate} from "./view/creation-form.js";
import {createEditFormTemplate} from "./view/edit-form.js";
import {createTripEventTemplate} from "./view/trip-event.js";

const TRIPS_QUANTITY = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainHeader = document.querySelector(`.trip-main`);
const tripControls = mainHeader.querySelector(`.trip-controls`);

render(tripControls, createSiteMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);
render(mainHeader, createTownsAndDatesTemplate(), `afterbegin`);

const tripInfo = mainHeader.querySelector(`.trip-info`);

render(tripInfo, createPriceTemplate(), `beforeend`);

const mainEvents = document.querySelector(`.trip-events`);

render(mainEvents, createSortingTemplate(), `beforeend`);
render(mainEvents, createCreationFormTemplate(), `beforeend`);

const eventsList = mainEvents.querySelector(`.trip-events__list`);

render(eventsList, createEditFormTemplate(), `afterbegin`);

for (let i = 0; i < TRIPS_QUANTITY; i++) {
  render(eventsList, createTripEventTemplate(), `beforeend`);
}
