import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import metricsReducer from "./reducers/Metrics";
import oilReducer from "./reducers/Oil";
import flareReducer from "./reducers/Flare";
import waterReducer from "./reducers/Water";
import tubingReducer from "./reducers/Tubing";
import casingReducer from "./reducers/Casing";
import valveReducer from "./reducers/Valve";

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    metrics: metricsReducer,
    oil: oilReducer,
    flare: flareReducer,
    water: waterReducer,
    tubing: tubingReducer,
    casing: casingReducer,
    valve: valveReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
