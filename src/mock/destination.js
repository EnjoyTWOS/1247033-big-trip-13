const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

  let chosenOffer = [];

  const offersQuantity = getRandomInteger(0, offers.length);

  if (offersQuantity > 0) {
    for (let i = 0; i < offersQuantity; i++) {
      chosenOffer.push(offers[i]);
    }
  }
  return shuffleArray(chosenOffer);
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

const generateDestenation = () => {
  return {
    description: generateDescription(),
    cityName: generateCityName(),
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
  const MAX_PRICE = 10000;

  const price = getRandomInteger(MIN_PRICE, MAX_PRICE);

  return price;
};

const generateID = () => {
  const MIN_ID = 0;
  const MAX_ID = 20;

  const id = getRandomInteger(MIN_ID, MAX_ID);

  return id;
};

const generateDate = () => {
  const MIN_YEAR = 2021;
  const MAX_YEAR = 2025;
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const MAX_DAY = 28;
  const MAX_HOUR = 23;
  const MAX_MINUTES = 59;

  const randomYear = getRandomInteger(MIN_YEAR, MAX_YEAR);
  const randomMonth = getRandomInteger(MIN_MONTH, MAX_MONTH);
  const randomDay = getRandomInteger(0, MAX_DAY);
  const randomHour = getRandomInteger(0, MAX_HOUR);
  const randomMinutes = getRandomInteger(0, MAX_MINUTES);

  return new Date(randomYear, randomMonth, randomDay, randomHour, randomMinutes);
};

const generatePoint = () => {
  return {
    basePrice: generatePrice(),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destination: generateDestenation(),
    id: generateID(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(),
    type: generateType()
  };
};

const generateLocalPoint = () => {
  return {
    basePrice: generatePrice(),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destination: generateDestenation(),
    id: generateID(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffer(),
    type: generateType()
  };
};
