import * as actions from "../actions";
import { toTimeString } from "../../utils";

const initialState = [];

const transformMetric = metric => ({
  time: toTimeString(metric.at),
  value: metric.value,
  unit: metric.unit
});

const oilReceived = (state, action) => {
  const { getMeasurements } = action;
  return getMeasurements.map(transformMetric);
};

const newOilReceived = (state, action) => {
  const newState = state.slice();
  newState.shift();
  newState.push(transformMetric(action.newMetric));
  return newState;
};

const handlers = {
  [actions.OIL_RECEIVED]: oilReceived,
  [actions.NEW_OIL_RECEIVED]: newOilReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
