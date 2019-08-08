import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Provider, createClient, useQuery } from "urql";
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "../store/actions";
import { camelCaseToLabel } from "../utils";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light
  },
  formGroup: {
    justifyContent: "space-between"
  }
}));

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query = `
query {
  getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Toggler />
    </Provider>
  );
};

const getMetricsState = state => state.metrics;

const Toggler = () => {
  const classes = useStyles();
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;
  const dispatch = useDispatch();
  const [metrics, setMetrics] = useState([]);
  const metricsState = useSelector(getMetricsState);

  const handleChange = name => event => {
    const toggledMetric = { [name]: event.target.checked };
    dispatch({ type: actions.TOGGLE_METRIC, toggledMetric });
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch({ type: actions.METRICS_LIST_RECEIVED, getMetrics });
    setMetrics(getMetrics);
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <Paper className={classes.paper}>
      <FormGroup className={classes.formGroup} row>
        {metrics.map(metric => (
          <FormControlLabel
            key={metric}
            control={
              <Switch
                checked={metricsState[metric]}
                onChange={handleChange(metric)}
                value={metric}
                color="primary"
              />
            }
            label={camelCaseToLabel(metric)}
          />
        ))}
      </FormGroup>
    </Paper>
  );
};
