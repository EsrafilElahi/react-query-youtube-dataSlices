import { useQuery } from 'react-query';

function Comments({ videoId }) {
  const { data, isLoading, error } = useQuery(['comments', videoId], fetchComments);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error fetching comments: {error.message}</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {data.comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <span>By: {comment.author}</span>
        </div>
      ))}
    </div>
  );
}

function fetchComments(_, videoId) {
  return fetch(`/api/videos/${videoId}/comments`).then(response => response.json());
}
