import dayjs from "dayjs";

export const sortPointDate = (pointA, pointB) => {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPointPrice = (pointA, pointB) => {

  return pointA.basePrice.diff(pointB.basePrice);
};

export const sortPointTime = (pointA, pointB) => {

  return Math.round((((pointA.dateTo - pointA.dateFrom) % 86400000) % 3600000) / 60000).diff(Math.round((((pointB.dateTo - pointB.dateFrom) % 86400000) % 3600000) / 60000));
};

