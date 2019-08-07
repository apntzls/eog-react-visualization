import React from "react";
import { useDispatch } from "react-redux";
import {
  Provider,
  createClient,
  useSubscription,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import * as actions from "../store/actions";

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

const handleSubscription = (messages, response) => {
  return response.newMeasurement;
};

export default props => {
  return (
    <Provider value={client}>
      <NewMeasurementSubscriber
        render={data => {
          return props.render(data);
        }}
      />
    </Provider>
  );
};

const NewMeasurementSubscriber = props => {
  const [response] = useSubscription(
    { query: subscription },
    handleSubscription
  );
  const { error, data } = response;
  const dispatch = useDispatch();

  if (error) {
    dispatch({ type: actions.API_ERROR, error: error.message });
  }

  return <>{props.render(data)}</>;
};
