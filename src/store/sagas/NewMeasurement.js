import { takeEvery, put } from "redux-saga/effects";
import * as actions from "../actions";

function* newMeasurementReceived(action) {
  const { newMetric } = action;
  let type;

  switch (newMetric.metric) {
    case "oilTemp":
      type = actions.NEW_OIL_RECEIVED;
      break;
    case "flareTemp":
      type = actions.NEW_FLARE_RECEIVED;
      break;
    case "waterTemp":
      type = actions.NEW_WATER_RECEIVED;
      break;
    case "tubingPressure":
      type = actions.NEW_TUBING_RECEIVED;
      break;
    case "casingPressure":
      type = actions.NEW_CASING_RECEIVED;
      break;
    case "injValveOpen":
      type = actions.NEW_VALVE_RECEIVED;
      break;
    default:
      break;
  }

  yield put({ type, newMetric });
}

function* watchNewMeasurement() {
  yield takeEvery(actions.NEW_MEASUREMENT_RECEIVED, newMeasurementReceived);
}

export default [watchNewMeasurement];
