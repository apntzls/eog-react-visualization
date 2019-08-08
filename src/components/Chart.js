import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Provider, createClient, useQuery } from "urql";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import Box from "@material-ui/core/Box";
import indigo from "@material-ui/core/colors/indigo";
import * as actions from "../store/actions";
import { camelCaseToLabel } from "../utils";

const lineColor = indigo[300];

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query = `
query($input: MeasurementQuery) {
    getMeasurements(input: $input) {
        metric
        at
        value
        unit
    }
}
`;

export default props => {
  return (
    <Provider value={client}>
      <Chart {...props} />
    </Provider>
  );
};

const getSelector = metric => {
  let selector;
  switch (metric) {
    case "oilTemp":
      selector = state => state.oil;
      break;
    case "flareTemp":
      selector = state => state.flare;
      break;
    case "waterTemp":
      selector = state => state.water;
      break;
    case "tubingPressure":
      selector = state => state.tubing;
      break;
    case "casingPressure":
      selector = state => state.casing;
      break;
    case "injValveOpen":
      selector = state => state.valve;
      break;
    default:
      break;
  }

  return selector;
};

const actionsMap = {
  oilTemp: actions.OIL_RECEIVED,
  flareTemp: actions.FLARE_RECEIVED,
  waterTemp: actions.WATER_RECEIVED,
  tubingPressure: actions.TUBING_RECEIVED,
  casingPressure: actions.CASING_RECEIVED,
  injValveOpen: actions.VALVE_RECEIVED
};

// Defining these variables inside the component causes an infinite re-render.
// Keeping them up to date with the setTimeout.
let now;
let thirtyMinutesAgo;
setTimeout(() => {
  now = new Date();
  thirtyMinutesAgo = now.valueOf() - 30 * 60 * 1000;
}, 1000);
//
const Chart = props => {
  const { metricKey } = props;
  const dispatch = useDispatch();
  const input = { metricName: metricKey, after: thirtyMinutesAgo };
  const [result] = useQuery({
    query,
    variables: {
      input
    }
  });
  const { fetching, data, error } = result;
  const selector = getSelector(metricKey);
  const metricState = useSelector(selector);

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;
    dispatch({ type: actionsMap[metricKey], getMeasurements });
  }, [dispatch, data, error, metricKey]);

  if (fetching) return <LinearProgress />;
  const latestMetric = metricState[metricState.length - 1];
  const { value, unit } = latestMetric;

  return (
    <Box display="flex">
      <LineChart
        width={800}
        height={300}
        data={metricState}
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          dot={false}
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          isAnimationActive={false}
        />
      </LineChart>

      <h4>{`${camelCaseToLabel(metricKey)}: ${value} ${unit}`}</h4>
    </Box>
  );
};
