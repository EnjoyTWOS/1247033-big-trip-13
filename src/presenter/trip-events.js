import SortingView from "../view/sorting.js";
import PointCreationView from "../view/creation-form.js";
import PointPresenter from "./point.js";
import PointView from "../view/trip-event.js";
import EmptyListView from "../view/list-empty.js";
import EventsListView from "../view/events-list.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

const TRIPS_QUANTITY = 20;

export default class TripEvents {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._mainEvents = document.querySelector(`.trip-events`);
    this._pointPresenter = {};

    this._eventsList = new EventsListView();
    this._sortComponent = new SortingView();
    this._pointComponent = new PointView();
    this._emptyListComponent = new EmptyListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points;


    this._renderBoard();
    render(this._mainEvents, this._eventsList, RenderPosition.BEFOREEND);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSorting() {
    render(this._mainEvents, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsList, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._renderedPointsCount = TRIPS_QUANTITY;
  }

  _renderPoints() {
    for (let i = 1; i < TRIPS_QUANTITY; i++) {
      this._renderPoint(this._points[i]);
    }
  }

  _renderEmptyList() {
    render(this._boardContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {

    this._renderSorting();
    if (TRIPS_QUANTITY === 0) {
      this._renderEmptyList();
    } else {
      render(this._mainEvents, new PointCreationView(this._points[1]), RenderPosition.BEFOREEND);
      this._renderPoints();
      remove(this._emptyListComponent);
    }

  }
}