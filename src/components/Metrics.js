import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  Provider,
  createClient,
  useSubscription,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import MetricsToggler from "./MetricsToggler";
import * as actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  }
}));

const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql",
  {}
);

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

const subscription = `
subscription {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
`;

const handleSubscription = (messages = [], response) => {
  return [response.newMessages, ...messages];
};

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
  const classes = useStyles();
  // const [response] = useSubscription(
  //   { query: subscription },
  //   handleSubscription
  // );
  // const { error, data } = response;
  // const dispatch = useDispatch();

  // if (error) {
  //   dispatch({ type: actions.API_ERROR, error: error.message });
  //   return null;
  // }
  // if (!data) return null;
  // const { newMeasurement } = data;
  // eslint-disable-next-line consistent-return
  return (
    <Paper className={classes.paper}>
      <MetricsToggler />
    </Paper>
  );
};
