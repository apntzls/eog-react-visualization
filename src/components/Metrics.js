import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MetricsToggler from "./MetricsToggler";
import MeasurementFeed from "./MeasurementFeed";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <MetricsToggler />

      <MeasurementFeed
        render={data => {
          return <></>;
        }}
      />
    </Paper>
  );
};
