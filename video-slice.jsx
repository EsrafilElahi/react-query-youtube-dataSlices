import { useQuery } from 'react-query';

function Videos() {
  const { data, isLoading, error } = useQuery('videos', fetchVideos);

  if (isLoading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>Error fetching videos: {error.message}</div>;
  }

  return (
    <div>
      <h1>Videos</h1>
      {data.videos.map(video => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}

function fetchVideos() {
  return fetch('/api/videos').then(response => response.json());
}
