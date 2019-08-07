import * as actions from "../actions";

const initialState = {
  list: [],
  values: {}
};

const metricsListRecevied = (state, action) => {
  const list = action.getMetrics;
  const values = list.reduce((acc, metric) => {
    acc[metric] = false;
    return acc;
  }, {});

  return Object.assign({}, state, { list, values });
};

const metricsListEvent = (state, action) => {
  const values = Object.assign({}, state.values, action.payload);
  return Object.assign({}, state, { values });
};

const handlers = {
  [actions.METRICS_LIST_RECEIVED]: metricsListRecevied,
  [actions.TOGGLE_METRIC]: metricsListEvent
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
