import * as actions from "../actions";
import { toTimeString } from "../../utils";

const initialState = [];

const transformMetric = metric => ({
  time: toTimeString(metric.at),
  value: metric.value,
  unit: metric.unit
});

const tubingReceived = (state, action) => {
  const { getMeasurements } = action;
  return getMeasurements.map(transformMetric);
};

const newTugingReceived = (state, action) => {
  const newState = state.slice();
  newState.shift();
  newState.push(transformMetric(action.newMetric));
  return newState;
};

const handlers = {
  [actions.TUBING_RECEIVED]: tubingReceived,
  [actions.NEW_TUBING_RECEIVED]: newTugingReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
