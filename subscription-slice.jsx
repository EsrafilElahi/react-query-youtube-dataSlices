import { useQuery } from 'react-query';

function Subscriptions({ userId }) {
  const { data, isLoading, error } = useQuery(['subscriptions', userId], fetchSubscriptions);

  if (isLoading) {
    return <div>Loading subscriptions...</div>;
  }

  if (error) {
    return <div>Error fetching subscriptions: {error.message}</div>;
  }

  return (
    <div>
      <h2>Subscriptions</h2>
      {data.subscriptions.map(subscription => (
        <div key={subscription.id}>
          <p>{subscription.channel}</p>
        </div>
      ))}
    </div>
  );
}

function fetchSubscriptions(_, userId) {
  return fetch(`/api/users/${userId}/subscriptions`).then(response => response.json());
}
