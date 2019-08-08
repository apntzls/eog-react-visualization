import { capitalize } from "lodash";

export const toTimeString = date => {
  const $date = date ? new Date(date) : new Date();
  const hours = $date.getHours();
  let displayHours;
  if (hours < 12) {
    displayHours = hours;
  } else if (hours === 12) {
    displayHours = 12;
  } else {
    displayHours = hours % 12;
  }
  return `${displayHours}:${$date.getMinutes()}`;
};

export const camelCaseToLabel = str => {
  return str
    .split(/(?=[A-Z])/)
    .map(capitalize)
    .join(" ");
};
