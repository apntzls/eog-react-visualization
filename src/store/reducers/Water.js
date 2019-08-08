import * as actions from "../actions";
import { toTimeString } from "../../utils";

const initialState = [];

const transformMetric = metric => ({
  time: toTimeString(metric.at),
  value: metric.value,
  unit: metric.unit
});

const waterReceived = (state, action) => {
  const { getMeasurements } = action;
  return getMeasurements.map(transformMetric);
};

const newWaterReceived = (state, action) => {
  const newState = state.slice();
  newState.shift();
  newState.push(transformMetric(action.newMetric));
  return newState;
};

const handlers = {
  [actions.WATER_RECEIVED]: waterReceived,
  [actions.NEW_WATER_RECEIVED]: newWaterReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
