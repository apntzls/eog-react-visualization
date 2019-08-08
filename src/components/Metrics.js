import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import MetricsToggler from "./MetricsToggler";
import MeasurementFeed from "./MeasurementFeed";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  }
}));

const getMetrics = state => state.metrics;

export default () => {
  const classes = useStyles();
  const metrics = useSelector(getMetrics);
  const metricNames = Object.keys(metrics);
  return (
    <Paper className={classes.paper}>
      <MetricsToggler />
      <MeasurementFeed />

      {metricNames.map(metric => {
        return (
          metrics[metric] && (
            <div key={metric}>
              <Chart metricKey={metric} />
            </div>
          )
        );
      })}
    </Paper>
  );
};
