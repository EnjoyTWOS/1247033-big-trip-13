import dayjs from "dayjs";

export const sortPointDate = (pointA, pointB) => {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPointPrice = (pointA, pointB) => {

  return pointB.basePrice - pointA.basePrice;
};

export const sortPointTime = (pointA, pointB) => {

  return Math.round((((pointB.dateTo - pointB.dateFrom) % 86400000) % 3600000) / 60000) - (Math.round((((pointA.dateTo - pointA.dateFrom) % 86400000) % 3600000) / 60000));
};

