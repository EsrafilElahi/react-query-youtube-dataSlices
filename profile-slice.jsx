import { useQuery } from 'react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery(['user', userId], fetchUserProfile);

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error fetching user profile: {error.message}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}

function fetchUserProfile(_, userId) {
  return fetch(`/api/users/${userId}`).then(response => response.json());
}
