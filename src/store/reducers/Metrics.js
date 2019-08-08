import * as actions from "../actions";

const initialState = {};

const metricsListReceived = (state, action) => {
  const list = action.getMetrics;
  const metrics = list.reduce((acc, metric) => {
    acc[metric] = false;
    return acc;
  }, {});

  return metrics;
};

const metricsListEvent = (state, action) => {
  return Object.assign({}, state, action.toggledMetric);
};

const handlers = {
  [actions.METRICS_LIST_RECEIVED]: metricsListReceived,
  [actions.TOGGLE_METRIC]: metricsListEvent
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
