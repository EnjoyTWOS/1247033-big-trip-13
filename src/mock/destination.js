import dayjs from "dayjs";
import {getRandomInteger, shuffleArray} from "../utils/common.js";

const generateType = () => {
  const pointTypes = [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
    `check-in`,
    `sightseeing`,
    `restaurant`
  ];

  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
};

const generateCityName = () => {
  const cityNames = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`
  ];

  const randomIndex = getRandomInteger(0, cityNames.length - 1);

  return cityNames[randomIndex];
};

const generateOffers = () => {
  const offers = [
    {
      title: `Switch to commfort class`,
      price: 100
    }, {
      title: `Add luggage`,
      price: 30
    }, {
      title: `Add meal`,
      price: 15
    }, {
      title: `Choose seats`,
      price: 5
    }, {
      title: `Travel by train`,
      price: 40
    }
  ];

  let chosenOffers = [];

  const offersQuantity = getRandomInteger(0, offers.length);

  if (offersQuantity > 0) {
    for (let i = 0; i < offersQuantity; i++) {
      chosenOffers.push(offers[i]);
    }
  }
  return shuffleArray(chosenOffers);
};

const generateDescription = () => {
  const DESCRIPTIONS_MAX_QUANTITY = 5;
  let descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  let chosenDescriptions = [];

  shuffleArray(descriptions);

  const descriptionsQuantity = getRandomInteger(1, DESCRIPTIONS_MAX_QUANTITY);

  for (let i = 0; i < descriptionsQuantity; i++) {

    chosenDescriptions.push(descriptions[i]);
  }
  return chosenDescriptions.join(` `);
};

const generateDestination = () => {
  return {
    description: generateDescription(),
    name: generateCityName(),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${Math.random()}`,
        description: generateDescription()
      }
    ]
  };
};

const generateOffer = () => {
  return {
    type: generateType(),
    offers: generateOffers()
  };
};

const generatePrice = () => {
  const MIN_PRICE = 10;
  const MAX_PRICE = 120;

  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);

  return price;
};
const generateID = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateStartDate = () => {
  const MAX_DAYS_GAP = 4;
  const MAX_MINUTES_GAP = 59;
  const MAX_HOURS_GAP = 3;

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const hoursGap = getRandomInteger(-MAX_HOURS_GAP, MAX_HOURS_GAP);
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP);

  return dayjs().add(daysGap, `day`).add(hoursGap, `hour`).add(minutesGap, `minute`).toDate();
};

const generateEndDate = (startDate) => {
  const MAX_TIME_DIFFERENCE = 40;
  const timeDifference = getRandomInteger(0, MAX_TIME_DIFFERENCE);

  return dayjs(startDate).add(timeDifference, `minute`).toDate();
};

export const generatePoint = () => {
  return {
    basePrice: generatePrice(),
    dateFrom: generateStartDate(),
    dateTo: generateEndDate(generateStartDate()),
    destination: generateDestination(),
    id: generateID(),
    favorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(),
    type: generateType()
  };
};
